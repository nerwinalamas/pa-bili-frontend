import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";
import ProductCard from "../components/ProductCard";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

const Products = () => {
    const products = useProductStore((state) => state.products);
    const fetchProducts = useProductStore((state) => state.fetchProducts);
    const fetchCart = useCartStore((state) => state.fetchCart);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [filterCategory, setFilterCategory] = useState("All");
    const { id } = useAuth();

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
    };

    const handleSort = (value) => {
        setSortBy(value);
    };

    const handleFilter = (value) => {
        setFilterCategory(value);
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
                {filteredAndSortedProducts.map((product) => (
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
        </main>
    );
};

export default Products;
