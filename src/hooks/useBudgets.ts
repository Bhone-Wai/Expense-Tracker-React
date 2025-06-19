import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useBudgetApi} from "@/features/budgets/api.ts";

export default function useBudgets(month?: number, year?: number) {
    const queryClient = useQueryClient();
    const { fetchBudgetByMonth, fetchBudgetVsActual, setMonthlyBudget } = useBudgetApi();

    const currentDate = new Date();
    const currentMonth = month || currentDate.getMonth() + 1;
    const currentYear = year || currentDate.getFullYear();

    const budgetsQuery = useQuery({
        queryKey: ['budgets', 'month', currentMonth, currentYear],
        queryFn: () => fetchBudgetByMonth(currentMonth, currentYear)
    });

    const budgetVsActualQuery = useQuery({
        queryKey: ['budgets', 'vs-actual', currentMonth, currentYear],
        queryFn: () => fetchBudgetVsActual(currentMonth, currentYear),
    });

    const setBudgetsMutation = useMutation({
        mutationFn: (budgets: { category: string, amount: number }[]) =>
            setMonthlyBudget(budgets, currentMonth, currentYear),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets', 'month', currentMonth, currentYear] })
        }
    })

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