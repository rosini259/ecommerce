import { TOrderItem } from "@customTypes/order.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = TOrderItem[];
const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkApi) => {
    const { rejectWithValue, getState, signal } = thunkApi;
    const { authSlice } = getState() as RootState;
    try {
      const response = await axios.get<TResponse>(
        `/orders?userId=${authSlice.user?.id}`,
        { signal }
      );
      return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actGetOrders;
