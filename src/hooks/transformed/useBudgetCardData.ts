import * as React from "react";
import type {BudgetVsActual} from "@/types/budget.ts";
import {useMemo} from "react";
import {formatCurrencyTHB, getCategoryMeta} from "@/lib/utils.ts";

interface BudgetCardDataProps {
    type: 'total' | 'category';
    title: string;
    amount: string;
    icon?: React.ComponentType<{ className?: string }>;
    remainingText?: string;
    remainingStyle?: string;
}

// All HIGH-level operations
export default function useBudgetCardData(
    type: 'total' | 'category',
    totalBudget?: number,
    budget?: BudgetVsActual

): BudgetCardDataProps {
    return useMemo(() => {
        return type === 'total' ? transformTotalBudgetData(totalBudget ?? 0) : transformCategoryBudgetData(budget);
    }, [type, totalBudget, budget]);
}

// Supporting functions at consistent abstraction levels
function transformTotalBudgetData(totalBudget: number): BudgetCardDataProps {
    return {
        type: "total",
        title: 'Total Budget',
        amount: formatCurrencyTHB(totalBudget),
    }
}

function transformCategoryBudgetData(budget: BudgetVsActual): BudgetCardDataProps {
    const categoryInfo = getCategoryMeta('EXPENSE', budget.category);

    return {
        type: 'category',
        title: formatCategoryTitle(categoryInfo?.label),
        amount: formatCurrencyTHB(budget.budgeted),
        icon: categoryInfo?.icon,
        isRemaining: calculateRemainingBudget(budget),
        remainingText: formatRemainingText(budget.remaining),
        remainingStyle: formatRemainingStyle(budget.remaining),
    }
}

// Low-level helper functions
function formatCategoryTitle(label: string) {
    return label.toUpperCase() + 'Budget';
}

function calculateRemainingBudget(budget: BudgetVsActual) {
    return budget?.remaining > 0;
}

function formatRemainingText(remaining: number): string {
    return remaining >= 0
        ? `${formatCurrencyTHB(remaining)} remaining`
        : `Over by ${formatCurrencyTHB(Math.abs(remaining))}`;
}

function formatRemainingStyle(remaining: number): string {
    const baseStyle = "text-xs";
    const colorStyle = remaining >= 0 ? "text-green-600" : "text-red-600";
    return `${baseStyle} ${colorStyle}`;
}