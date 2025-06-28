import {useTransactionApi} from "@/hooks/api/useTransactionApi.ts";
import {useBudgetApi} from "@/hooks/api/useBudgetApi.ts";
import {useQuery} from "@tanstack/react-query";

export default function useMonthlyHistory(month?: number, year?: number) {
    const { fetchTransactionsByMonth } = useTransactionApi();
    const { fetchBudgetByMonth } = useBudgetApi();

    const currentDate = new Date();
    const currentMonth = month || currentDate.getMonth() + 1;
    const currentYear = year || currentDate.getFullYear();

    const transactionsQuery = useQuery({
        queryKey: ['transactions', 'month', currentMonth, currentYear],
        queryFn: () => fetchTransactionsByMonth(currentMonth, currentYear),
    });

    const budgetsQuery = useQuery({
        queryKey: ['budgets', 'month', currentMonth, currentYear],
        queryFn: () => fetchBudgetByMonth(currentMonth, currentYear),
    });

    return {
        transactions: transactionsQuery.data,
        transactionsSummary: transactionsQuery.data?.summary,
        isLoadingTransaction: transactionsQuery.isLoading,

        budgets: budgetsQuery.data,
        isLoadingBudget: budgetsQuery.isLoading,

        isLoading: transactionsQuery.isLoading || budgetsQuery.isLoading,
    }
}