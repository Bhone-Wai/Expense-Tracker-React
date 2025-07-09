import {useAuth} from "@clerk/clerk-react";
import type { Transaction } from "@/types/transaction.ts";
import api from "@/lib/api.ts";

export const useTransactionApi = () => {
    const { getToken } = useAuth();
    const getAuthHeaders = async () => ({
        Authorization: `Bearer ${await getToken()}`
    });

    const fetchTransactions = async (limit?: number): Promise<Transaction[]> => {
        const params = limit ? { limit } : {};
        const res = await api.get('/transactions', {
            headers: await getAuthHeaders(),
            params
        });
        return res.data.data;
    }

    const fetchRecentTransactions = async (): Promise<Transaction[]> => {
        return fetchTransactions(5);
    }

    const fetchTransactionsByMonth = async (month: number, year: number)  => {
        const res = await api.get(`/transactions/by-month?month=${month}&year=${year}`, {
            headers: await getAuthHeaders(),
        });
        return res.data.data;
    }

    const createTransaction = async (data: Partial<Transaction>) => {
        const res = await api.post('/transactions', data, {
            headers: await getAuthHeaders(),
        });

        return res.data;
    }

    const deleteTransaction = async (id: string) => {
        const res = await api.delete(`/transactions/${id}`, {
            headers: await getAuthHeaders(),
        });
        return res.data;
    }

    return {
        fetchTransactions,
        fetchRecentTransactions,
        fetchTransactionsByMonth,
        createTransaction,
        deleteTransaction,
    }
}