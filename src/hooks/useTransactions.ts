import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useTransactionApi} from "@/features/transactions/api.ts";

export default function useTransactions() {
    const queryClient = useQueryClient();
    const { fetchTransactions, createTransaction, deleteTransaction } = useTransactionApi();

    const transactionsQuery = useQuery({
        queryKey: ['transactions'],
        queryFn: fetchTransactions,
    });

    const create = useMutation({
        mutationFn: createTransaction,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
    });

    const remove = useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transactions'] }),
    });

    return {
        ...transactionsQuery,
        createTransaction: create.mutate,
        deleteTransaction: remove.mutate,
    }
}