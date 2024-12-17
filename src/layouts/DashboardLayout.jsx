import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex">
            <div>
                <Sidebar />
            </div>
            <div className="h-full w-full p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
