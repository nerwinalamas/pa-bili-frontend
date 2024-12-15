import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

const Products = () => {
    const { id } = useAuth();
    const products = useProductStore((state) => state.products);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const fetchCart = useCartStore((state) => state.fetchCart);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [filterCategory, setFilterCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (id) {
            fetchCart(id);
        }
    }, [id, fetchCart]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (value) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
        setFilterCategory(value);
        setCurrentPage(1);
    };

    const filteredAndSortedProducts = products
        .filter(
            (product) =>
                (filterCategory === "All" ||
                    product.category === filterCategory) &&
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortBy === "priceLowToHigh") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

    const totalPages = Math.ceil(filteredAndSortedProducts.length / pageSize);
    const paginatedProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const generatePaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <main className="min-h-screen container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="md:w-1/3"
                />
                <Select onValueChange={handleSort}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="priceLowToHigh">
                            Price: Low to High
                        </SelectItem>
                        <SelectItem value="priceHighToLow">
                            Price: High to Low
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleFilter}>
                    <SelectTrigger className="md:w-1/4">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Wearables">Wearables</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Kitchen">Kitchen</SelectItem>
                        <SelectItem value="Fitness">Fitness</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        userId={id}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((page) => Math.max(1, page - 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>

                    {generatePaginationButtons()}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            setCurrentPage((page) =>
                                Math.min(totalPages, page + 1)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </main>
    );
};

export default Products;
