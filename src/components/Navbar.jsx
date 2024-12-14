import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useCartStore from "../store/useCartStore";
import { API_BASE_URL } from "../lib/constants";
import { Button } from "./ui/button";
import { Menu, Settings, ShoppingCart, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { navLinksData } from "../lib/data";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const itemCount = useCartStore((state) => state.itemCount);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const { id, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/admin`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user admin");
                }

                const data = await response.json();
                setIsAdmin(data.isAdmin);
            } catch (error) {
                console.error("User admin fetch error:", error);
            }
        };

        fetchAdmin();
    }, []);

    useEffect(() => {
        if (id) {
            fetchCart(id);
        }
    }, [id, fetchCart]);

    const UserActions = () => (
        <>
            <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                        <p className="absolute -top-1 -right-1 text-xs w-5 h-5 font-semibold flex items-center justify-center bg-red-500 rounded-full text-white">
                            {itemCount}
                        </p>
                    )}
                </Button>
            </Link>
            <Link to="/account">
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                </Button>
            </Link>
            {isAdmin && (
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </Link>
            )}
        </>
    );

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-primary"
                        >
                            pa-bili
                        </Link>
                    </div>
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <nav className="flex flex-col space-y-6 mt-4">
                                    {navLinksData.map((navlink) => {
                                        return (
                                            <Link
                                                key={navlink.id}
                                                to={navlink.path}
                                                className="text-sm font-medium text-muted-foreground hover:text-primary"
                                            >
                                                {navlink.label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                                <div className="mt-8">
                                    {isAuthenticated ? (
                                        <div className="flex flex-col space-y-4">
                                            <UserActions />
                                        </div>
                                    ) : (
                                        <Link to="/login">
                                            <Button className="w-full">
                                                Login
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <nav className="hidden lg:flex space-x-10">
                        {navLinksData.map((navlink) => {
                            return (
                                <Link
                                    key={navlink.id}
                                    to={navlink.path}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                                >
                                    {navlink.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="hidden lg:flex">
                        {isAuthenticated ? (
                            <div className="flex items-center">
                                <Link to="/cart">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        {itemCount > 0 && (
                                            <p className="absolute -top-1 -right-1 text-xs w-5 h-5 font-semibold flex items-center justify-center bg-red-500 rounded-full text-white">
                                                {itemCount}
                                            </p>
                                        )}
                                    </Button>
                                </Link>
                                <Link to="/account">
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>
                                {isAdmin && (
                                    <Link to="/dashboard">
                                        <Button variant="ghost" size="icon">
                                            <Settings className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button>Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
