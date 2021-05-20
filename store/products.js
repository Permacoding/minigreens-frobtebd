import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";

export const state = () => ({
    allProducts: [],
    cartItems:[],
})

export const getters = {
    allProducts: (state) => state.allProducts,
    bySlug:(state) => (slug) =>{ return state.allProducts.find(el => el.slug == slug ) },
    nbCartItems: (state) => state.cartItems.length,
    getCart: (state) => state.cartItems,
    getNbCartProducts: (state) => state.cartItems.reduce((total,item) => {return total + item.quantity},0),
    getCartTotalPrice: (state) =>
    state.cartItems.length < 1
      ? '0,00'
      : state.cartItems
          .map((el) => el.product.price * el.quantity)
          .reduce((a, b) => a + b).toFixed(2),
    chooseRandom : (state)  => (number = 1 ) => {
      const res = [];
      for(let i = 0; i < number; ){
        const random = Math.floor(Math.random() * state.allProducts.length)
        if(res.indexOf(state.allProducts[random]) !== -1){
            continue
        }
        res.push(state.allProducts[random])
        i++
   }
   return res;
  }
}

export const mutations = {
  setProducts: (state, products) => (state.allProducts = products),
  addCartItem: (state, payload) => {
    const product = payload.product;
    const quantity = payload.quantity 

    const index = state.cartItems.findIndex(el => el.product.id == product.id);
    
    if(index > -1){
        state.cartItems[index].quantity = state.cartItems[index].quantity + quantity;
        }else{
        state.cartItems.push(payload)
        }

  },
  setCartItem: (state, payload) => {
    const product = payload.product;
    const quantity = payload.quantity 

    if(quantity == 0){
      state.cartItems = state.cartItems.filter(item => item.product.id != product.id)
    }else{
      const index = state.cartItems.findIndex(el => el.product.id == product.id);

      if(index > -1){
        state.cartItems[index].quantity = quantity;
        }else{
        state.cartItems.push(payload)
        }
    }
  },


}
