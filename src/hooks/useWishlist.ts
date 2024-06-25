import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetWishlist,
  cleanWishlistProductsFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlistSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist("productsFullInfo"));
    return () => {
      dispatch(cleanWishlistProductsFullInfo());
      promise.abort();
    };
  }, [dispatch]);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id as number] || 0,
    isLiked: true,
    isAuthenticated:true
  }));
  return { records, loading, error };
};

export default useWishlist;
