import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTransactionApi} from "@/hooks/api/useTransactionApi.ts";
import {toast} from "sonner";
import {useAuth} from "@clerk/clerk-react";

export default function useTransactionQuery(month?: number, year?: number) {
    const queryClient = useQueryClient();
    const { fetchTransactions, fetchRecentTransactions, fetchTransactionsByMonth, createTransaction, deleteTransaction } = useTransactionApi();
    const { userId } = useAuth();

    const currentDate = new Date();
    const currentMonth = month ?? currentDate.getMonth() + 1;
    const currentYear = year ?? currentDate.getFullYear();

    const transactionsQuery = useQuery({
        queryKey: ['transactions', userId],
        queryFn: () => fetchTransactions(),
        enabled: !!userId, // Only fetch if userId is available
    });

    const recentTransactionsQuery = useQuery({
        queryKey: ['transactions', 'recent', userId],
        queryFn: fetchRecentTransactions,
        staleTime: 5 * 60 * 1000,
        enabled: !!userId,
    });

    const monthlyTransactionsQuery = useQuery({
        queryKey: ['transactions', 'month', currentMonth, currentYear, userId],
        queryFn: () => fetchTransactionsByMonth(currentMonth, currentYear),
        staleTime: 5 * 60 * 1000,
        enabled: !!userId,
    });

    // Invalidation Logic
    const invalidateAll = () => {
        queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
        queryClient.invalidateQueries({ queryKey: ['transactions', 'recent', userId] });
        queryClient.invalidateQueries({ queryKey: ['transactions', 'month', currentMonth, currentYear, userId] });
        queryClient.invalidateQueries({ queryKey: ['budgets', userId] }); // Invalidate budget queries as well
    }

    const create = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => {
            invalidateAll();
            toast.success("Transaction created successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to create transaction: ${error.message}`);
        }
    });

    const remove = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            invalidateAll();
            toast.success("Transaction deleted successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to delete transaction: ${error.message}`);
        }
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