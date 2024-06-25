import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const { cartSlice, authSlice } = getState() as RootState;

    const orderItems = cartSlice.productsFullInfo.map((el) => {
      return {
        id: el.id,
        title: el.title,
        price: el.price,
        img: el.img,
        quantity: cartSlice.items[el.id || 0],
      };
    });
    try {
      const response = await axios.post("/orders", {
        userId: authSlice.user?.id,
        items:orderItems,
        subtotal
      });
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPlaceOrder