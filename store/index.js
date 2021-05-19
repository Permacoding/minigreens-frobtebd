
const requestCache = {
    articles: null,
    products: null,
    global:null,
    contact:null,
    cart:null,
}


export const actions = {
    async nuxtServerInit ({ commit }, {$strapi}) {
        const articles = await cacheArticles($strapi)
        const products = await cacheProducts($strapi)
        const global = await cacheGlobal($strapi)
        const contact = await cacheContact($strapi)
        // now all posts are available in my Vuex store, 
        // which is accessed from lots of different places in the project
        commit('articles/setArticles', articles) 
        commit('products/setProducts', products) 
        commit('global/setGlobal',global)   
        commit('contact/setContact',contact)   
    }
}

/**
 * This is the secret sauce.
 * If the data being requested is cached, subsequent API calls will not be made
 * During a nuxt generate, nuxtServerInit will be called for every page
 * Because of this caching, the API calls will only be done once
 *
 */
 function cacheArticles ($strapi) {
    if (!requestCache.articles) { // if cache doesn't exist, get the data from the API and cache it
        requestCache.articles = $strapi.$articles.find({_sort:'published_at'})
            .then(res => res)
            .catch(err => console.log(err))
    }

    return requestCache.articles // always return from the cache
}

 function cacheProducts ($strapi) {
    if (!requestCache.products) { 
        requestCache.products = $strapi.$products.find({_sort:'title'})
            .then(res => res)
            .catch(err => console.log(err))
    }

    return requestCache.products 
}

 function cacheGlobal ($strapi) {
    if (!requestCache.global) { 
        requestCache.global =  $strapi.find('global')
            .then(res => res)
            .catch(err => console.log(err))
    }

    return requestCache.global 
}

 function cacheContact ($strapi) {
    if (!requestCache.contact) { 
        requestCache.contact =  $strapi.find('contact')
            .then(res => res)
            .catch(err => console.log(err))
    }

    return requestCache.contact
}