import { TProduct } from "@customTypes/products.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "src/utils/axiosErrorHandler";
import axios from "axios";
type TResponse = TProduct[];
const actGetProductsByItems = createAsyncThunk(
  "/cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cartSlice } = getState() as RootState;
    const itemId = Object.keys(cartSlice.items);
    const concatenatedItemId = itemId.map((el) => `id=${el}`).join("&");
    if (!itemId.length) return fulfillWithValue([]);
    try {
      const responce = await axios.get<TResponse>(
        `/products?${concatenatedItemId}`,
        { signal }
      );
      return responce.data;
    } catch (error) {
      try {
        const staticData = await import(
          "../../../offline mode/categories.json"
        );
        return staticData.category;
      } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
    }
  }
);
export default actGetProductsByItems;
