import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {getDefaultBudget} from "@/lib/utils.ts";
import useBudgetQuery from "@/hooks/queries/useBudgetQuery.ts";
import type {BudgetVsActual} from "@/types/budget.ts";
import BudgetCard, {TotalBudgetCard} from "@/components/budget-overview/BudgetCard.tsx";
import MonthlyGoalProgress from "@/components/budget-overview/MonthlyGoalProgress.tsx";
import BudgetVsActualSpending from "@/components/budget-overview/BudgetVsActualSpending.tsx";
import {useMemo} from "react";

interface BudgetOverviewProps {
    month?: number;
    year?: number;
}

export default function BudgetOverview({ month, year }: BudgetOverviewProps) {
    const { budgets, isLoadingBudget, budgetVsActual } = useBudgetQuery(month, year);

    const categoryBudget = useMemo(() => 
        budgetVsActual?.length ? budgetVsActual : getDefaultBudget(), 
    [budgetVsActual]);

    return (
        <TabsWrapper>
            <TabsContent value="budget" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <TotalBudgetCard totalBudget={budgets?.totalBudget} isLoading={isLoadingBudget} />

                    {categoryBudget.map((budget: BudgetVsActual) => (
                        <BudgetCard key={budget.category} budget={budget} isLoading={isLoadingBudget} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BudgetVsActualSpending budgetVsActual={budgetVsActual} isLoading={isLoadingBudget} />

                    <MonthlyGoalProgress budgetVsActual={categoryBudget} totalBudget={budgets?.totalBudget} isLoading={isLoadingBudget} />
                </div>
            </TabsContent>
        </TabsWrapper>
    );
}