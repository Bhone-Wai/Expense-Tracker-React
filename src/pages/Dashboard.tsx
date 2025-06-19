import TabsLists from "@/components/tabs/TabsLists.tsx";
import AddTransactionForm from "@/components/AddTransactionForm.tsx";
import SummaryStats from "@/components/SummaryStats.tsx";
import CategoryBreakdown from "@/components/CategoryBreakdown.tsx";
import RecentTransactions from "@/components/RecentTransactions.tsx";
import TabsWrapper from "@/components/tabs/TabsWrapper.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";

export default function Dashboard() {
    return (
        <TabsWrapper>
            <TabsContent value={'transactions'} className={'space-y-6'}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Add Transaction Form */}
                        <AddTransactionForm />

                        {/* Recent Transactions */}
                        <RecentTransactions />

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Summary Stats */}
                        <SummaryStats />

                        {/* Category Breakdown */}
                        <CategoryBreakdown />
                    </div>
                </div>
            </TabsContent>
        </TabsWrapper>
    );
}