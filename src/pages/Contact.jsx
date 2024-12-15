import { useState } from "react";
import { API_BASE_URL } from "../lib/constants";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-muted-foreground mb-4">
                        We&apos;re here to help and answer any question you
                        might have. We look forward to hearing from you!
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-muted-foreground">
                                support@pa-bili.com
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p className="text-muted-foreground">
                                +1 (555) 123-4567
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p className="text-muted-foreground">
                                123 E-commerce Street
                                <br />
                                Shopville, SH 12345
                                <br />
                                United States
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">
                        Send us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-muted-foreground mb-1"
                            >
                                Name
                            </label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-muted-foreground mb-1"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-muted-foreground mb-1"
                            >
                                Message
                            </label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Contact;
