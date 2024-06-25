import { TOrderItem } from "@customTypes/order.types";
import { TLoading } from "@customTypes/shared.types";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

interface IOrderSlice {
  orderList: TOrderItem[];
  loading: TLoading;
  error: string | null;
}
const initialState: IOrderSlice = {
  orderList: [],
  loading: "idle",
  error: null,
};
const orderslice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    // place orders
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    // get orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});
export { actPlaceOrder, actGetOrders };
export const { resetOrderStatus } = orderslice.actions;
export default orderslice.reducer;
