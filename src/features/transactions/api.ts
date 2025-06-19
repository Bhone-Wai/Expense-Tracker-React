import {useAuth} from "@clerk/clerk-react";
import type { Transaction } from "@/types/transaction.ts";
import api from "@/lib/api.ts";

export const useTransactionApi = () => {
    const { getToken } = useAuth();

    const fetchTransactions = async (limit?: number): Promise<Transaction[]> => {
        const token = await getToken();
        const params = limit ? { limit } : {};
        const res = await api.get('/transactions', {
            headers: { Authorization: `Bearer ${token}` },
            params
        });
        return res.data.data;
    }

    const fetchRecentTransaction = async (): Promise<Transaction[]> => {
        return fetchTransactions(5);
    }

    const fetchTransactionsByMonth = async (month: number, year: number)  => {
        const token = await getToken();
        const res = await api.get(`/transactions/by-month?month=${month}&year=${year}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    }

    const createTransaction = async (data: Partial<Transaction>) => {
        const token = await getToken();
        const res = await api.post('/transactions', data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    const deleteTransaction = async (id: string) => {
        const token = await getToken();
        const res = await api.delete(`/transactions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }

    return {
        fetchTransactions,
        fetchTransactionsByMonth,
        fetchRecentTransaction,
        createTransaction,
        deleteTransaction,
    }
}