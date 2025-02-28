import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: [],
  totalQuantity: 0,
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.itemList.find((item) => item._id === newItem._id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.productQuantity) {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      } else {
        state.itemList.push({
          _id: newItem._id,
          name: newItem.name,
          brand: newItem.brand,
          category: newItem.category,
          selectHostel: newItem.selectHostel,
          hostleName: newItem.hostleName,
          roomNumber: newItem.roomNumber,
          dayScholarContectNumber: newItem.dayScholarContectNumber,
          price: newItem.newAmount,
          prevPrice: newItem.prevAmount,
          totalPrice: newItem.newAmount,
          image: newItem.image,
          // description: newItem.description,
          productQuantity: newItem.quantity, 
          quantity:1,
        });
        state.totalQuantity++;
      }
    },

    removeFromCart: (state, action) => {
      const findItem = state.itemList.find((item) => item._id === action.payload._id);

      if (findItem) {
        if (findItem.quantity > 1) {
          findItem.quantity--;
          findItem.totalPrice -= findItem.price;
        } else {
          state.itemList = state.itemList.filter((item) => item._id !== action.payload._id);
        }
      }
    },

    updateCart:(state, action)=>{
      // console.log(action.payload.item)
      state.itemList = action.payload.item;
    },
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, removeFromCart, setShowCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
