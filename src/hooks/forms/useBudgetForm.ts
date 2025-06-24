import useBudgetQuery from "@/hooks/queries/useBudgetQuery.ts";
import {useEffect, useMemo, useState} from "react";
import type {BudgetInput} from "@/types/budget.ts";

const INITIAL_BUDGETS = {
    NEEDS: 0,
    WANTS: 0,
    SAVINGS: 0,
};

export default function useBudgetForm(isOpen: boolean) {
    const { budgets, setBudgets, isSettingBudgets, setBudgetSuccess } = useBudgetQuery();

    const [budgetsState, setBudgetsState] = useState(INITIAL_BUDGETS);

    useEffect(() => {
        if (isOpen && budgets?.budgets) {
            const updatedBudgets = {...INITIAL_BUDGETS};
            for (const { category, budgetAmount } of budgets.budgets) {
                if (category in updatedBudgets) {
                    updatedBudgets[category as keyof typeof updatedBudgets] = parseFloat(budgetAmount || "0");
                }
            }
            setBudgetsState(updatedBudgets);
        }
    }, [isOpen, budgets]);

    const total = useMemo(
        () => Object.values(budgetsState).reduce((sum, value) => sum + value, 0),
        [budgetsState]
    );

    const handleChange = (category: keyof typeof budgetsState, amount: number) => {
        setBudgetsState(prev => ({
            ...prev,
            [category]: amount,
        }));
    };

    const handleSubmit = () => {
        const input: BudgetInput[] = Object.entries(budgetsState)
            .filter(([_, amount]) => amount > 0)
            .map(([category, amount]) => ({
                category: category as BudgetInput["category"],
                amount,
            }));

        setBudgets(input);
    };

    return {
        budgetsState,
        handleChange,
        total,
        handleSubmit,
        isSubmitting: isSettingBudgets,
        isSuccess: setBudgetSuccess,
    }
}