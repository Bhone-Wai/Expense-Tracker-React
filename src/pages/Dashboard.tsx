import TransactionForm from "@/components/dashboard/TransactionForm.tsx";
import MonthlySummary from "@/components/dashboard/MonthlySummary.tsx";
import CategorySpending from "@/components/dashboard/CategorySpending.tsx";
import RecentTransactions from "@/components/dashboard/RecentTransactions.tsx";
import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";

export default function Dashboard() {
    return (
        <TabsWrapper>
            <TabsContent value={'transactions'} className={'space-y-6'}>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Add Transaction Form */}
                        <TransactionForm />

                        {/* Recent Transactions */}
                        <RecentTransactions />

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Summary Stats */}
                        <MonthlySummary />

                        {/* Category Breakdown */}
                        <CategorySpending />
                    </div>
                </div>
            </TabsContent>
        </TabsWrapper>
    );
}