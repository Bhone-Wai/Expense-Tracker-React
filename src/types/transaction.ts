export type transactionType = 'INCOME' | 'EXPENSE';

export type incomeCategory = 'SALARY' | 'FREELANCE' | 'BONUS' | 'INVESTMENT';

export type expenseCategory = 'WANTS' | 'NEEDS' | 'SAVINGS';

export interface Transaction {
    id: string;
    userId: string;
    monthId: string;
    title: string;
    amount: number;
    type: transactionType;
    incomeCategory?: incomeCategory;
    expenseCategory?: expenseCategory;
    date: string;
    createdAt: string;
}
