import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TCategory } from "@customTypes/category.types";
import { TLoading } from "@customTypes/shared.types";
interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}
const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpcategoriesRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload as TCategory[];
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});
export { actGetCategories };
export const {cleanUpcategoriesRecords} = categoriesSlice.actions
export default categoriesSlice.reducer;
