import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import cartSlice from "./cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import wishlistSlice from "./wishlist/wishlistSlice";
import authSlice from "./auth/authSlice";
import ordersSlice from "./orders/ordersSlice";
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"],
};
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"],
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  authSlice: persistReducer(authPersistConfig, authSlice),
  cartSlice: persistReducer(cartPersistConfig, cartSlice),
  categoriesSlice,
  productsSlice,
  wishlistSlice,
  ordersSlice,
});
const persistedReducer = persistReducer(rootPersistConfig,rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { persistor, store };
