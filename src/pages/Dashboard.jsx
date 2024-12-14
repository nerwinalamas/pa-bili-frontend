import { useEffect } from "react";
import useModalStore, { ModalTypes } from "../store/useModalStore";
import { Button } from "../components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import useProductStore from "../store/useProductStore";

const Dashboard = () => {
    const products = useProductStore((state) => state.products);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const { onOpen } = useModalStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <main className="min-h-screen container mx-auto px-4 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Admin - Product Management
                </h1>
                <Button onClick={() => onOpen(ModalTypes.CREATE_PRODUCT)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            onOpen(
                                                ModalTypes.UPDATE_PRODUCT,
                                                product._id
                                            )
                                        }
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            onOpen(
                                                ModalTypes.DELETE_PRODUCT,
                                                product._id
                                            )
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default Dashboard;
