export const state = () => ({
    defaultSeo: {},
    favicon:{url:''},
    siteName:null,
})

export const getters = {
    getGlobal: (state) => { 
        return {
            defaultSeo: state.defaultSeo,
            favicon:state.favicon,
            siteName:state.siteName,
        } 
    }
}

export const mutations = {
  setGlobal: (state, global) => {
      state.defaultSeo = global.defaultSeo
      state.favicon = global.favicon
      state.siteName = global.siteName
    },
}
