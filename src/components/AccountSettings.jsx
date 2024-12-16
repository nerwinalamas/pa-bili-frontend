import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../lib/constants";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { CreditCard, LogOut, Package, User } from "lucide-react";

const AccountSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Failed to logout");
            }

            console.log("logout data:", data);
            navigate("/");
        } catch (error) {
            console.error("Profile update error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                    Manage your account settings and preferences.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span>Change Password</span>
                    </div>
                    <Link to="/account/change-password">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                        >
                            Update
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Payment Methods</span>
                    </div>
                    {/* <Link to="/account/payment-methods"> */}
                    <Button type="button" variant="outline" disabled>
                        Manage
                    </Button>
                    {/* </Link> */}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Package className="h-5 w-5" />
                        <span>Shipping Preferences</span>
                    </div>
                    <Link to="/account/shipping-preferences">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isLoading}
                        >
                            Edit
                        </Button>
                    </Link>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    variant="destructive"
                    onClick={handleLogout}
                    disabled={isLoading}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoading ? "Logging Out..." : "Log out"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AccountSettings;
