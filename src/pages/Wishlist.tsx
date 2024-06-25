import Heading from "@components/common/Heading/Heading";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import useWishlist from "@hooks/useWishlist";
const Wishlist = () => {
  const { records, error, loading } = useWishlist();
  return (
    <div>
      <Heading title="wishlist" />
      <Loading status={loading} error={error} type="product">
        <GridList
          records={records}
          emptyMessage="your wishlist is empty"
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </div>
  );
};

export default Wishlist;
