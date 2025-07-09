export interface MonthlyFinancialData {
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    totalTransactions: number;
    month: number;
    year: number;
    status: 'active' | 'completed';
    isCurrentMonth: boolean;
}