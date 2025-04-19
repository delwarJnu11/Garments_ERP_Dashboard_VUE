import { ref } from 'vue';

export function useCart(cartName) {
  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem(cartName)) || [];
    return cart;
  };

  // const save = (item) => {
  //   let cart = getCart();
  //   const exists = cart.find((i) => i.item_id === item.item_id);
  //   if (!exists) {
  //     cart.push(item);
  //   } else {
  //     cart = cart.map((i) =>
  //       i.item_id === item.item_id
  //         ? {
  //             ...i,
  //             qty: i.qty + item.qty,
  //             subtotal: (i.qty + item.qty) * i.price - i.discount
  //           }
  //         : i
  //     );
  //   }
  //   localStorage.setItem(cartName, JSON.stringify(cart));
  // };



  const save = (item) => {
    let cart = getCart();
    const exists = cart.find((i) => i.item_id === item.item_id);
  
    if (!exists) {
      cart.push(item);
    } else {
      cart = cart.map((i) => {
        if (i.item_id === item.item_id) {
          const newQty = i.qty + item.qty;
          const total = newQty * i.price;
          const discountAmount = (total * i.discount) / 100;
          const vatAmount = (total * i.vat) / 100;
          const subtotal = total - discountAmount + vatAmount;
  
          return {
            ...i,
            qty: newQty,
            subtotal: subtotal,
          };
        }
        return i;
      });
    }
  
    localStorage.setItem(cartName, JSON.stringify(cart));
  };
  
  const deleteItem = (id) => {
    const cart = getCart().filter((item) => item.item_id !== id);
    localStorage.setItem(cartName, JSON.stringify(cart));
  };

  const clearCart = () => {
    localStorage.setItem(cartName, JSON.stringify([]));
  };

  return {
    getCart,
    save,
    deleteItem,
    clearCart
  };
}