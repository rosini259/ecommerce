import Heading from "@components/common/Heading/Heading";
import Loading from "@components/feedback/Loading/Loading";
import ProductInfo from "@components/productInfo/ProductInfo";
import useOrders from "@hooks/useOrders";

import { Modal, Table } from "react-bootstrap";

const Orders = () => {
  const {
    loading,
    error,
    orderList,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>productsDetails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              direction="column"
              style={{ marginBottom: "10px" }}
              quantity={el.quantity}
            />
          ))}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Heading title="My Order" />
      <Loading status={loading} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => {
              return (
                <tr key={el.id}>
                  <td># {el.id}</td>
                  <td>
                    {el.items.length} item(s)
                    {" / "}
                    <span
                      onClick={() => viewDetailsHandler(el.id)}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Product Details
                    </span>
                  </td>
                  <td>{el.subtotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
