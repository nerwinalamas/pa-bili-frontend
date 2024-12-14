const About = () => {
    return (
        <main className="min-h-screen container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">About pa-bili</h1>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
                    <p className="text-muted-foreground">
                        Founded in 2024, pa-bili started as a small online
                        store with a big dream: to provide customers with a wide
                        range of high-quality products at competitive prices.
                        Over the years, we&apos;ve grown into one of the leading
                        e-commerce platforms, serving millions of satisfied
                        customers worldwide.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                    <p className="text-muted-foreground">
                        At pa-bili, our mission is to make online shopping
                        accessible, enjoyable, and rewarding for everyone. We
                        strive to offer an unparalleled selection of products,
                        exceptional customer service, and a seamless shopping
                        experience from start to finish.
                    </p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Why Choose Us?
                    </h2>
                    <ul className="list-disc list-inside text-muted-foreground">
                        <li>
                            Extensive product range across multiple categories
                        </li>
                        <li>Competitive prices and regular deals</li>
                        <li>Fast and reliable shipping</li>
                        <li>Secure payment options</li>
                        <li>Dedicated customer support team</li>
                        <li>Easy returns and refunds policy</li>
                    </ul>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold mb-3">
                        Our Commitment
                    </h2>
                    <p className="text-muted-foreground">
                        We&apos;re committed to continually improving our
                        services, expanding our product offerings, and staying
                        at the forefront of e-commerce innovation. Your
                        satisfaction is our top priority, and we&apos;re
                        dedicated to making your shopping experience with
                        pa-bili the best it can be.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default About;
