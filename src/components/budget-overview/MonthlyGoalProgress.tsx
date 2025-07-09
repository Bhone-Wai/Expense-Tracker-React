import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import type {BudgetVsActual} from "@/types/budget.ts";
import {formatCurrencyTHB} from "@/lib/utils.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface MonthlyGoalProgressProps {
    budgetVsActual: BudgetVsActual[];
    totalBudget: number;
    isLoading: boolean;
}

export default function MonthlyGoalProgress({ budgetVsActual, totalBudget, isLoading }: MonthlyGoalProgressProps) {
    const totalSpent = budgetVsActual.reduce((sum, item) => sum + item.actual, 0);

    const progress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const remaining = budgetVsActual.reduce((sum, item) => sum + item.remaining, 0);
    const isOver = remaining < 0;

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>Monthly Goal Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <Skeleton className="h-8 w-1/2 mx-auto" />
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2 mx-auto" />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'text-2xl font-semibold'}>Monthly Goal Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Total Spent */}
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">
                        {formatCurrencyTHB(totalSpent)}
                    </div>
                    <p className="text-sm text-gray-600">Total Spent This Month</p>
                </div>

                {/* Overall Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Monthly Budget</span>
                        <span>{formatCurrencyTHB(totalBudget)}</span>
                    </div>
                    <Progress value={progress} className="h-4" />
                    <div className="text-center text-sm text-gray-600">
                        {isOver
                            ? `Over budget by ${formatCurrencyTHB(Math.abs(remaining))}`
                            : `${formatCurrencyTHB(remaining)} remaining`}
                    </div>
                </div>

                <Separator />

                {/* Recommendations */}
                <div className="space-y-2">
                    <h4 className="font-medium">Budget Recommendations</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                        {isOver ? (
                            <p className="text-red-600">• Consider reducing spending in overspent categories</p>
                        ) : (
                            <p className="text-green-600">• You're on track with your budget goals!</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}