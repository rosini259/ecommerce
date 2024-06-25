import { Container } from "react-bootstrap";
import Category from "@components/ecommerce/Category/category";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import Heading from "@components/common/Heading/Heading";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { loading, error, records } = useCategories();
  return (
    <Container>
      <Heading title="categories" />
      <Loading status={loading} error={error} type="category">
        <GridList
          records={records}
          emptyMessage="there are no categories"
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
