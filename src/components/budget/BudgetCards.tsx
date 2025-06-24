import {expenseCategoryMeta, incomeCategoryMeta} from "@/constants/categoryMeta.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {formatCurrencyTHB} from "@/lib/utils.ts";

interface CategoryBudgetCardsProps {
    currentBudget: {
        totalBudget: number;
        [key: string]: number;
    };
    stats: {
        categoryTotals: {
            [key: string]: number;
        };
    };
}

// Get category info from constants
const getCategoryInfo = (categoryValue: string) => {
    const allCategories = [...incomeCategoryMeta, ...expenseCategoryMeta];
    const categoryInfo = allCategories.find(cat => cat.value === categoryValue);

    return {
        label: categoryInfo?.label || categoryValue,
        icon: categoryInfo?.icon
    };
};

export default function BudgetCards({ currentBudget, stats }: CategoryBudgetCardsProps) {
    return (
        <>
            {Object.entries(currentBudget)
                .filter(([key]) => !["totalBudget", "month", "year"].includes(key))
                .map(([category, amount]) => {
                    const { label, icon: CategoryIcon } = getCategoryInfo(category);
                    const spent = stats.categoryTotals[category] || 0;
                    const remaining = amount - spent;

                    return (
                        <Card key={category}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    {label} Budget
                                </CardTitle>
                                {CategoryIcon && <CategoryIcon className="h-4 w-4 text-gray-600" />}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrencyTHB(amount)}</div>
                                <p className={`text-xs ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                                    {remaining >= 0
                                        ? `${formatCurrencyTHB(remaining)} remaining`
                                        : `Over by ${formatCurrencyTHB(Math.abs(remaining))}`}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
        </>
    );
}