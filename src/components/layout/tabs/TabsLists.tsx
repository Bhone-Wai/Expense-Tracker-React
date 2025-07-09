import { TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

export default function TabsLists() {
    return (
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
    );
}