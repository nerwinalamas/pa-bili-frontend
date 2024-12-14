import { create } from "zustand";
import { API_BASE_URL } from "../lib/constants";

const useProductStore = create((set) => ({
    products: [],
    fetchProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            set({ products: data });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    createProduct: async (newProduct) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to create product");
            }

            const createdProduct = await response.json();
            set((state) => ({
                products: [...state.products, createdProduct],
            }));
        } catch (error) {
            console.error("Error creating product:", error);
        }
    },
    updateProduct: async (id, updatedData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const updatedProduct = await response.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? updatedProduct : product
                ),
            }));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            set((state) => ({
                products: state.products.filter(
                    (product) => product._id !== id
                ),
            }));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    },
}));

export default useProductStore;
