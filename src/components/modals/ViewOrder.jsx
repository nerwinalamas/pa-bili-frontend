import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

import useModalStore, { ModalTypes } from "../../store/useModalStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCard, MapPin, Package2 } from "lucide-react";
import { Badge } from "../ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/constants";

const ViewOrder = () => {
    const { isOpen, onClose, type, data: orderId } = useModalStore();
    const isModalOpen = isOpen && type === ModalTypes.VIEW_ORDER;

    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/order/${orderId}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch order");
                }

                const orderData = await response.json();

                setOrder(orderData);
            } catch (error) {
                console.error("Fetch order details error:", error);
            }
        };

        if (isModalOpen && orderId) {
            fetchOrder();
        }
    }, [orderId, isModalOpen]);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                        Order ID:{" "}
                        <span className="uppercase">{order._id ? `ORD-2024-${order._id.slice(-4)}` : "N/A"}</span>
                        {" "}• Created{" "}
                        {order.createdAt
                            ? format(order.createdAt, "MMMM dd, yyyy")
                            : "N/A"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    {/* Status Cards */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Order Status
                                </CardTitle>
                                <Package2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Badge
                                    variant={
                                        order.orderStatus === "Delivered"
                                            ? "default"
                                            : order.orderStatus === "Processing"
                                            ? "secondary"
                                            : "outline"
                                    }
                                >
                                    {order.orderStatus || "Pending"}
                                </Badge>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Payment Status
                                </CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Badge
                                    variant={
                                        order.isPaid ? "default" : "destructive"
                                    }
                                >
                                    {order.isPaid ? "Paid" : "Unpaid"}
                                </Badge>
                                <p className="text-sm text-muted-foreground mt-1">
                                    via {order.paymentMethod || "N/A"}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Delivery Status
                                </CardTitle>
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <Badge
                                    variant={
                                        order.isDelivered
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {order.isDelivered
                                        ? "Delivered"
                                        : "Pending"}
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h3 className="font-semibold mb-4">Order Items</h3>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product ID</TableHead>
                                        <TableHead className="text-center">
                                            Quantity
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Price
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Subtotal
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.orderItems &&
                                        order.orderItems.map((item) => {
                                            return (
                                                <TableRow key={item._id}>
                                                    <TableCell className="font-medium">
                                                        {item.product.name}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {item.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        ₱{item.price.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        ₱
                                                        {(
                                                            item.quantity *
                                                            item.price
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="text-right font-medium"
                                        >
                                            Total
                                        </TableCell>
                                        <TableCell className="text-right font-bold">
                                            ₱
                                            {order.totalPrice
                                                ? order.totalPrice.toFixed(2)
                                                : "0.00"}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div>
                        <h3 className="font-semibold mb-4">
                            Shipping Information
                        </h3>
                        <Card>
                            <CardContent className="pt-6">
                                <address className="not-italic">
                                    {order.shippingAddress ? (
                                        <>
                                            <div className="font-medium">
                                                {order.shippingAddress.street}
                                            </div>
                                            <div className="text-muted-foreground">
                                                {order.shippingAddress.city},{" "}
                                                {
                                                    order.shippingAddress
                                                        .postalCode
                                                }
                                            </div>
                                            <div className="text-muted-foreground">
                                                {order.shippingAddress.country}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-muted-foreground">
                                            No shipping information available
                                        </div>
                                    )}
                                </address>
                            </CardContent>
                        </Card>
                    </div>

                    <Separator />

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button>Update Order</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOrder;
