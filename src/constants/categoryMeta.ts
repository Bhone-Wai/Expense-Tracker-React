import {Briefcase, DollarSign, Gift, Home, LineChart, PiggyBank, ShoppingCart} from "lucide-react";
import * as React from "react";
import type {ExpenseCategory, IncomeCategory, TransactionType} from "@/types/enums.ts";

interface categoryMeta<T extends string> {
    value: T;
    label: string;
    icon: React.ElementType<{ className?: string }>;
    style: string;
    type: TransactionType;
}

export const incomeCategoryMeta: categoryMeta<IncomeCategory>[] = [
    {
        value: 'SALARY',
        label: 'Salary',
        icon: Briefcase,
        style: 'border-green-200 text-green-700 bg-green-50',
        type: 'INCOME',
    },
    {
        value: 'FREELANCE',
        label: 'Freelance',
        icon: DollarSign,
        style: 'border-green-200 text-green-700 bg-green-50',
        type: 'INCOME',
    },
    {
        value: 'BONUS',
        label: 'Bonus',
        icon: Gift,
        style: 'border-green-200 text-green-700 bg-green-50',
        type: 'INCOME',
    },
    {
        value: 'INVESTMENT',
        label: 'Investment',
        icon: LineChart,
        style: 'border-green-200 text-green-700 bg-green-50',
        type: 'INCOME',
    },
];

export const expenseCategoryMeta: categoryMeta<ExpenseCategory>[] = [
    {
        value: 'NEEDS',
        label: 'Need',
        icon: Home,
        style: 'border-blue-200 text-blue-700 bg-blue-50',
        type: 'EXPENSE',
    },
    {
        value: 'WANTS',
        label: 'Want',
        icon: ShoppingCart,
        style: 'border-purple-200 text-purple-700 bg-purple-50',
        type: 'EXPENSE',
    },
    {
        value: 'SAVINGS',
        label: 'Save',
        icon: PiggyBank,
        style: 'border-green-200 text-green-700 bg-green-50',
        type: 'EXPENSE',
    },
];