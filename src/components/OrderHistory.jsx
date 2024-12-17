import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { format } from "date-fns";

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/order`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch order history");
                }

                const data = await response.json();
                setOrderHistory(data);
            } catch (error) {
                console.error("Fetch order history error:", error);
            }
        };

        fetchOrderHistory();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(orderHistory.length / pageSize);

    // Paginate data
    const paginatedData = orderHistory.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const generatePaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                    View your past orders and their status.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell className="uppercase">
                                    ORD-2024-{order._id.slice(-4)}
                                </TableCell>
                                <TableCell>
                                    {format(order.createdAt, "MMMM dd, yyyy")}
                                </TableCell>
                                <TableCell>
                                    ${order.totalPrice.toFixed(2)}
                                </TableCell>
                                <TableCell>{order.orderStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination Controls */}
                <div className="mt-4 flex items-center justify-center space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>

                    {generatePaginationButtons()}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default OrderHistory;
