import { useState } from "react";
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

const ProductList = () => {
    const products = [
        { name: "Adjustable Dumbbells", price: 249.99, quantity: 1 },
        { name: "Air Fryer", price: 89.99, quantity: 1 },
    ];

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
                {products.map((product) => (
                    <TableRow key={product.name}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                            {product.quantity}
                        </TableCell>
                        <TableCell>
                            ${product.price.toFixed(2)}
                        </TableCell>
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
                                    <Input id="firstName" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode">
                                        Postal Code
                                    </Label>
                                    <Input id="postalCode" />
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
                                        <span>$339.98</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>$10.00</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-medium">
                                        <span>Total</span>
                                        <span>$349.98</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg">
                            Place Order
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Checkout;
