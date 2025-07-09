import type {BudgetVsActual} from "@/types/budget.ts";
import {getCategoryMeta, getDefaultBudget} from "@/lib/utils.ts";
import {useMemo} from "react";

// All HIGH-level operations
export default function useCategorySpendingData(budgetVsActual: BudgetVsActual[]) {
    return useMemo(() => {
        const validatedData = getValidBudgetData(budgetVsActual);
        return transformBudgetItems(validatedData);
    }, [budgetVsActual]);
}

// Supporting functions at consistent abstraction levels
function getValidBudgetData(budgetVsActual: BudgetVsActual[]) {
    return budgetVsActual?.length ? budgetVsActual : getDefaultBudget();
}

function transformBudgetItems(budgetData: BudgetVsActual[]) {
    return budgetData.map(transformSingleBudgetItem);
}

function transformSingleBudgetItem(budget: BudgetVsActual) {
    const categoryInfo = getCategoryMeta('EXPENSE', budget.category);

    return {
        ...budget,
        categoryInfo,
        icon: categoryInfo?.icon,
        label: formatCategoryLabel(categoryInfo?.label),
        isOverBudget: calculateOverBudgetStatus(budget),
        progress: calculateProgress(budget.percentUsed),
    }
}

// Low-level helper functions
function formatCategoryLabel(label?: string) {
    return label?.toUpperCase();
}

function calculateOverBudgetStatus(budget: BudgetVsActual) {
    return budget.actual > budget.budgeted && budget.budgeted > 0;
}

function calculateProgress(percentUsed: number) {
    return Math.min(percentUsed, 100);
}