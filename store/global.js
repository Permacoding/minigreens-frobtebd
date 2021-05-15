export const state = () => ({
    defaultSeo: {},
    favicon:{url:''},
    siteName:null,
    menu: [],
})

export const getters = {
    getGlobal: (state) => { 
        return {
            defaultSeo: state.defaultSeo,
            favicon:state.favicon,
            siteName:state.siteName,
        } 
    },
    getMenu: (state) => {
        return state.menu;
    }
}

export const mutations = {
  setGlobal: (state, global) => {
      state.defaultSeo = global.defaultSeo
      state.favicon = global.favicon
      state.siteName = global.siteName
      state.menu = global.menu
    },
}
