import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
    sku: string;
    quantity: number;
    [key: string]: any;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.sku === action.payload.sku
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity || 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.sku !== action.payload
            );
        },

        increaseQty: (state, action) => {
            const item = state.items.find(
                (item) => item.sku === action.payload
            );
            if (item) item.quantity += 1;
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(
                (item) => item.sku === action.payload
            );

            if (!item) return;

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(
                    (item) => item.sku !== action.payload
                );
            }
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;