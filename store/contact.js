export const state = () => ({
    instagram:'',
    facebook:'',
    phone:'',
    email:'',
    address:'',
})

export const getters = {
    getInstagram: (state) => { 
        return state.instagram;
    },
    getFacebook: (state) => { 
        return state.facebook;
    },
    getPhone: (state) => { 
        return state.phone;
    },
    getEmail: (state) => { 
        return state.email;
    },
    getAddress: (state) => { 
        return state.address;
    },
}

export const mutations = {
  setContact: (state, contact) => {
        state.instagram = contact.instagram;
        state.facebook = contact.facebook;
        state.phone = contact.phone;
        state.email = contact.email;
        state.address = contact.address;
    },
}
