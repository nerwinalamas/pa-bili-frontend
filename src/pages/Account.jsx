import Profile from "../components/Profile";
import OrderHistory from "../components/OrderHistory";
import AccountSettings from "../components/AccountSettings";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";

const Account = () => {
    return (
        <main className="min-h-screen container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Profile />
                </TabsContent>
                <TabsContent value="orders">
                    <OrderHistory />
                </TabsContent>
                <TabsContent value="settings">
                    <AccountSettings />
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default Account;
