import { TProduct } from "@customTypes/products.types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, resetOrderStatus } from "@store/orders/ordersSlice";
import { useEffect, useState } from "react";

const useOrders = () => {
    const dispatch = useAppDispatch();
  const { loading, error, orderList } = useAppSelector(
    (state) => state.ordersSlice
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const viewDetailsHandler = (id: number) => {
    const productsDetails = orderList.find((order) => order.id == id);
    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...(productsDetails?.items ?? [])]);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus())
    };
  }, [dispatch]);

  return {
    loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
  };
  
}

export default useOrders