import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTransactionApi} from "@/hooks/api/useTransactionApi.ts";
import {useMemo} from "react";

export default function useTransactionQuery(month?: number, year?: number) {
    const queryClient = useQueryClient();
    const { fetchTransactions, fetchRecentTransactions, fetchTransactionsByMonth, createTransaction, deleteTransaction } = useTransactionApi();

    const currentDate = useMemo(() => new Date(), []);
    const currentMonth = month ?? currentDate.getMonth() + 1;
    const currentYear = year ?? currentDate.getFullYear();

    const transactionsQuery = useQuery({
        queryKey: ['transactions'],
        queryFn: () => fetchTransactions(),
    });

    const recentTransactionsQuery = useQuery({
        queryKey: ['transactions', 'recent'],
        queryFn: fetchRecentTransactions,
        staleTime: 5 * 60 * 1000,
    });

    const monthlyTransactionsQuery = useQuery({
        queryKey: ['transactions', 'month', currentMonth, currentYear],
        queryFn: () => fetchTransactionsByMonth(currentMonth, currentYear),
        staleTime: 5 * 60 * 1000,
    });

    // Invalidation Logic
    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        queryClient.invalidateQueries({ queryKey: ['transactions', 'recent'] });
        queryClient.invalidateQueries({ queryKey: ['transactions', 'month', currentMonth, currentYear] });
        queryClient.invalidateQueries({ queryKey: ['budgets'] });
    }

    const create = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => invalidateAll()
    });

    const remove = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => invalidateAll()
    });

    return {
        // All transactions
        transactions: transactionsQuery.data,
        isLoading: transactionsQuery.isLoading,

        // Recent transactions
        recentTransactions: recentTransactionsQuery.data,
        isLoadingRecent: recentTransactionsQuery.isLoading,

        // Monthly transactions
        monthlyData: monthlyTransactionsQuery.data,
        monthlyTransactions: monthlyTransactionsQuery.data?.transactions,
        monthlySummary: monthlyTransactionsQuery.data?.summary,
        isLoadingMonthly: monthlyTransactionsQuery.isLoading,

        // Mutations
        createTransaction: create.mutate,
        deleteTransaction: remove.mutate,
        isCreating: create.isPending,
        isDeleting: remove.isPending,
    }
}