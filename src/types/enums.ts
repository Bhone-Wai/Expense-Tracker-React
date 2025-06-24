export const TRANSACTION_TYPES = ['INCOME', 'EXPENSE'] as const;
export type TransactionType = typeof TRANSACTION_TYPES[number];

export const INCOME_CATEGORIES = ['SALARY', 'FREELANCE', 'BONUS', 'INVESTMENT'] as const;
export type IncomeCategory = typeof INCOME_CATEGORIES[number];

export const EXPENSE_CATEGORIES = ['NEEDS', 'WANTS', 'SAVINGS'] as const;
export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];