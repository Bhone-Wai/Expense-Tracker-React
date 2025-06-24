import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {formatCurrencyTHB} from "@/lib/utils.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Target} from "lucide-react";
import useBudgetQuery from "@/hooks/queries/useBudgetQuery.ts";
import BudgetCards from "@/components/budget/BudgetCards.tsx";

interface BudgetOverviewProps {
    month?: number;
    year?: number;
}

export default function BudgetOverview({ month, year }: BudgetOverviewProps) {
    const { budgets, isLoadingBudget, budgetVsActual } = useBudgetQuery(month, year);

    const budget = budgets || {
        totalBudget: 0
    }

    const stats = {
        categoryTotals: budgetVsActual?.categoryTotals || {}
    };

    return (
        <TabsWrapper>
            <TabsContent value="budget" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Budget</CardTitle>
                            <Target className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{formatCurrencyTHB(budget.totalBudget)}</div>
                        </CardContent>
                    </Card>
                    
                    {/*<BudgetCards currentBudget={budget} stats={stats} />*/}
                </div>
            </TabsContent>
        </TabsWrapper>
    );
}

/*
<TabsContent value="budget" className="space-y-6">
    {/!* Budget Overview for Current Month *!/}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Budget</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(currentBudget.totalBudget)}</div>
            </CardContent>
        </Card>

        {Object.entries(currentBudget)
            .filter(([key]) => key !== "totalBudget")
            .map(([category, amount]) => {
                const CategoryIcon = categoryIcons[category as ExpenseCategory]
                const spent = stats.categoryTotals[category as keyof typeof stats.categoryTotals]
                const remaining = amount - spent

                return (
                    <Card key={category}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">{category} Budget</CardTitle>
                            <CategoryIcon className="h-4 w-4 text-gray-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(amount)}</div>
                            <p className={`text-xs ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {remaining >= 0
                                    ? `${formatCurrency(remaining)} remaining`
                                    : `Over by ${formatCurrency(Math.abs(remaining))}`}
                            </p>
                        </CardContent>
                    </Card>
                )
            })}
    </div>

    {/!* Detailed Budget Analysis *!/}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Budget vs Actual Spending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {Object.entries(currentBudget)
                    .filter(([key]) => key !== "totalBudget")
                    .map(([category, budgetAmount]) => {
                        const CategoryIcon = categoryIcons[category as ExpenseCategory]
                        const actualAmount = stats.categoryTotals[category as keyof typeof stats.categoryTotals]
                        const progress = budgetAmount > 0 ? (actualAmount / budgetAmount) * 100 : 0

                        return (
                            <div key={category} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CategoryIcon className="h-5 w-5 text-gray-600" />
                                        <span className="font-medium">{category}</span>
                                    </div>
                                    <Badge className={categoryColors[category as ExpenseCategory]} variant="outline">
                                        {Math.round(progress)}%
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Spent: {formatCurrency(actualAmount)}</span>
                                        <span>Budget: {formatCurrency(budgetAmount)}</span>
                                    </div>
                                    <Progress value={Math.min(progress, 100)} className="h-3" />
                                    {progress > 100 && (
                                        <p className="text-sm text-red-600 font-medium">
                                            ⚠️ Over budget by {formatCurrency(actualAmount - budgetAmount)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Monthly Goal Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{formatCurrency(stats.expenses)}</div>
                    <p className="text-sm text-gray-600">Total Spent This Month</p>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Monthly Budget</span>
                        <span>{formatCurrency(currentBudget.totalBudget)}</span>
                    </div>
                    <Progress
                        value={currentBudget.totalBudget > 0 ? (stats.expenses / currentBudget.totalBudget) * 100 : 0}
                        className="h-4"
                    />
                    <div className="text-center text-sm text-gray-600">
                        {stats.expenses > currentBudget.totalBudget
                            ? `Over budget by ${formatCurrency(stats.expenses - currentBudget.totalBudget)}`
                            : `${formatCurrency(currentBudget.totalBudget - stats.expenses)} remaining`}
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <h4 className="font-medium">Budget Recommendations</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                        {stats.expenses > currentBudget.totalBudget ? (
                            <p className="text-red-600">• Consider reducing spending in overspent categories</p>
                        ) : (
                            <p className="text-green-600">• You're on track with your budget goals!</p>
                        )}
                        {stats.categoryTotals.WANT > currentBudget.WANT && (
                            <p className="text-orange-600">• Want category is over budget</p>
                        )}
                        {stats.categoryTotals.SAVE < currentBudget.SAVE && (
                            <p className="text-blue-600">• Consider increasing your savings</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</TabsContent>*/