import actGetProductsByItems from "@store/cart/act/actGetProductsByItems";
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import { useCallback, useEffect } from "react";
const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  const userAccessToken = useAppSelector(
    (state) => state.authSlice.accessToken
  );
  const placeOrderStatus = useAppSelector((state) => state.ordersSlice.loading);
  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id as number],
  }));
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );
  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      dispatch(cleanCartProductsFullInfo());
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  };
};

export default useCart;
