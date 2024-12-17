import { useEffect, useState } from "react";
import useModalStore, { ModalTypes } from "../store/useModalStore";
import { API_BASE_URL } from "../lib/constants";
import OrdersTable from "../components/OrdersTable";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { onOpen } = useModalStore();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/order/admin/orders`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();

                console.log("orders data:", data);
                setOrders(data);
            } catch (error) {
                console.error("Fetch orders error:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewOrder = (productId) => {
        onOpen(ModalTypes.VIEW_ORDER, productId);
    };

    const handleUpdateOrder = (productId) => {
        onOpen(ModalTypes.UPDATE_ORDER, productId);
    };

    return (
        <main className="min-h-screen container mx-auto mt-4">
            <OrdersTable
                orders={orders}
                onViewOrderDetails={handleViewOrder}
                onUpdateOrder={handleUpdateOrder}
            />
        </main>
    );
};

export default Orders;
