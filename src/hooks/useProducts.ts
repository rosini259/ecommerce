import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  cleanUpProductsRecords,
  actGetProductsByCatPrefix,
} from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
const useProducts = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.productsSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const wishlistItemId = useAppSelector((state) => state.wishlistSlice.itemsId);
  const userAccessToken = useAppSelector(state=>state.authSlice.accessToken)
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id as number] || 0,
    isLiked: wishlistItemId.includes(el.id as number),
    isAuthenticated:userAccessToken ? true:false
  }));

  const params = useParams();
  const productPrefix = params.prefix;
  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );
    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort();
    };
  }, [dispatch, params.prefix]);
  return { loading, error, productsFullInfo, productPrefix };
};

export default useProducts;
