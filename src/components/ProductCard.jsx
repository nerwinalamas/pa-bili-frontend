import PropTypes from "prop-types";
import useCartStore from "../store/useCartStore";
import placeholderImage from "../assets/placeholder-image.jpg";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Link } from "react-router-dom";

const ProductCard = ({ userId, productId, name, price, imageUrl }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = async (e) => {
        e.preventDefault();

        const newItem = {
            userId,
            productId,
            quantity: 1,
            price,
        };

        try {
            await addToCart(newItem);
        } catch (error) {
            console.error("Add to cart error:", error);
        }
    };

    return (
        <Link to={`/products/${productId}`}>
            <Card>
                <CardContent className="p-4">
                    <img
                        src={imageUrl || placeholderImage}
                        alt={name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-contain rounded-md mb-4"
                    />
                    <h2 className="text-lg font-semibold mb-2">{name}</h2>
                    <p className="text-muted-foreground">${price.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                    <Button
                        type="button"
                        className="w-full"
                        onClick={(e) => handleAddToCart(e)}
                    >
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
};

ProductCard.propTypes = {
    userId: PropTypes.string,
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
};

export default ProductCard;
