import useModalStore, { ModalTypes } from "../../store/useModalStore";
import useProductStore from "../../store/useProductStore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

const DeleteProduct = () => {
    const { isOpen, onClose, type, data: productId } = useModalStore();
    const isModalOpen = isOpen && type === ModalTypes.DELETE_PRODUCT;

    const deleteProduct = useProductStore((state) => state.deleteProduct);

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!isModalOpen && !productId) return;
        setLoading(true);

        try {
            await deleteProduct(productId);

            onClose();
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this product? This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteProduct;
