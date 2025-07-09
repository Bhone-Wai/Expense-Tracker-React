import {CardContent} from "@/components/ui/card.tsx";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import type {MonthlyFinancialData} from "@/types/financial.ts";
import {MonthlyFinancialCard} from "@/components/monthly_history/MonthlyFinancialCard.tsx";

export default function MonthlyFinancial() {
    const { monthlySummary, isLoadingMonthly } = useTransactionQuery();

    const transformedData: MonthlyFinancialData = {
        totalIncome: monthlySummary?.totalIncome || 0,
        totalExpense: monthlySummary?.totalExpense || 0,
        netAmount: monthlySummary?.netAmount || 0,
        totalTransactions: monthlySummary?.totalTransactions || 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        status: 'active',
        isCurrentMonth: true
    }

    if (isLoadingMonthly) {
        return (
            <CardContent>
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                </div>
            </CardContent>
        );
    }

    return (
        <CardContent>
            <div className="space-y-6">
                <MonthlyFinancialCard data={transformedData} />
            </div>
        </CardContent>
    )
}