import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DollarSign, TrendingDown, TrendingUp} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import useTransactions from "@/hooks/useTransactions.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {formatCurrency} from "@/lib/utils.ts";

interface SummaryStatsProps {
    month?: number;
    year?: number;
}

export default function SummaryStats({ month, year }: SummaryStatsProps) {
    const { monthlySummary, isLoadingMonthly } = useTransactions(month, year);

    if (isLoadingMonthly) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Monthly Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        );
    }

    const summary = monthlySummary || {
        totalIncome: 0,
        totalExpense: 0,
        netAmount: 0,
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Total Income</span>
                    </div>
                    <span className="font-semibold text-green-600">{formatCurrency(summary.totalIncome)}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium">Total Expenses</span>
                    </div>
                    <span className="font-semibold text-red-600">{formatCurrency(summary.totalExpense)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Net Income</span>
                    </div>
                    <span className={`font-semibold ${summary.netAmount >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(summary.netAmount)}
                        </span>
                </div>
            </CardContent>
        </Card>
    );
}