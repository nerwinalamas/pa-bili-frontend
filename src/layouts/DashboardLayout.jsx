import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { API_BASE_URL } from "../lib/constants";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserRole = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/admin`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Unauthorized");
                }

                const data = await response.json();
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error("Error checking authentication status:", error);
                setIsAdmin(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserRole();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) return <Navigate to="/" />;

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
