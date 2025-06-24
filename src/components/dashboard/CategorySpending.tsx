import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import useBudgetQuery from "@/hooks/queries/useBudgetQuery.ts";
import {getDefaultBudget} from "@/lib/utils.ts";
import {SummarySkeletonCard} from "@/components/common/SkeletonLoader.tsx";
import CategorySpendingItem from "@/category/CategorySpendingItem.tsx";
import type {BudgetVsActual} from "@/types/budget.ts";

interface CategorySpendingProps {
    month?: number;
    year?: number;
}

export default function CategorySpending({ month, year }: CategorySpendingProps) {
    const { budgetVsActual, isLoadingBudgetVsActual } = useBudgetQuery(month, year);

    if (isLoadingBudgetVsActual) {
        return <SummarySkeletonCard title={'Category Spending'} />
    }

    const data = budgetVsActual?.length ? budgetVsActual : getDefaultBudget();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Category Spending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map((budget: BudgetVsActual) => (
                    <CategorySpendingItem key={budget.category} budget={budget} />
                ))}
            </CardContent>
        </Card>
    );
}