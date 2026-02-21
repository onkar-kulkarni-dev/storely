import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../../screens/auth/Auth";
import Home from "../../screens/home/Home";
import AuthReg from "../../screens/auth/AuthReg";
import ForgotPassword from "../../screens/auth/ForgotPassword";
import Cart from "../../screens/cart/Cart";
import Shipping from "../../screens/checkout/Shipping";
import Payment from "../../screens/checkout/Payment";
import Review from "../../screens/checkout/Review";
import Delivery from "../../screens/checkout/Delivery";
import CheckoutLayout from "../../screens/checkout/CheckoutLayout";

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/reg" element={<AuthReg />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutLayout />}>
                <Route index element={<Shipping />} />
                <Route path="delivery" element={<Delivery />} />
                <Route path="payment" element={<Payment />} />
                <Route path="review" element={<Review />} />
            </Route>
        </Routes>
    )
}

export default CustomRoutes