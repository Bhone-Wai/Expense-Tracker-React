import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";

export default function TabsLists() {
    const location = useLocation();
    const navigate = useNavigate();

    const routeToTab: Record<string, string> = {
        '/': 'transactions',
        '/budget-overview': 'budget',
        '/monthly-history': 'history',
    }

    const tabToRoute: Record<string, string> = {
        transactions: '/',
        budget: '/budget-overview',
        history: '/monthly-history',
    }

    const activeTab = routeToTab[location.pathname] || 'transactions';

    const handleTabChange = (value: string) => {
        navigate(tabToRoute[value]);
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions" className="w-full">
                    Add Transaction
                </TabsTrigger>
                <TabsTrigger value="budget" className="w-full">
                    Budget Overview
                </TabsTrigger>
                <TabsTrigger value="history" className="w-full">
                    Monthly History
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}