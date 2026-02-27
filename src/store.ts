import { configureStore, combineReducers } from "@reduxjs/toolkit"; import cartReducer from '../src/redux/cart/cartSlice';
import checkoutReducer from "../src/redux/checkout/checkoutSlice";
import wishlistReducer from '../src/redux/wishlist/wishlistSlice';

// 1️⃣ Combine reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    checkout: checkoutReducer,
    wishlist: wishlistReducer
});

// 2️⃣ Type the root state
export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// 3️⃣ Load persisted state with correct type
const loadState = (): Partial<AppRootState> | undefined => {
    try {
        const serializedState = localStorage.getItem("rootState");
        if (!serializedState) return undefined;
        return JSON.parse(serializedState) as Partial<AppRootState>;
    } catch {
        return undefined;
    }
};

// 4️⃣ Configure store
export const store = configureStore({
    reducer: rootReducer,          // ✅ combined root reducer
    preloadedState: loadState(),   // ✅ typed correctly
});

// 5️⃣ Persist store
store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem(
            "rootState",
            JSON.stringify({
                cart: state.cart,
                checkout: state.checkout,
                wishlist: state.wishlist
            })
        );
    } catch (err) {
        console.log(err)
    }
});