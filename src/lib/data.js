import placeholderImage from "../assets/placeholder-image.jpg";

export const navLinksData = [
    { id: "1", path: "/", label: "Home" },
    { id: "2", path: "/products", label: "Products" },
    { id: "3", path: "/about", label: "About" },
    { id: "4", path: "/contact", label: "Contact" },
];

// Dummy data
export const featuredProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: "$129.99",
        image: placeholderImage,
    },
    {
        id: 2,
        name: "Smart Fitness Tracker",
        price: "$79.99",
        image: placeholderImage,
    },
    {
        id: 3,
        name: "Ultra HD 4K Smart TV",
        price: "$599.99",
        image: placeholderImage,
    },
    {
        id: 4,
        name: "Professional DSLR Camera",
        price: "$899.99",
        image: placeholderImage,
    },
];

// Dummy data
export const initialProducts = [
    // Electronics Category
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Immersive sound quality with noise-canceling technology, comfortable over-ear design, and long-lasting battery life for music lovers and professionals.",
        price: 129.99,
        category: "Electronics",
        image: placeholderImage,
    },
    {
        id: 2,
        name: "Ultra HD 4K Smart TV",
        description: "Experience cinema-quality entertainment with stunning 4K resolution, HDR support, smart features, and a sleek bezel-less design for immersive viewing.",
        price: 599.99,
        category: "Electronics",
        image: placeholderImage,
    },
    {
        id: 3,
        name: "Portable Bluetooth Speaker",
        description: "Enjoy high-quality sound anywhere with this compact, waterproof Bluetooth speaker featuring 360-degree sound, 12-hour battery life, and rugged design.",
        price: 69.99,
        category: "Electronics",
        image: placeholderImage,
    },
    {
        id: 4,
        name: "Smartphone",
        description: "Advanced mobile device with edge-to-edge display, powerful processor, multi-lens camera system, and 5G connectivity for tech enthusiasts.",
        price: 799.99,
        category: "Electronics",
        image: placeholderImage,
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        description: "True wireless earbuds with active noise cancellation, crystal-clear sound, touch controls, and long-lasting battery for seamless audio experience.",
        price: 149.99,
        category: "Electronics",
        image: placeholderImage,
    },

    // Wearables Category
    {
        id: 6,
        name: "Smart Fitness Tracker",
        description: "Advanced fitness companion with heart rate monitoring, GPS tracking, sleep analysis, and water-resistant design for health-conscious individuals.",
        price: 79.99,
        category: "Wearables",
        image: placeholderImage,
    },
    {
        id: 7,
        name: "Smartwatch Pro",
        description: "Premium smartwatch with ECG monitoring, fall detection, cellular connectivity, and customizable watch faces for tech-savvy users.",
        price: 249.99,
        category: "Wearables",
        image: placeholderImage,
    },
    {
        id: 8,
        name: "Smart Ring",
        description: "Sleek wearable technology tracking fitness, sleep, and providing discreet notifications with minimalist design and long battery life.",
        price: 129.99,
        category: "Wearables",
        image: placeholderImage,
    },
    {
        id: 9,
        name: "GPS Running Watch",
        description: "Advanced sports watch with precise GPS tracking, performance metrics, training guides, and rugged water-resistant construction.",
        price: 199.99,
        category: "Wearables",
        image: placeholderImage,
    },
    {
        id: 10,
        name: "Health Monitoring Band",
        description: "Comprehensive health tracker monitoring heart rate, stress levels, oxygen saturation, and providing personalized wellness insights.",
        price: 89.99,
        category: "Wearables",
        image: placeholderImage,
    },

    // Photography Category
    {
        id: 11,
        name: "Professional DSLR Camera",
        description: "Capture life's moments with precision using a high-performance DSLR featuring a 24MP sensor, 4K video recording, and professional-grade lens compatibility.",
        price: 899.99,
        category: "Photography",
        image: placeholderImage,
    },
    {
        id: 12,
        name: "Mirrorless Camera",
        description: "Compact yet powerful camera with full-frame sensor, advanced autofocus, in-body stabilization, and professional video capabilities.",
        price: 1299.99,
        category: "Photography",
        image: placeholderImage,
    },
    {
        id: 13,
        name: "Drone Camera",
        description: "High-precision aerial photography drone with 4K camera, obstacle avoidance, extended flight time, and intelligent tracking features.",
        price: 799.99,
        category: "Photography",
        image: placeholderImage,
    },
    {
        id: 14,
        name: "Portable Photo Printer",
        description: "Compact wireless photo printer producing high-quality 4x6 prints instantly from smartphone or camera with vibrant color reproduction.",
        price: 129.99,
        category: "Photography",
        image: placeholderImage,
    },
    {
        id: 15,
        name: "Professional Tripod",
        description: "Sturdy and versatile camera tripod with adjustable height, ball head, lightweight carbon fiber construction for precise photography.",
        price: 249.99,
        category: "Photography",
        image: placeholderImage,
    },

    // Furniture Category
    {
        id: 16,
        name: "Ergonomic Office Chair",
        description: "Boost productivity and comfort with a fully adjustable ergonomic chair featuring lumbar support, breathable mesh back, and adaptive cushioning for long work hours.",
        price: 199.99,
        category: "Furniture",
        image: placeholderImage,
    },
    {
        id: 17,
        name: "Modern Sectional Sofa",
        description: "Spacious and stylish sectional sofa with modular design, premium fabric, comfortable cushioning, and versatile configuration options.",
        price: 899.99,
        category: "Furniture",
        image: placeholderImage,
    },
    {
        id: 18,
        name: "Standing Desk",
        description: "Adjustable height electric standing desk with memory settings, smooth motor, spacious work surface, and ergonomic design for productive workspaces.",
        price: 349.99,
        category: "Furniture",
        image: placeholderImage,
    },
    {
        id: 19,
        name: "Memory Foam Mattress",
        description: "Luxury memory foam mattress providing superior pressure relief, temperature regulation, and adaptive support for restful sleep.",
        price: 699.99,
        category: "Furniture",
        image: placeholderImage,
    },
    {
        id: 20,
        name: "Minimalist Coffee Table",
        description: "Contemporary coffee table with clean lines, tempered glass top, metal frame, and compact design for modern living spaces.",
        price: 179.99,
        category: "Furniture",
        image: placeholderImage,
    },

    // Kitchen Category
    {
        id: 21,
        name: "Stainless Steel Cookware Set",
        description: "Professional-grade kitchen essential with premium stainless steel construction, even heat distribution, durable design, and versatile cooking performance.",
        price: 149.99,
        category: "Kitchen",
        image: placeholderImage,
    },
    {
        id: 22,
        name: "Smart Instant Pot",
        description: "Multi-functional pressure cooker with WiFi connectivity, multiple cooking modes, precise temperature control, and recipe app integration.",
        price: 199.99,
        category: "Kitchen",
        image: placeholderImage,
    },
    {
        id: 23,
        name: "High-Performance Blender",
        description: "Powerful blender with multiple speed settings, noise-reduction technology, durable glass jar, and versatile blade design for smoothies and more.",
        price: 129.99,
        category: "Kitchen",
        image: placeholderImage,
    },
    {
        id: 24,
        name: "Air Fryer",
        description: "Healthy cooking appliance with large capacity, digital touch controls, multiple cooking presets, and rapid air circulation technology.",
        price: 89.99,
        category: "Kitchen",
        image: placeholderImage,
    },
    {
        id: 25,
        name: "Espresso Machine",
        description: "Professional-grade espresso maker with integrated grinder, milk frother, programmable settings, and café-quality brew capabilities.",
        price: 599.99,
        category: "Kitchen",
        image: placeholderImage,
    },

    // Fitness Category
    {
        id: 26,
        name: "Yoga Mat",
        description: "Premium yoga and exercise mat with extra-thick cushioning, non-slip surface, eco-friendly materials, and optimal comfort for all fitness levels.",
        price: 29.99,
        category: "Fitness",
        image: placeholderImage,
    },
    {
        id: 27,
        name: "Resistance Band Set",
        description: "Versatile resistance training set with multiple tension levels, durable latex bands, carrying bag, and exercise guide for full-body workouts.",
        price: 24.99,
        category: "Fitness",
        image: placeholderImage,
    },
    {
        id: 28,
        name: "Adjustable Dumbbells",
        description: "Space-saving dumbbell set with quick weight adjustment mechanism, ergonomic handles, and compact design for home strength training.",
        price: 249.99,
        category: "Fitness",
        image: placeholderImage,
    },
    {
        id: 29,
        name: "Home Workout Mirror",
        description: "Interactive fitness mirror with live and on-demand classes, real-time form correction, multiple workout styles, and sleek home design.",
        price: 1499.99,
        category: "Fitness",
        image: placeholderImage,
    },
    {
        id: 30,
        name: "Jump Rope",
        description: "Professional-grade jump rope with adjustable length, weighted handles, smooth ball bearings, ideal for cardio and CrossFit training.",
        price: 19.99,
        category: "Fitness",
        image: placeholderImage,
    }
];

// Dummy data
export const initialCartItems = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image: placeholderImage,
    },
    {
        id: 2,
        name: "Smart Fitness Tracker",
        price: 79.99,
        quantity: 2,
        image: placeholderImage,
    },
];

// Dummy data
export const orderHistory = [
    { id: "1234", date: "2023-05-01", total: 129.99, status: "Delivered" },
    { id: "5678", date: "2023-06-15", total: 79.99, status: "Shipped" },
    { id: "9012", date: "2023-07-20", total: 199.99, status: "Processing" },
];

// Dummy data
export const dashboardInitialProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 129.99,
        category: "Electronics",
    },
    {
        id: 2,
        name: "Smart Fitness Tracker",
        price: 79.99,
        category: "Wearables",
    },
    {
        id: 3,
        name: "Ultra HD 4K Smart TV",
        price: 599.99,
        category: "Electronics",
    },
];
