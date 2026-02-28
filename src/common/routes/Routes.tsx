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
import OrderConfirmation from "../../screens/orderConfirmation/OrderConfirmation";
import PageNotFound from "../../screens/pageNotFound/PageNotFound";
import Wishlist from "../../screens/wishlist/Wishlist";
import NoSearchFound from "../../screens/noSearchFound/NoSearchFound";
import ProductDetails from "../../screens/productDetail/ProductDetails";
import ProductListingPage from "../../screens/productListing/ProductListingPage";

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
            <Route path="/confirmation" element={<OrderConfirmation />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:sku" element={<ProductDetails />} />
            <Route path="/no-results" element={<NoSearchFound />} />
            <Route path="/products" element={<ProductListingPage />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default CustomRoutes