import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/feature/cartSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
