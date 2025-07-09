import type {ExpenseCategory} from "@/types/enums.ts";

export interface Budget {
    id: string;
    userId: string;
    category: ExpenseCategory;
    month: number;
    year: number;
    budgetAmount: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface BudgetVsActual {
    category: ExpenseCategory;
    budgeted: number;
    actual: number;
    remaining: number;
    percentUsed: number;
}

export interface BudgetInput {
    category: ExpenseCategory;
    amount: number;
}