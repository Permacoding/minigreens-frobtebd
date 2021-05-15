export const state = () => ({
    modalOpenedName:''
})

export const getters = {
    isBackgroundDisplayed: (state) => { 
        return state.modalOpenedName != ''
    },
    getModalOpenedName: (state) => {
        return state.modalOpenedName;
    }
}

export const mutations = {
  setModalOpenedName: (state, modalName) => {
      state.modalOpenedName = modalName;
    },
  closeModal: (state) => {
      state.modalOpenedName = ''
  } 
}
