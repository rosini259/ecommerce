import { TLoading } from "@customTypes/shared.types";
import CategorySkeleton from "../skeletons/categorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/cartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/productSkeleton/ProductSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
import TableSkeleton from "../skeletons/tableSkeleton/TableSkeleton";
const skeletonsTypes = {
  cart: CartSkeleton,
  product: ProductSkeleton,
  category: CategorySkeleton,
  table:TableSkeleton
};
interface ILoadingProps {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonsTypes;
}

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: ILoadingProps) => {
  const Component = skeletonsTypes[type];
  if (status == "pending") {
    return <Component />;
  }
  if (status == "failed") {
    return (
      <div>
        <LottieHandler type="error" message={error as string} className=""/>
      </div>
    );
  }
  return <>{children}</>;
};

export default Loading;
