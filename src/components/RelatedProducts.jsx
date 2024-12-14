import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import { getRandomProducts } from "../lib/getRandomProducts";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

const RelatedProducts = ({ category }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProduct = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/products/category/${category}`,
                    {
                        method: "GET",
                    }
                );

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

        if (category) {
            fetchRelatedProduct();
        }
    }, [category]);

    return (
        <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    );
};

RelatedProducts.propTypes = {
    category: PropTypes.string.isRequired,
};

export default RelatedProducts;
