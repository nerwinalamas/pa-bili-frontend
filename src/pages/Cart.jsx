import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import useCartStore from "../store/useCartStore";
import placeholderImage from "../assets/placeholder-image.jpg";
import { Button } from "../components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateItemQuantity = useCartStore(
        (state) => state.updateItemQuantity
    );
    const { id } = useAuth();

    useEffect(() => {
        if (id) {
            fetchCart(id);
        }
    }, [id, fetchCart]);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 0) return;
    
        const item = {
            userId: id,
            productId,
            quantity: newQuantity,
        };
    
        try {
            await updateItemQuantity(item);
            fetchCart(id);
        } catch (error) {
            console.error("Update quantity error:", error);
        }
    };

    const handleRemoveItem = async (productId) => {
        const item = {
            userId: id,
            productId,
        };

        try {
            await removeFromCart(item);
        } catch (error) {
            console.error("Remove item error:", error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <main className="min-h-screen container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-6 px-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="rounded-full bg-muted p-6">
                            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Your cart is empty
                            </h2>
                            <p className="text-muted-foreground">
                                Looks like you haven&apos;t added anything to
                                your cart yet.
                            </p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link to="/products">Continue Shopping</Link>
                    </Button>
                </div>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Product
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItems.map((item) => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <img
                                                src={
                                                    item.productId.imageUrl ||
                                                    placeholderImage
                                                }
                                                alt={`${item.productId.name} image`}
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.productId.name}
                                        </TableCell>
                                        <TableCell>
                                            ${item.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex w-[150px] items-center">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-none"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <div className="flex-1 text-center">
                                                    <span className="text-sm">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-none"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        item.productId._id
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <div className="mt-8 flex flex-col items-end">
                        <div className="text-2xl font-bold mb-4">
                            Total: ${calculateTotal().toFixed(2)}
                        </div>
                        <Link to="/checkout">
                            <Button type="button" size="lg">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </main>
    );
};

export default Cart;
