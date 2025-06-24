import {useAuth} from "@clerk/clerk-react";
import api from "@/lib/api.ts";

export const useBudgetApi = () => {
    const { getToken } = useAuth();
    const getAuthHeaders = async () => ({
        Authorization: `Bearer ${await getToken()}`
    });

    const fetchBudgetByMonth = async (month: number, year: number) => {
        const res = await api.get(`/budgets/monthly?month=${month}&year=${year}`, {
            headers: await getAuthHeaders(),
        });
        return res.data.data;
    }

    const fetchBudgetVsActual = async (month: number, year: number) => {
        const res = await api.get(`/budgets/monthly-compare?month=${month}&year=${year}`, {
            headers: await getAuthHeaders(),
        });
        return res.data.data;
    }

    const setMonthlyBudget = async (budgets: { category: string,  amount: number }[], month: number, year: number) => {
        const token = await getToken();
        const [res] = await Promise.all([
            api.post('/budgets/monthly-setup', {
                budgets,
                month,
                year,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }),
            new Promise(resolve => setTimeout(resolve, 1000))
        ])
        return res.data
    }

    return {
        fetchBudgetByMonth,
        fetchBudgetVsActual,
        setMonthlyBudget,
    }
}