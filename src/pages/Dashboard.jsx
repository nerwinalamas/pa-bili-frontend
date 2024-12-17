import { useEffect } from "react";
import useModalStore, { ModalTypes } from "../store/useModalStore";
import useProductStore from "../store/useProductStore";
import ProductsTable from "../components/ProductsTable";

const Dashboard = () => {
    const products = useProductStore((state) => state.products);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const { onOpen } = useModalStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddProduct = () => {
        onOpen(ModalTypes.CREATE_PRODUCT);
    };

    const handleEditProduct = (productId) => {
        onOpen(ModalTypes.UPDATE_PRODUCT, productId);
    };

    const handleDeleteProduct = (productId) => {
        onOpen(ModalTypes.DELETE_PRODUCT, productId);
    };

    return (
        <main className="min-h-screen container mx-auto mt-4">
            <ProductsTable
                products={products}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
            />
        </main>
    );
};

export default Dashboard;
