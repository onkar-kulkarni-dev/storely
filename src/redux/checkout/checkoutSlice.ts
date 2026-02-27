import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shippingDetails: {
        firstName: '',
        lastName: '',
        street: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    },
    paymentMethod: {
        type: '',
        cardNumber: '',
        expiryDate: ''
    },
    deliveryMethod: {
        type: '',
        estimatedDelivery: '',
        cost: ''
    }
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        shippingDetails: (state, action) => {
            state.shippingDetails = action.payload;
        },
        paymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        deliveryMethod: (state, action) => {
            state.deliveryMethod = action.payload;
        },
        clearCheckoutDetails: () => {
            return initialState;
        }
    }
})

export const {
    shippingDetails,
    paymentMethod,
    deliveryMethod,
    clearCheckoutDetails
} = checkoutSlice.actions;

export default checkoutSlice.reducer;