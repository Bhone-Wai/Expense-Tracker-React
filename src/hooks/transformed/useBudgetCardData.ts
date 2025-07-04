import type {BudgetVsActual} from "@/types/budget.ts";
import {useMemo} from "react";
import {formatCurrencyTHB, getCategoryMeta} from "@/lib/utils.ts";

export function useTotalBudgetCardData(totalBudget: number) {
    return useMemo(() => ({
        title: 'Total',
        amount: formatCurrencyTHB(totalBudget),
    }), [totalBudget]);
}

export function useCategoryBudgetCardData(budget: BudgetVsActual) {
    return useMemo(() => {
        const categoryInfo = getCategoryMeta('EXPENSE', budget.category);

        return {
            title: formatBudgetLabel(categoryInfo?.label),
            amount: formatCurrencyTHB(budget.budgeted),
            icon: categoryInfo?.icon,
            remainingText: formatRemainingText(budget.remaining),
            remainingStyle: formatRemainingStyle(budget.remaining),
        }
    }, [budget]);
}

function formatBudgetLabel(label?: string) {
    return label?.toUpperCase() ?? '';
}

function formatRemainingText(remaining: number):string {
    return remaining >= 0
        ? `${formatCurrencyTHB(remaining)} remaining`
        : `Over by ${formatCurrencyTHB(Math.abs(remaining))}`;
}

function formatRemainingStyle(remaining: number): string {
    return `text-xs ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`;
}