import {CardContent} from "@/components/ui/card.tsx";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import type {MonthlyFinancialData} from "@/types/financial.ts";
import {MonthlyFinancialCard} from "@/components/monthly-history/MonthlyFinancialCard.tsx";
import {useMemo} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function MonthlyFinancial() {
    const { monthlySummary, isLoadingMonthly } = useTransactionQuery();

    const transformedData: MonthlyFinancialData = useMemo(() => ({
        totalIncome: monthlySummary?.totalIncome || 0,
        totalExpense: monthlySummary?.totalExpense || 0,
        netAmount: monthlySummary?.netAmount || 0,
        totalTransactions: monthlySummary?.totalTransactions || 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        status: 'active',
        isCurrentMonth: true
    }), [monthlySummary]);

    if (isLoadingMonthly) {
        return (
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="h-4 w-1/4" />
                    <div className="grid grid-cols-3 gap-4 mt-3">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
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