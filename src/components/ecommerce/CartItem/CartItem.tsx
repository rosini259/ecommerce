import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/products.types";
import { memo } from "react";
import ProductInfo from "@components/productInfo/ProductInfo";

const { cartItem, cartItemSelection } = styles;

type cartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
  id: number;
};
const CartItem = memo(
  ({
    title,
    img,
    price,
    max,
    quantity,
    changeQuantityHandler,
    id,
    removeItemHandler,
  }: cartItemProps) => {
    const renderOption = Array(max)
      .fill(0)
      .map((_, ndx) => {
        const quantity = ++ndx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });
    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };
    return (
      <div className={cartItem}>
        <ProductInfo title={title} img={img} price={price} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            value={quantity}
            onChange={changeQuantity}
          >
            {renderOption}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
