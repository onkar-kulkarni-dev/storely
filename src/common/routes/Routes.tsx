import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../../screens/auth/Auth";
import Home from "../../screens/home/Home";
import AuthReg from "../../screens/auth/AuthReg";

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/reg" element={<AuthReg />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default CustomRoutes