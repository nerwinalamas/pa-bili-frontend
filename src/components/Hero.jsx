import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
    return (
        <div className="bg-muted py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
                        Everything You Need, All in One Place
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground">
                        Explore our vast catalog and enjoy shopping from the
                        comfort of your home. Excellent quality, unbeatable
                        value.
                    </p>
                    <div className="mt-8 flex space-x-4">
                        <Link to="/products">
                            <Button size="lg">Shop Now</Button>
                        </Link>
                        <Link to="/about">
                            <Button size="lg" variant="outline">
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
