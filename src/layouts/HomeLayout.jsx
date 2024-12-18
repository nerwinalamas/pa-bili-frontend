import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
    return (
        <>
            <Navbar />
            <div className="mt-16"></div>
            <Outlet />
            <Footer />
        </>
    );
};

export default HomeLayout;
