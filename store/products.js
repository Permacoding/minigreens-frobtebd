export const state = () => ({
    allProducts: [],
    cartItems:[],
})

export const getters = {
    allProducts: (state) => state.allProducts,
    bySlug:(state) => (slug) =>{ return state.allProducts.find(el => el.slug == slug ) },
    nbCartItems: (state) => state.cartItems.length,
    getCart: (state) => state.cartItems,
    getCartTotal: (state) =>
    state.cartItems.length < 1
      ? '0'
      : state.cartItems
          .map((el) => el.product.price * el.quantity)
          .reduce((a, b) => a + b),
}

export const mutations = {
  setProducts: (state, products) => (state.allProducts = products),
  addCartItem: (state, payload) => {
    const product = payload.product;
    const quantity = payload.quantity 
    
    const index = state.cartItems.findIndex(el => el.product.id == product.id);
    console.log(index);
    if(index > -1){
      state.cartItems[index].quantity += quantity;
    }else{
      state.cartItems.push(payload)
    }
  }
    ,
  removeCartItem: (state, id) => delete state.product[id],
}
