// import type { incomeCategory, expenseCategory } from "@/types/transaction.ts";
import {Briefcase, DollarSign, Gift, Home, LineChart, PiggyBank, ShoppingCart} from "lucide-react";

export const incomeCategories = [
    { value: 'SALARY' as const, label: 'Salary', icon: Briefcase },
    { value: 'FREELANCE' as const, label: 'Freelance', icon: DollarSign },
    { value: 'BONUS' as const, label: 'Bonus', icon: Gift },
    { value: 'INVESTMENT' as const, label: 'Investment', icon: LineChart },
];

export const expenseCategories = [
    { value: 'NEEDS' as const, label: 'Need', icon: Home },
    { value: 'WANTS' as const, label: 'Want', icon: ShoppingCart },
    { value: 'SAVINGS' as const, label: 'Save', icon: PiggyBank },
];