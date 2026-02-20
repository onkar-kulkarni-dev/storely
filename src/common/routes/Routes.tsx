import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../../screens/auth/Auth";
import Home from "../../screens/home/Home";
import AuthReg from "../../screens/auth/AuthReg";
import ForgotPassword from "../../screens/auth/ForgotPassword";
import Cart from "../../screens/cart/Cart";

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/reg" element={<AuthReg />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}

export default CustomRoutes