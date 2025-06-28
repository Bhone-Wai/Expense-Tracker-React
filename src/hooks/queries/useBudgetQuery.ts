import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useBudgetApi} from "@/hooks/api/useBudgetApi.ts";

export default function useBudgetQuery(month?: number, year?: number) {
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
        queryKey: ['budgets', 'budget_overview-vs-actual', currentMonth, currentYear],
        queryFn: () => fetchBudgetVsActual(currentMonth, currentYear),
    });

    const setBudgetsMutation = useMutation({
        mutationFn: (budgets: { category: string, amount: number }[]) =>
            setMonthlyBudget(budgets, currentMonth, currentYear),
        onSuccess: (data) => {
            console.log('Mutation success, data:', data);
            console.log('Current month/year:', currentMonth, currentYear);
            console.log('Invalidating queries');

            queryClient.invalidateQueries({
                queryKey: ['budgets', 'month', currentMonth, currentYear]
            })

            queryClient.invalidateQueries({
                queryKey: ['budgets', 'budget_overview-vs-actual', currentMonth, currentYear]
            });
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