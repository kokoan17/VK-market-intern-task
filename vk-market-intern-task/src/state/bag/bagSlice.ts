import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBagItems = createAsyncThunk("bag/fetchBagItems", async () => {
  const response = await axios("https://dummyjson.com/carts/1");
  return response.data;
});

const initialState = {
  items: [] as BagProduct[],
  amount: 0,
  total: 0,
  isLoading: true,
};

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    deleteAllBagItems: (state) => {
      state.items = [];
      state.amount = state.items.length;
    },
    deleteBagItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.amount = state.items.length;
    },
    updateCountById: (state, action) => {
      const delta = action.payload._increment ? 1 : -1;
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      });
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.items.forEach((item) => {
        amount += item.quantity;
        total += item.quantity * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBagItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBagItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.products;
        state.amount = action.payload.totalProducts;
        state.total = action.payload.totalQuantity;
      })
      .addCase(fetchBagItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  deleteAllBagItems,
  deleteBagItem,
  updateCountById,
  calculateTotals,
} = bagSlice.actions;
export default bagSlice.reducer;
