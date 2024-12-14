import { useState, useEffect } from "react";
import { API_BASE_URL } from "../lib/constants";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/auth/verify`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    const data = await response.json();

                    setIsAuthenticated(true);
                    setId(data.id);
                } else {
                    setIsAuthenticated(false);
                    setId(""); 
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
                setIsAuthenticated(false);
                setId(""); 
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    return { isAuthenticated, id, isLoading };
};
