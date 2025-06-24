import type {BudgetVsActual} from "@/types/budget.ts";
import {formatCurrencyTHB, getCategoryMeta} from "@/lib/utils.ts";
import {Progress} from "@/components/ui/progress.tsx";

interface CategorySpendingItemProps {
    budget: BudgetVsActual;
}

export default function CategorySpendingItem({ budget }: CategorySpendingItemProps) {
    const categoryInfo = getCategoryMeta('EXPENSE', budget.category);
    const IconComponent = categoryInfo?.icon;
    const progress = Math.min(budget.percentUsed, 100);
    const isOverBudget = budget.actual > budget.budgeted && budget.budgeted > 0;

    return (
        <div className={'space-y-2'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-2'}>
                    {IconComponent && <IconComponent className={'h-4 w-4 text-gray-600'} />}
                    <span className={'text-sm font-semibold'}>{categoryInfo?.label.toUpperCase()}</span>
                </div>
                <span className={'text-sm font-semibold'}>{formatCurrencyTHB(budget.actual)}</span>
            </div>
            <div className={'space-y-1'}>
                <div className={'flex justify-between text-xs text-gray-500'}>
                    <span>Goal: {formatCurrencyTHB(budget.budgeted)}</span>
                    <span>{Math.round(budget.percentUsed)}%</span>
                </div>
                <Progress value={progress} className={'h-2'} />
                {isOverBudget && (
                    <p className={'text-xs text-red-600'}>
                        Over budget by {formatCurrencyTHB(budget.actual - budget.budgeted)}
                    </p>
                )}
            </div>
        </div>
    );
}