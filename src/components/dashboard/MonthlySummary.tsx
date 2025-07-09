import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DollarSign, TrendingDown, TrendingUp} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import {formatCurrencyTHB} from "@/lib/utils.ts";
import {SummarySkeletonCard} from "@/components/common/SkeletonLoader.tsx";
import * as React from "react";

interface SummaryRowProps {
    icon: React.ReactNode;
    label: string;
    value: number;
    valueClass?: string;
}

function SummaryRow({ icon, label, value, valueClass = '' }: SummaryRowProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            <span className={`font-semibold ${valueClass}`}>{formatCurrencyTHB(value)}</span>
        </div>
    );
}

interface SummaryStatsProps {
    month?: number;
    year?: number;
}

export default function MonthlySummary({ month, year }: SummaryStatsProps) {
    const { monthlySummary, isLoadingMonthly } = useTransactionQuery(month, year);

    if (isLoadingMonthly) {
        return (
            <SummarySkeletonCard title={'Monthly Summary'} />
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
                <SummaryRow
                    icon={<TrendingUp className="h-4 w-4 text-green-600" />}
                    label={'Total Income'}
                    value={summary.totalIncome}
                    valueClass={'text-green-600'}
                />

                <SummaryRow
                    icon={<TrendingDown className="h-4 w-4 text-red-600" />}
                    label={'Total Expenses'}
                    value={summary.totalExpense}
                    valueClass={'text-red-600'}
                />

                <Separator />

                <SummaryRow
                    icon={<DollarSign className="h-4 w-4 text-blue-600" />}
                    label={'Net Income'}
                    value={summary.netAmount}
                    valueClass={`${summary.netAmount >= 0 ? "text-green-600" : "text-red-600"}`}
                />
            </CardContent>
        </Card>
    );
}