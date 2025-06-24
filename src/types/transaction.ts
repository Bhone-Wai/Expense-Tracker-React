import type {ExpenseCategory, IncomeCategory, TransactionType} from "@/types/enums.ts";

export interface Transaction {
    id: string;
    userId: string;
    title: string;
    amount: number;
    type: TransactionType;
    incomeCategory?: IncomeCategory;
    expenseCategory?: ExpenseCategory;
    date: Date | string;
    createdAt: Date | string;
}