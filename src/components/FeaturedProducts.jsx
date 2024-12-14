import { useEffect, useState } from "react";
import { getRandomProducts } from "../lib/getRandomProducts";
import { API_BASE_URL } from "../lib/constants";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProduct = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/products`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch related product");
                }

                const data = await response.json();
                const randomProducts = getRandomProducts(data, 4);
                setProducts(randomProducts);
            } catch (error) {
                console.error("Fetch related product error:", error);
            }
        };

        fetchRelatedProduct();
    }, []);

    return (
        <div className="py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-primary mb-8">
                    Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            productId={product._id}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            imageUrl={product.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;
