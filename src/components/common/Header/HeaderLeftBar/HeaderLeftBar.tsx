import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantity } from "@store/cart/selectors";
import styles from "./styles.module.css";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import WishlistIcon from "/src/assets/svg/wishlist.svg?react";
import CartIcon from "/src/assets/svg/cart.svg?react";
const { headerLeftBar } = styles;
const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlistSlice.itemsId.length
  );
  const cartTotalQuantity = useAppSelector(getCartTotalQuantity);
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="wishlist" />}
        title={"wishlist"}
      />
      <HeaderCounter
        to="cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title="cart" />}
        title={"cart"}
      />
    </div>
  );
};

export default HeaderLeftBar;
