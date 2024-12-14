import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import placeholderImage from "../assets/placeholder-image.jpg";
import { API_BASE_URL } from "../lib/constants";
import RelatedProducts from "../components/RelatedProducts";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../components/ui/carousel";
import { Heart, Minus, Plus } from "lucide-react";

const ProductDetails = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stockQuantity, setStockQuantity] = useState(0);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/products/${id}`,
                    {
                        method: "GET",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }

                const data = await response.json();

                setProductName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setCategory(data.category);
                setStockQuantity(data.stockQuantity);
                setImageUrl(data.imageUrl);
            } catch (error) {
                console.error("Fetch product error:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const increaseQuantity = () => {
        if (quantity < stockQuantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Product Images */}
                <div className="space-y-4">
                    <Carousel className="w-full max-w-xl">
                        <CarouselContent>
                            {[1, 2, 3].map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-square overflow-hidden flex items-center justify-center rounded-lg">
                                        <img
                                            src={imageUrl || placeholderImage}
                                            alt={`Product image ${index + 1}`}
                                            className="object-cover"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="relative aspect-square cursor-pointer overflow-hidden flex items-center justify-center rounded-lg border-2 border-transparent hover:border-primary"
                            >
                                <img
                                    src={imageUrl || placeholderImage}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{productName}</h1>
                        <p className="text-2xl font-semibold text-primary">
                            ${price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {category}
                        </p>
                    </div>

                    <Separator />

                    {/* Quantity Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Quantity</label>
                        <div className="flex w-[150px] items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-none"
                                onClick={decreaseQuantity}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex-1 text-center">
                                <span className="text-sm">{quantity}</span>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-none"
                                onClick={increaseQuantity}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button size="lg" className="flex-1">
                            Add to Cart
                        </Button>
                        <Button size="lg" variant="outline">
                            <Heart className="mr-2 h-4 w-4" />
                            Add to Wishlist
                        </Button>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">
                            Product Description
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts category={category} />
        </div>
    );
};

export default ProductDetails;
