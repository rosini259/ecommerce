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
      if (!navigator.onLine) {
        throw new Error("No network connection");
      }
      const response = await axios.get<TResponse>("/category",{signal});
      return response.data;
    } catch (error) {
      try {
        const staticData = await import("../../../offline mode/categories.json");
        alert(
          "note : you are in offline mode so you cannot use some features like placing order"
        );
        return staticData.category;
      } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
    }
  }
);
export default actGetCategories;