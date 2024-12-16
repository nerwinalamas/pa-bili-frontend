import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import useCartStore from "../store/useCartStore";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const cartItems = useCartStore((state) => state.cartItems);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cartItems.map((product) => (
                    <TableRow key={product._id}>
                        <TableCell>{product.productId.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                            ${(product.price * product.quantity).toFixed(2)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const cartItems = useCartStore((state) => state.cartItems);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(
                    `${API_BASE_URL}/api/auth/profile`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();

                setFirstName(data.firstName);
                setLastName(data.lastName);
                setStreet(data.street);
                setCity(data.city);
                setPostalCode(data.postalCode);
                setCountry(data.country);
            } catch (error) {
                console.error("fetch data error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateTotal = () => {
        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const shippingFee = 10;
        const total = subtotal + shippingFee;

        return { subtotal, shippingFee, total };
    };

    const fees = calculateTotal();

    const handlePlaceOrder = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/order`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderItems: cartItems,
                    shippingAddress: { street, city, postalCode, country },
                    paymentMethod,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order");
            }

            const data = await response.json();

            navigate(`/order-confirmation/${data._id}`)
        } catch (error) {
            console.error("Place order error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Checkout</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Shipping Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Shipping Information
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="street">Street</Label>
                                    <Input
                                        id="street"
                                        type="text"
                                        value={street}
                                        onChange={(e) =>
                                            setStreet(e.target.value)
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">
                                        Postal Code
                                    </Label>
                                    <Input
                                        id="postalCode"
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) =>
                                            setPostalCode(e.target.value)
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Payment Method */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Payment Method
                            </h3>
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="grid gap-4"
                            >
                                <div className="flex items-center space-x-4 rounded-lg border p-4">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card" className="flex-1">
                                        Credit/Debit Card
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-4 rounded-lg border p-4">
                                    <RadioGroupItem value="gcash" id="gcash" />
                                    <Label htmlFor="gcash" className="flex-1">
                                        GCash
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-4 rounded-lg border p-4">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <Label htmlFor="cod" className="flex-1">
                                        Cash on Delivery
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Products List */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Products</h3>
                            <ProductList />
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                Order Summary
                            </h3>
                            <div className="rounded-lg border p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${fees.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>
                                            ${fees.shippingFee.toFixed(2)}
                                        </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>${fees.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="button"
                            className="w-full"
                            size="lg"
                            onClick={handlePlaceOrder}
                            disabled={isLoading}
                        >
                            {isLoading ? "Placing Order..." : "Place Order"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Checkout;
