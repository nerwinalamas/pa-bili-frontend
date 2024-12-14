import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
    return (
        <footer className="bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                            About Us
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            pa-bili is your trusted online store for all your
                            shopping needs. We focus on quality, value, and
                            exceptional service.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Shipping
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Returns
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                            Follow Us
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Pinterest
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">
                            Newsletter
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe to our newsletter for updates and
                            exclusive offers.
                        </p>
                        <form className="flex space-x-2">
                            <Input type="email" placeholder="Your email" />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center">
                    <p className="text-sm text-muted-foreground">
                        © 2024 pa-bili. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
