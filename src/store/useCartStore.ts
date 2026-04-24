import { create } from 'zustand';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatusType =
  | 'received'
  | 'preparing'
  | 'ready'
  | 'done';

type Order = {
  items: CartItem[];
  total: number;
  status: OrderStatusType;
  eta: number;
};

type Store = {
  cart: CartItem[];
  order: Order | null;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  checkout: () => void;
  updateOrderStatus: (status: OrderStatusType, eta: number) => void;
};

export const useCartStore = create<Store>((set, get) => ({
  cart: [],
  order: null,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === id);
      if (existingItem?.quantity === 1) {
        return { cart: state.cart.filter((i) => i.id !== id) };
      }
      return {
        cart: state.cart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }),

  clearCart: () => set({ cart: [] }),

  checkout: () => {
    const { cart } = get();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    set({
      order: {
        items: cart,
        total,
        status: 'received',
        eta: 15,
      },
      cart: [],
    });
  },

  updateOrderStatus: (status, eta) =>
    set((state) => ({
      order: state.order ? { ...state.order, status, eta } : null,
    })),
}));