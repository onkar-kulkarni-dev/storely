import { Outlet } from "react-router-dom"
import CheckoutSteps from "../../components/checkout/CheckoutSteps"

const CheckoutLayout = () => {
    return (
        <div>
            <CheckoutSteps />
            <Outlet />
        </div>
    )
}

export default CheckoutLayout;