import Heading from "@components/common/Heading/Heading";
import CartItemList from "@components/ecommerce/CartItemList/CartItemList";
import CartSubTotalPrice from "@components/ecommerce/CartSubTotalPrice/CartSubTotalPrice";
import Loading from "@components/feedback/Loading/Loading";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useCart from "@hooks/useCart";
const Cart = () => {
  const {
    changeQuantityHandler,
    error,
    loading,
    products,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubTotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          <LottieHandler
            message="Your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler message="Your cart is empty" type="empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
