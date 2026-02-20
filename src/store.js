import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/redux/cart/cartSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("cart");
        if (!serializedState) return undefined;
        return { cart: JSON.parse(serializedState) };
    } catch {
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem("cart", JSON.stringify(state.cart));
    } catch { }
});