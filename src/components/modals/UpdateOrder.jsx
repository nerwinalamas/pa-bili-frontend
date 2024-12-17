import { useEffect, useState } from "react";
import useModalStore, { ModalTypes } from "../../store/useModalStore";
import { API_BASE_URL } from "../../lib/constants";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const UpdateOrder = () => {
    const { isOpen, onClose, type, data: orderId } = useModalStore();
    const isModalOpen = isOpen && type === ModalTypes.UPDATE_ORDER;

    const [orderStatus, setOrderStatus] = useState("");
    const [isPaid, setIsPaid] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const orderStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/order/${orderId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }

                const orderData = await response.json();
                setOrderStatus(orderData.orderStatus);
                setIsPaid(orderData.isPaid);
                setIsDelivered(orderData.isDelivered);
            } catch (error) {
                console.error("Fetch order details error:", error);
            }
        };

        if (isOpen && type === ModalTypes.UPDATE_ORDER && orderId) {
            fetchOrderDetails();
        }
    }, [orderId, isOpen, type]);

    const handleUpdateOrder = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/order/${orderId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        orderStatus,
                        isPaid,
                        isDelivered,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update order");
            }

            onClose();
        } catch (error) {
            console.error("Update order details error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Update Order Details</DialogTitle>
                    <DialogDescription>
                        Update the status, payment, and delivery status for
                        order{" "}
                        <span className="uppercase">
                            ORD-2024-{orderId?.slice(-4)}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Order Status
                        </label>
                        <Select
                            value={orderStatus}
                            onValueChange={setOrderStatus}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select order status" />
                            </SelectTrigger>
                            <SelectContent>
                                {orderStatuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isPaid"
                            checked={isPaid}
                            onCheckedChange={setIsPaid}
                        />
                        <label
                            htmlFor="isPaid"
                            className="text-sm font-medium leading-none"
                        >
                            Paid
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isDelivered"
                            checked={isDelivered}
                            onCheckedChange={setIsDelivered}
                        />
                        <label
                            htmlFor="isDelivered"
                            className="text-sm font-medium leading-none"
                        >
                            Delivered
                        </label>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateOrder} disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Order"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateOrder;
