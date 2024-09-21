import { TProduct } from "@customTypes/products.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "src/utils/axiosErrorHandler";
import axios from "axios";
type TResponse = TProduct[];
const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      try {
        const staticData = await import(
          "../../../offline mode/products.json"
        );
        return staticData.products;
      } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
    }
  }
);
export default actGetProductsByCatPrefix;
