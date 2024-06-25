import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetCategories,
  cleanUpcategoriesRecords,
} from "@store/categories/categoriesSlice";
const useCategories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categoriesSlice
  );
  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      dispatch(cleanUpcategoriesRecords());
      promise.abort();
    };
  }, [dispatch]);
  return { loading, error, records };
};

export default useCategories;
