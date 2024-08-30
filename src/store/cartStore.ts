import { create } from "zustand";

type CartItem = {
  product: Product;
  quantity: number;
};

type Store = {
  cartItems: CartItem[];
  quantity: number;
  setQuantity: (value: number) => void;
  setCartItems: (product: Product) => void;
  removeCartItem: (id: number) => void;
};

export const useCartStore = create<Store>()((set) => ({
  cartItems: [],
  quantity: 1,
  setQuantity: (value: number) => {
    set((state) => ({ quantity: value }));
  },
  setCartItems: (product) =>
    set((state) => {
      const isExist = state.cartItems.find(
        (item) => item.product.id === product.id
      );
      if (isExist) {
        state.cartItems.map((item) => {
          if (item.product.id === product.id) {
            item.quantity += state.quantity;
          }
          return item;
        });
      } else {
        state.cartItems.push({ product, quantity: state.quantity });
      }
      state.quantity = 1;
      return { cartItems: state.cartItems };
    }),
  removeCartItem: (id) =>
    set((state) => {
      return {
        cartItems: state.cartItems.filter((item) => item.product.id !== id),
      };
    }),
}));
