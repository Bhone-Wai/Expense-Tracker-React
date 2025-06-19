import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import useBudgets from "@/hooks/useBudgets.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {formatCurrency} from "@/lib/utils.ts";
import {expenseCategories} from "@/constants/categories.ts";

interface CategoryBreakdownProps {
    month?: number;
    year?: number;
}

interface BudgetCategory {
    category: string;
    budgeted: number;
    actual: number;
    remaining: number;
    percentUsed: number;
}

const categoryMap = expenseCategories.reduce((acc, category) => {
    acc[category.value] = category;
    return acc;
}, {} as Record<string, typeof expenseCategories[0]>);

export default function CategoryBreakdown({ month, year }: CategoryBreakdownProps) {
    const { budgetVsActual, isLoadingBudgetVsActual } = useBudgets(month, year);

    if (isLoadingBudgetVsActual) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Category Spending</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        );
    }

    const data = budgetVsActual && budgetVsActual.length > 0 ? budgetVsActual : expenseCategories.map(category => ({
        category: category.value,
        budgeted: 0,
        actual: 0,
        remaining: 0,
        percentUsed: 0
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Category Spending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map((item: BudgetCategory) => {
                    const categoryInfo = categoryMap[item.category as keyof typeof categoryMap];
                    const CategoryIcon = categoryInfo?.icon;
                    const categoryLabel = categoryInfo?.label || item.category;
                    const progress = item.percentUsed;
                    const isOverBudget = item.actual > item.budgeted && item.budgeted > 0;

                    return (
                        <div key={item.category} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {CategoryIcon && <CategoryIcon className="h-4 w-4 text-gray-600" />}
                                    <span className="text-sm font-medium">{categoryLabel.toUpperCase()}</span>
                                </div>
                                <span className="text-sm font-bold">{formatCurrency(item.actual)}</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Goal: {formatCurrency(item.budgeted)}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <Progress value={Math.min(progress, 100)} className="h-2" />
                                {isOverBudget && (
                                    <p className="text-xs text-red-600">
                                        Over budget by {formatCurrency(item.actual - item.budgeted)}
                                    </p>
                                )}
                                {/*{!isOverBudget && item.remaining > 0 && (
                                    <p className="text-xs text-green-600">
                                        {formatCurrency(item.remaining)} remaining
                                    </p>
                                )}*/}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}