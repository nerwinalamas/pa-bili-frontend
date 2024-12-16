import useCartStore from "../store/useCartStore";
import { API_BASE_URL } from "../lib/constants";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../components/ui/card";
import { CheckCircle2, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderConfirmation = () => {
    const { id } = useParams();
    const fetchCart = useCartStore((state) => state.fetchCart);

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchCart(id);
        }
    }, [id, fetchCart]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${API_BASE_URL}/api/order/${id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch order");
                }

                const data = await response.json();

                setStreet(data.shippingAddress.street);
                setCity(data.shippingAddress.city);
                setPostalCode(data.shippingAddress.postalCode);
                setCountry(data.shippingAddress.country);
            } catch (error) {
                console.error("Fetch order details error:", error);
                setError("Order not found or invalid ID.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                        <h1 className="text-2xl font-bold text-center">
                            Order Confirmed!
                        </h1>
                        <p className="text-gray-500 text-center">
                            Thank you for your order. We&apos;ll send you a
                            confirmation email with your order details.
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : (
                        <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    Order Number
                                </span>
                                <span className="text-gray-600">
                                    #ORD-2024-{id.slice(0, 4)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    Delivery Estimate
                                </span>
                                <span className="text-gray-600">
                                    3-5 Business Days
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">
                                    Shipping Address
                                </span>
                                <span className="text-gray-600 text-right">
                                    {street}
                                    <br />
                                    {city}, {postalCode} {country}
                                </span>
                            </div>
                        </div>
                    )}

                    {!error && (
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <Package className="w-4 h-4" />
                            <span>
                                You will receive shipping updates via email
                            </span>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                    {!error && (
                        <Link to="/account">
                            <Button className="w-full">Track Order</Button>
                        </Link>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default OrderConfirmation;
