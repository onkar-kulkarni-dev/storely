import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [] as any[],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.items.includes(action.payload)) {
                state.items.push(action.payload);
            }
        },
        removeFromWishList: (state, action) => {
            state.items = state.items.filter(sku => sku !== action.payload);
        }
    }
})

export const {
    addToWishlist,
    removeFromWishList
} = wishlistSlice.actions;

export default wishlistSlice.reducer;