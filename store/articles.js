export const state = () => ({
    allArticles: [],
})

export const getters = {
    allArticles: (state) => state.allArticles,
    lastThreeArticles: (state) => state.allArticles.slice(0,2),
    bySlug: (state) => (slug) => {
        return state.allArticles.find(el => el.slug == slug)
    }
}

export const mutations = {
  setArticles: (state, articles) => (state.allArticles = articles),
}
