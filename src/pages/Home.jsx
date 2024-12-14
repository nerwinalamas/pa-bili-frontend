import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";

const Home = () => {
    return (
        <main className="min-h-screen">
            <Hero />
            <FeaturedProducts />
        </main>
    );
};

export default Home;
