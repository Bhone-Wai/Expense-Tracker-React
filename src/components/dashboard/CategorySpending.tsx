import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import useBudgetQuery from "@/hooks/queries/useBudgetQuery.ts";
import {SummarySkeletonCard} from "@/components/common/SkeletonLoader.tsx";
import SpendingItem from "@/components/common/SpendingItem.tsx";
import useCategorySpendingData from "@/hooks/transformed/useCategorySpendingData.ts";

interface CategorySpendingProps {
    month?: number;
    year?: number;
}

export default function CategorySpending({ month, year }: CategorySpendingProps) {
    const { budgetVsActual, isLoadingBudgetVsActual } = useBudgetQuery(month, year);
    const categorySpendingData = useCategorySpendingData(budgetVsActual);

    if (isLoadingBudgetVsActual) {
        return <SummarySkeletonCard title={'Category Spending'} />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Category Spending</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {categorySpendingData.map((item) => (
                    <SpendingItem
                        key={item.category}
                        data={{
                            title: item.label ?? '',
                            icon: item.icon && <item.icon className="h-4 w-4" />,
                            actual: item.actual,
                            budget: item.budgeted,
                            percent: item.percentUsed,
                            progress: item.progress,
                            isOverBudget: item.isOverBudget
                        }}
                        variant={'compact'}
                    />
                ))}
            </CardContent>
        </Card>
    );
}