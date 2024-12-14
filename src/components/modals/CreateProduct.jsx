import { useState } from "react";
import useModalStore, { ModalTypes } from "../../store/useModalStore";
import useProductStore from "../../store/useProductStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const CreateProduct = () => {
    const { isOpen, onClose, type } = useModalStore();
    const isModalOpen = isOpen && type === ModalTypes.CREATE_PRODUCT;

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const createProduct = useProductStore((state) => state.createProduct);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name: productName,
            description,
            price: parseFloat(price),
            category,
            stockQuantity: parseInt(stockQuantity),
            imageUrl,
        };

        try {
            await createProduct(productData);

            onClose();
            resetForm();
        } catch (error) {
            console.error("Error creating product:", error);
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
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new product.
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
                            {loading ? "Saving..." : "Save Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProduct;
