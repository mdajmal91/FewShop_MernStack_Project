import { createSlice } from '@reduxjs/toolkit';

// Function to load cart items from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cartItems');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

// Function to save cart items to localStorage
const saveCartToLocalStorage = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', serializedCart);
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const initialState = {
  cartItems: loadCartFromLocalStorage(), // Load initial state from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // Payload can be { ...product, quantity: X } or just { ...product }
      const existingItem = state.cartItems.find(item => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity ? newItem.quantity : 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: newItem.quantity ? newItem.quantity : 1 });
      }
      saveCartToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload); // payload is product._id
      saveCartToLocalStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload; // payload is { _id: productId, quantity: newQuantity }
      const itemToUpdate = state.cartItems.find(item => item._id === _id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) { // Remove if quantity becomes 0 or less
          state.cartItems = state.cartItems.filter(item => item._id !== _id);
        }
      }
      saveCartToLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;