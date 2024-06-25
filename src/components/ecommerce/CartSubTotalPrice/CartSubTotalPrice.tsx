import { TProduct } from "@customTypes/products.types";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { cleanCartAfterPlaceOrder } from "@store/cart/cartSlice";
type CartSubTotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};
const CartSubTotalPrice = ({
  products,
  userAccessToken,
}: CartSubTotalPriceProps) => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subtotal = products.reduce((acc, el) => {
    const price = +el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity == "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);
  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null)
  };
  const placeOrderHandler = () => {
    setLoading(true)
    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(cleanCartAfterPlaceOrder())
        setShowModal(false)
      })
      .catch((error) => {setError(error)})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subtotal: {subtotal}.00 EGP
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="primary"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>subtotal:</span>
        <span>{subtotal.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={modalHandler}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
