import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import type {BudgetVsActual} from "@/types/budget.ts";
import {formatCurrencyTHB} from "@/lib/utils.ts";

interface MonthlyGoalProgressProps {
    budget: BudgetVsActual[];
    currentBudget: {
        totalBudget: number;
        NEEDS: number;
        WANTS: number;
        SAVINGS: number;
    };
}

export default function MonthlyGoalProgress({ budget, currentBudget }: MonthlyGoalProgressProps) {
    const totalSpent = budget.reduce((sum, item) => sum + item.actual, 0);

    const categoryTotals = budget.reduce(
        (acc, item) => ({
            ...acc,
            [item.category]: item.actual,
        }),
        {
            NEEDS: 0,
            WANTS: 0,
            SAVINGS: 0,
        }
    );

    const progressValue =
        currentBudget.totalBudget > 0
            ? (totalSpent / currentBudget.totalBudget) * 100
            : 0;

    const remaining = currentBudget.totalBudget - totalSpent;
    const isOver = remaining < 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'text-2xl'}>Monthly Goal Progress</CardTitle>
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
                        <span>{formatCurrencyTHB(currentBudget.totalBudget)}</span>
                    </div>
                    <Progress value={progressValue} className="h-4" />
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
                        {categoryTotals.WANTS > currentBudget.WANTS && (
                            <p className="text-orange-600">• Want category is over budget</p>
                        )}
                        {categoryTotals.SAVINGS < currentBudget.SAVINGS && (
                            <p className="text-blue-600">• Consider increasing your savings</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}