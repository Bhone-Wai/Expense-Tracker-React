import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTransactionApi} from "@/features/transactions/api.ts";

export default function useTransactions(month?: number, year?: number) {
    const queryClient = useQueryClient();
    const { fetchTransactions, fetchRecentTransaction, fetchTransactionsByMonth, createTransaction, deleteTransaction } = useTransactionApi();

    const currentDate = new Date();
    const currentMonth = month || currentDate.getMonth() + 1;
    const currentYear = year || currentDate.getFullYear();

    const transactionsQuery = useQuery({
        queryKey: ['transactions'],
        queryFn: () => fetchTransactions(),
    });

    const recentTransactionsQuery = useQuery({
        queryKey: ['transactions', 'recent'],
        queryFn: fetchRecentTransaction,
        staleTime: 5 * 60 * 1000,
    });

    const monthlyTransactionsQuery = useQuery({
        queryKey: ['transactions', 'month', currentMonth, currentYear],
        queryFn: () => fetchTransactionsByMonth(currentMonth, currentYear),
        staleTime: 5 * 60 * 1000,
    });

    const create = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transactions', 'recent'] });

            queryClient.invalidateQueries({
                queryKey: ['transactions', 'month', currentMonth, currentYear]
            });

            queryClient.invalidateQueries({
                queryKey: ['budgets']
            });
        },
    });

    const remove = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transactions', 'recent'] });

            queryClient.invalidateQueries({
                queryKey: ['transactions', 'month', currentMonth, currentYear]
            });

            queryClient.invalidateQueries({
                queryKey: ['budgets']
            });
        }
    });

    return {
        // All transactions
        transactions: transactionsQuery.data,
        isLoading: transactionsQuery.isLoading,
        isError: transactionsQuery.isError,
        error: transactionsQuery.error,

        // Recent transactions
        recentTransactions: recentTransactionsQuery.data,
        isLoadingRecent: recentTransactionsQuery.isLoading,
        isErrorRecent: recentTransactionsQuery.isError,
        errorRecent: recentTransactionsQuery.error,

        // Monthly transactions - ADD THESE
        monthlyData: monthlyTransactionsQuery.data,
        monthlyTransactions: monthlyTransactionsQuery.data?.transactions,
        monthlySummary: monthlyTransactionsQuery.data?.summary,
        isLoadingMonthly: monthlyTransactionsQuery.isLoading,
        isErrorMonthly: monthlyTransactionsQuery.isError,
        errorMonthly: monthlyTransactionsQuery.error,

        // Mutations
        createTransaction: create.mutate,
        deleteTransaction: remove.mutate,
        isCreating: create.isPending,
        isDeleting: remove.isPending,
    }
}