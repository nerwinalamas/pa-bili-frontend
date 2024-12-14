import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../lib/constants";
import useModalStore, { ModalTypes } from "../../store/useModalStore";
import useProductStore from "../../store/useProductStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const UpdateProduct = () => {
    const { isOpen, onClose, type, data: productId } = useModalStore();
    const isModalOpen = isOpen && type === ModalTypes.UPDATE_PRODUCT;

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const updateProduct = useProductStore((state) => state.updateProduct);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/products/${productId}`,
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

        if (isModalOpen && productId) {
            fetchProduct();
        }
    }, [isModalOpen, productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isModalOpen && !productId) return;
        setLoading(true);

        const updatedProductData = {
            name: productName,
            description,
            price: parseFloat(price),
            category,
            stockQuantity: parseInt(stockQuantity),
            imageUrl,
        };

        try {
            await updateProduct(productId, updatedProductData);

            onClose();
            resetForm();
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setStockQuantity("");
        setImageUrl("");
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                    <DialogDescription>
                        Please fill in the fields you wish to update.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger id="category">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">
                                    All Categories
                                </SelectItem>
                                <SelectItem value="Electronics">
                                    Electronics
                                </SelectItem>
                                <SelectItem value="Wearables">
                                    Wearables
                                </SelectItem>
                                <SelectItem value="Photography">
                                    Photography
                                </SelectItem>
                                <SelectItem value="Furniture">
                                    Furniture
                                </SelectItem>
                                <SelectItem value="Kitchen">Kitchen</SelectItem>
                                <SelectItem value="Fitness">Fitness</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="stockQuantity">Stock Quantity</Label>
                        <Input
                            id="stockQuantity"
                            type="number"
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProduct;
