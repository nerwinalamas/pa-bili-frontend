import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-60 h-full bg-white shadow-sm border">
            <div className="p-2 flex items-center justify-center">
                <Link to="/">
                    <h2 className="text-xl font-bold">pa-bili</h2>
                </Link>
            </div>
            <ul className="h-full p-2 space-y-2">
                <li>
                    <Link
                        to="/dashboard"
                        className="block p-2 hover:bg-gray-200"
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="/orders" className="block p-2 hover:bg-gray-200">
                        Orders
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
