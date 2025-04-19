// src/stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    cartName: 'myCart',
  }),

  actions: {
    initCart(cartName = 'myCart') {
      this.cartName = cartName
      const saved = localStorage.getItem(cartName)
      this.cart = saved ? JSON.parse(saved) : []
    },

    save(item) {
      const exists = this.cart.find(i => i.item_id === item.item_id)
      if (!exists) {
        this.cart.push(item)
      } else {
        this.cart = this.cart.map(i =>
          i.item_id === item.item_id
            ? {
                ...i,
                qty: i.qty + item.qty,
                subtotal: (i.qty + item.qty) * i.price - i.discount
              }
            : i
        )
      }
      this._syncLocal()
    },

    deleteItem(id) {
      this.cart = this.cart.filter(item => item.item_id !== id)
      this._syncLocal()
    },

    clearCart() {
      this.cart = []
      this._syncLocal()
    },

    _syncLocal() {
      localStorage.setItem(this.cartName, JSON.stringify(this.cart))
    },
  },

  getters: {
    cartItems: (state) => state.cart,
    cartTotal: (state) =>
      state.cart.reduce((sum, item) => sum + item.subtotal, 0),
    cartCount: (state) =>
      state.cart.reduce((count, item) => count + item.qty, 0),
  },
})
