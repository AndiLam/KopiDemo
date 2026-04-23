// src/store/useCartStore.ts
import { create } from 'zustand';

export type CartItem = {
  id: number;
  name: string;
  price: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
}));
