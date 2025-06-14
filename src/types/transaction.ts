export type transactionType = 'INCOME' | 'EXPENSE';

export type categoryType = 'WANTS' | 'NEEDS' | 'SAVINGS';

export interface Transaction {
    id: string;
    userId: string;
    monthId: string;
    title: string;
    amount: number;
    type: transactionType;
    category: categoryType;
    date: string;
    createdAt: string;
}