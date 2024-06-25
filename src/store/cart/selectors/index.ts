import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const getCartTotalQuantity = createSelector(
  (state: RootState) => state.cartSlice.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (acc, cur) => acc + cur,
      0
    );
    return totalQuantity;
  }
);

export { getCartTotalQuantity };
