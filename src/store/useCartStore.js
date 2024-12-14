import { create } from "zustand";
import { API_BASE_URL } from "../lib/constants";

const useCartStore = create((set) => ({
    cartItems: [],
    itemCount: 0,
    fetchCart: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart/${userId}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }

            const data = await response.json();
            set({
                cartItems: data.items,
                itemCount: data.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                ),
            });
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    },
    addToCart: async (item) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }

            const updatedCart = await response.json();

            const newItemCount = updatedCart.items.reduce(
                (total, cartItem) => total + cartItem.quantity,
                0
            );

            set({
                cartItems: updatedCart.items,
                itemCount: newItemCount,
            });
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    },
    removeFromCart: async (item) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error("Failed to remove item from cart");
            }

            const updatedCart = await response.json();

            const newItemCount = updatedCart.items.reduce(
                (total, cartItem) => total + cartItem.quantity,
                0
            );

            set((state) => ({
                cartItems: state.cartItems.filter(cartItem => cartItem.productId._id !== item.productId),
                itemCount: newItemCount,
            }));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    },
    updateItemQuantity: async (item) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error("Failed to update item quantity");
            }

            const updatedCart = await response.json();

            const newItemCount = updatedCart.items.reduce(
                (total, cartItem) => total + cartItem.quantity,
                0
            );

            set({
                cartItems: updatedCart.items,
                itemCount: newItemCount,
            });
        } catch (error) {
            console.error("Error updating item quantity:", error);
        }
    },
}));

export default useCartStore;
