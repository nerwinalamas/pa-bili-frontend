import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Package, Plus, Trash2 } from "lucide-react";

const ShippingPreferences = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Shipping Preferences</CardTitle>
                    <CardDescription>
                        Manage your shipping addresses and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button className="w-full justify-start space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add New Address</span>
                    </Button>

                    <div className="space-y-4">
                        <h3 className="font-medium">
                            Default Shipping Address
                        </h3>
                        <RadioGroup defaultValue="home">
                            <div className="flex items-start space-x-4 border rounded-lg p-4">
                                <RadioGroupItem value="home" id="home" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label
                                        htmlFor="home"
                                        className="font-medium"
                                    >
                                        Home
                                    </Label>
                                    <p className="text-sm text-gray-500">
                                        123 Main Street
                                        <br />
                                        Apt 4B
                                        <br />
                                        New York, NY 10001
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto text-red-500"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Delivery Preferences</h3>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <Package className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        Delivery Instructions
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Leave packages at the front door
                                    </p>
                                </div>
                            </div>
                            <Button variant="outline">Edit</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShippingPreferences;
