import type {BudgetVsActual} from "@/types/budget.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import SpendingItem from "@/components/common/SpendingItem.tsx";
import {SummarySkeletonCard} from "@/components/common/SkeletonLoader.tsx";
import useCategorySpendingData from "@/hooks/transformed/useCategorySpendingData.ts";

interface BudgetVsActualSpendingProps {
    budgetVsActual: BudgetVsActual[];
    isLoading: boolean;
}

export default function BudgetVsActualSpending({budgetVsActual, isLoading}: BudgetVsActualSpendingProps) {
    const categorySpendingData = useCategorySpendingData(budgetVsActual);

    if (isLoading) {
        return <SummarySkeletonCard title={'Budget vs Actual Spending'} />
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'text-2xl'}>Budget vs Actual Spending</CardTitle>
            </CardHeader>
            <CardContent className={'space-y-6'}>
                {categorySpendingData.map((item) => (
                    <SpendingItem
                        key={item.category}
                        data={{
                            title: item.label,
                            icon: item.icon && <item.icon className={'h-5 w-5'} />,
                            actual: item.actual,
                            budget: item.budgeted,
                            percent: item.percentUsed,
                            progress: item.progress,
                            isOverBudget: item.isOverBudget
                        }}
                    />
                ))}
            </CardContent>
        </Card>
    );
}