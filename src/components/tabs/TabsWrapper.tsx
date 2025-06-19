import {Tabs} from "@/components/ui/tabs.tsx";
import type {ReactNode} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import TabsLists from "@/components/tabs/TabsLists.tsx";

const routeToTab: Record<string, string> = {
    '/': 'transactions',
    '/budget-overview': 'budget',
    '/monthly-history': 'history',
};

const tabToRoute: Record<string, string> = {
    transactions: '/',
    budget: '/budget-overview',
    history: '/monthly-history',
}

export default function TabsWrapper({children}: {children: ReactNode}) {
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = routeToTab[location.pathname] || 'transactions';

    const handleTabChange = (value: string) => {
        navigate(tabToRoute[value]);
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsLists />
            {children}
        </Tabs>
    );
}