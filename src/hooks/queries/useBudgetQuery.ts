import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useBudgetApi} from "@/hooks/api/useBudgetApi.ts";
import {toast} from "sonner";
import {useAuth} from "@clerk/clerk-react";

export default function useBudgetQuery(month?: number, year?: number) {
    const queryClient = useQueryClient();
    const { fetchBudgetByMonth, fetchBudgetVsActual, setMonthlyBudget } = useBudgetApi();
    const { userId } = useAuth();

    const currentDate = new Date();
    const currentMonth = month || currentDate.getMonth() + 1;
    const currentYear = year || currentDate.getFullYear();

    const budgetsQuery = useQuery({
        queryKey: ['budgets', 'month', currentMonth, currentYear, userId],
        queryFn: () => fetchBudgetByMonth(currentMonth, currentYear),
        enabled: !!userId,
    });

    const budgetVsActualQuery = useQuery({
        queryKey: ['budgets', 'budget_overview-vs-actual', currentMonth, currentYear, userId],
        queryFn: () => fetchBudgetVsActual(currentMonth, currentYear),
        enabled: !!userId,
    });

    const setBudgetsMutation = useMutation({
        mutationFn: (budgets: { category: string, amount: number }[]) =>
            setMonthlyBudget(budgets, currentMonth, currentYear),
        onSuccess: (_data) => {
            queryClient.invalidateQueries({
                queryKey: ['budgets', 'month', currentMonth, currentYear, userId]
            })

            queryClient.invalidateQueries({
                queryKey: ['budgets', 'budget_overview-vs-actual', currentMonth, currentYear, userId]
            });
            toast.success("Budget set successfully!");
        },
        onError: (error) => {
            toast.error(`Failed to set budget: ${error.message}`);
        }
    });

    return {
        // Budget Monthly
        budgets: budgetsQuery.data,
        isLoadingBudget: budgetsQuery.isLoading,

        // Budget Vs Actual
        budgetVsActual: budgetVsActualQuery.data,
        isLoadingBudgetVsActual: budgetVsActualQuery.isLoading,

        // Budget Setting
        setBudgets: setBudgetsMutation.mutate,
        isSettingBudgets: setBudgetsMutation.isPending,
        setBudgetError: setBudgetsMutation.error,
        setBudgetSuccess: setBudgetsMutation.isSuccess,
    }
}