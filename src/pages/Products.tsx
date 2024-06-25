import { Container } from "react-bootstrap";
import Product from "@components/ecommerce/Product/Product";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import Heading from "@components/common/Heading/Heading";
import useProducts from "@hooks/useProducts";
const Products = () => {
  const { error, loading, productPrefix, productsFullInfo } = useProducts();
  return (
    <Container>
      <Heading title={`${productPrefix?.toUpperCase()} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList
          records={productsFullInfo}
          emptyMessage="there are no product"
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
