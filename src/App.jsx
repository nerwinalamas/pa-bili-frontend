import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeLayout from "./layouts/HomeLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import ModalProvider from "./providers/modalProvider";
import ProductDetails from "./pages/ProductDetails";
import ChangePassword from "./pages/ChangePassword";
import ShippingPreferences from "./pages/ShippingPreferences";
import PaymentMethods from "./pages/PaymentMethods";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomeLayout />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/account/change-password" element={<ChangePassword />} />
                        <Route path="/account/payment-methods" element={<PaymentMethods />} />
                        <Route path="/account/shipping-preferences" element={<ShippingPreferences />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                    </Route>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
            <ModalProvider />
        </Router>
    );
};

export default App;
