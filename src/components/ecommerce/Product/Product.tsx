import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/products.types";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import ProductInfo from "@components/productInfo/ProductInfo";
const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    img,
    price,
    quantity,
    max,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    useEffect(() => {
      if (!isBtnDisabled) return;

      setIsBtnDisabled(true);

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => {
        clearTimeout(debounce);
      };
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };
    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isloading) {
          setIsloading(true);
          dispatch(actLikeToggle(id as number))
            .unwrap()
            .then(() => setIsloading(false))
            .catch(() => setIsloading(false));
        }else{
          setShowModal(true)
        }
      }
    };
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <ProductInfo title={title} img={img} price={price} >
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isloading ? (
              <Spinner animation="border" variant="primary" size="sm" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "you reached to the limit"
              : `you can add ${currentRemainingQuantity} item`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" ,width:"100%"}}
            onClick={addToCartHandler}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" />
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
