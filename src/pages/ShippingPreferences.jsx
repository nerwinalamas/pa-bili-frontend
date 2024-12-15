import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";

const ShippingPreferences = () => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchShippingPreference = async () => {
            try {
                setIsLoading(true);

                const response = await fetch(
                    `${API_BASE_URL}/api/auth/shipping-preferences`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();

                if (data.shippingAddress) {
                    const { street, city, postalCode, country } =
                        data.shippingAddress;
                    setStreet(street || "");
                    setCity(city || "");
                    setPostalCode(postalCode || "");
                    setCountry(country || "");
                }

                console.log("shipping pref:", data)
            } catch (error) {
                console.error("Shipping preference fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchShippingPreference();
    }, []);

    const handleUpdateShippingPreference = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/auth/shipping-preferences`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        street,
                        city,
                        postalCode,
                        country,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update shipping address");
            }

            
        } catch (error) {
            console.error("Change shipping preference error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Shipping Preferences</CardTitle>
                    <CardDescription>
                        Manage your default shipping address and preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleUpdateShippingPreference}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                                id="street"
                                type="text"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Postal Code</Label>
                            <Input
                                id="postalCode"
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="button" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShippingPreferences;
