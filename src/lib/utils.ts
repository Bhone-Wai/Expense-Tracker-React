import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {type ExpenseCategory, type IncomeCategory, TRANSACTION_TYPES, type TransactionType} from "@/types/enums.ts";
import type {Transaction} from "@/types/transaction.ts";
import {expenseCategoryMeta, incomeCategoryMeta} from "@/constants/categoryMeta.ts";
import {format, isToday, isYesterday, parseISO, setHours, setMinutes, setSeconds, setMilliseconds} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency Helpers
export function formatCurrencyTHB(amount: number | string | undefined | null): string {
  const parsed = typeof amount === 'string' ? parseFloat(amount) : amount;
  const validAmount = parsed == null || isNaN(parsed) ? 0 : parsed;

  return `฿${validAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}


// Type validation Helpers
export const isValidTransactionType = (type: string): type is TransactionType =>
  TRANSACTION_TYPES.includes(type as TransactionType);


// Date Helpers
export const mergeDateWithCurrentTime = (dateString: string) => {
  const now = new Date();
  let date = parseISO(dateString);
  date = setHours(date, now.getHours());
  date = setMinutes(date, now.getMinutes());
  date = setSeconds(date, now.getSeconds());
  date = setMilliseconds(date, now.getMilliseconds());
  return date;
}

export const formatTransactionDate = (dateString: string): string => {
  const date = parseISO(dateString);

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  return format(date, 'MMM d, yyyy');
}

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped = transactions.reduce((acc: Record<string, Transaction[]>, tx) => {
    const key = format(typeof tx.date === 'string' ? parseISO(tx.date) : tx.date, 'yyyy-MM-dd'); // Use a consistent format for the key
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});

  return Object.entries(grouped)
      .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([date, transactions]) => ({
        date,
        transactions: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }));
}

// Budget Helpers
export const getDefaultBudget = () => {
  return expenseCategoryMeta.map(category => ({
    category: category.value,
    budgeted: 0,
    actual: 0,
    remaining: 0,
    percentUsed: 0,
  }));
}

// Category Helpers
const incomeMap = Object.fromEntries(incomeCategoryMeta.map(category => [category.value, category]));
const expenseMap = Object.fromEntries(expenseCategoryMeta.map(category => [category.value, category]));

export const getCategoryMeta = (type: TransactionType, value?: IncomeCategory | ExpenseCategory) => {
  if (!value) return undefined;
  return type === 'INCOME' ? incomeMap[value] : expenseMap[value];
}