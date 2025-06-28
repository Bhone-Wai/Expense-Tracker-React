import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {getDefaultBudget} from "@/lib/utils.ts";
import useBudgetQuery from "@/hooks/queries/useBudgetQuery.ts";
import type {BudgetVsActual} from "@/types/budget.ts";
import BudgetCard from "@/components/budget_overview/BudgetCard.tsx";
import {BudgetCardSkeleton} from "@/components/common/SkeletonLoader.tsx";
import MonthlyGoalProgress from "@/components/budget_overview/MonthlyGoalProgress.tsx";
import BudgetVsActualSpending from "@/components/budget_overview/BudgetVsActualSpending.tsx";

interface BudgetOverviewProps {
    month?: number;
    year?: number;
}

export default function BudgetOverview({ month, year }: BudgetOverviewProps) {
    const { budgets, isLoadingBudget, budgetVsActual } = useBudgetQuery(month, year);

    const categoryBudget = budgetVsActual?.length ? budgetVsActual : getDefaultBudget();

    if (isLoadingBudget) {
        const budgetTitles = ["Need Budget", "Want Budget", "Save Budget"];

        return (
            <TabsWrapper>
                <TabsContent value="budget" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Budget Card */}
                        <BudgetCardSkeleton title="Total Budget" lines={1} />

                        {/* Category Budgets */}
                        {budgetTitles.map((title, i) => (
                            <BudgetCardSkeleton key={i} title={title} lines={1} />
                        ))}
                    </div>
                </TabsContent>
            </TabsWrapper>
        );
    }

    return (
        <TabsWrapper>
            <TabsContent value="budget" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <BudgetCard type="total" totalBudget={budgets?.totalBudget ?? 0} />

                    {categoryBudget.map((budget: BudgetVsActual) => (
                        <BudgetCard budget={budget} type={'category'} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BudgetVsActualSpending budgetVsActual={budgetVsActual} isLoading={isLoadingBudget} />

                    <MonthlyGoalProgress budget={categoryBudget} currentBudget={budgets} />
                </div>
            </TabsContent>
        </TabsWrapper>
    );
}