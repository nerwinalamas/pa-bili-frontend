import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { CreditCard, Plus, Trash2 } from "lucide-react";

const PaymentMethods = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                        Manage your payment methods and billing details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button className="w-full justify-start space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Add New Payment Method</span>
                    </Button>

                    {/* Example saved card */}
                    <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium">
                                        •••• •••• •••• 4242
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Expires 12/24
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentMethods;
