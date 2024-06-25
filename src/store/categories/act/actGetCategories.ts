import { TCategory } from "@customTypes/category.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "src/utils/axiosErrorHandler";
import axios from "axios";
type TResponse = TCategory[];
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkApi) => {
    const { rejectWithValue ,signal} = thunkApi;
    try {
      const response = await axios.get<TResponse>("/category",{signal});
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actGetCategories;
