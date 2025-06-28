import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";

export default function MonthlyHistory() {
    return (
        <TabsWrapper>
            Monthly History
        </TabsWrapper>
    );
}

/*
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {historicalData.map((monthData) => (
        <Card
            key={monthData.month}
            className={`relative overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
                monthData.month === selectedMonth ? "ring-2 ring-blue-500 bg-blue-50/50" : ""
            }`}
            onClick={() => setSelectedMonth(monthData.month)}
        >
            {/!* Status Indicator *!/}
            <div className="absolute top-4 right-4">
                {monthData.isOverBudget ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                )}
            </div>

            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{monthData.monthName}</CardTitle>
                    <Badge variant={monthData.isOverBudget ? "destructive" : "default"} className="text-xs">
                        {Math.round(monthData.budgetUtilization)}%
                    </Badge>
                </div>
                <p className="text-sm text-gray-600">{monthData.transactionCount} transactions</p>
            </CardHeader>

            <CardContent className="space-y-4">
                {/!* Financial Summary *!/}
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-green-700">Income</span>
                        </div>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(monthData.income)}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                            <span className="text-xs font-medium text-red-700">Expenses</span>
                        </div>
                        <p className="text-lg font-bold text-red-600">{formatCurrency(monthData.expenses)}</p>
                    </div>
                </div>

                {/!* Net Income *!/}
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Activity className="h-4 w-4 text-gray-600" />
                        <span className="text-xs font-medium text-gray-700">Net Income</span>
                    </div>
                    <p
                        className={`text-lg font-bold ${monthData.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                        {formatCurrency(monthData.netIncome)}
                    </p>
                </div>

                {/!* Budget Progress *!/}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Budget Usage</span>
                        <span className="font-medium">{formatCurrency(monthData.budget.totalBudget)}</span>
                    </div>
                    <Progress value={Math.min(monthData.budgetUtilization, 100)} className="h-2" />
                    {monthData.isOverBudget && (
                        <p className="text-xs text-red-600 font-medium">
                            Over by {formatCurrency(monthData.expenses - monthData.budget.totalBudget)}
                        </p>
                    )}
                </div>

                {/!* Category Mini Breakdown *!/}
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Top Categories</h4>
                    <div className="space-y-1">
                        {Object.entries(monthData.categoryTotals)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3)
                            .map(([category, amount]) => {
                                const CategoryIcon = categoryIcons[category as ExpenseCategory]
                                return (
                                    <div key={category} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <CategoryIcon className="h-3 w-3 text-gray-500" />
                                            <span className="text-gray-600">{category}</span>
                                        </div>
                                        <span className="font-medium">{formatCurrency(amount)}</span>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </CardContent>
        </Card>
    ))}
</div>*/


/*
<Card>
    <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Historical Summary
        </CardTitle>
    </CardHeader>
    <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 font-medium">Total Months</p>
                <p className="text-2xl font-bold text-blue-600">{historicalData.length}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 font-medium">Avg Income</p>
                <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                        historicalData.reduce((sum, month) => sum + month.income, 0) / historicalData.length || 0,
                    )}
                </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-700 font-medium">Avg Expenses</p>
                <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(
                        historicalData.reduce((sum, month) => sum + month.expenses, 0) / historicalData.length || 0,
                    )}
                </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700 font-medium">Months On Budget</p>
                <p className="text-2xl font-bold text-purple-600">
                    {historicalData.filter((month) => !month.isOverBudget).length}
                </p>
            </div>
        </div>
    </CardContent>
</Card>*/


/*
<TabsContent value="history" className="space-y-6">
    {/!* Monthly History Overview with New Design *!/}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {historicalData.map((monthData) => (
            <Card
                key={monthData.month}
                className={`relative overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
                    monthData.month === selectedMonth ? "ring-2 ring-blue-500 bg-blue-50/50" : ""
                }`}
                onClick={() => setSelectedMonth(monthData.month)}
            >
                {/!* Status Indicator *!/}
                <div className="absolute top-4 right-4">
                    {monthData.isOverBudget ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{monthData.monthName}</CardTitle>
                        <Badge variant={monthData.isOverBudget ? "destructive" : "default"} className="text-xs">
                            {Math.round(monthData.budgetUtilization)}%
                        </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{monthData.transactionCount} transactions</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/!* Financial Summary *!/}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-xs font-medium text-green-700">Income</span>
                            </div>
                            <p className="text-lg font-bold text-green-600">{formatCurrency(monthData.income)}</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                <span className="text-xs font-medium text-red-700">Expenses</span>
                            </div>
                            <p className="text-lg font-bold text-red-600">{formatCurrency(monthData.expenses)}</p>
                        </div>
                    </div>

                    {/!* Net Income *!/}
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Activity className="h-4 w-4 text-gray-600" />
                            <span className="text-xs font-medium text-gray-700">Net Income</span>
                        </div>
                        <p
                            className={`text-lg font-bold ${monthData.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                            {formatCurrency(monthData.netIncome)}
                        </p>
                    </div>

                    {/!* Budget Progress *!/}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Budget Usage</span>
                            <span className="font-medium">{formatCurrency(monthData.budget.totalBudget)}</span>
                        </div>
                        <Progress value={Math.min(monthData.budgetUtilization, 100)} className="h-2" />
                        {monthData.isOverBudget && (
                            <p className="text-xs text-red-600 font-medium">
                                Over by {formatCurrency(monthData.expenses - monthData.budget.totalBudget)}
                            </p>
                        )}
                    </div>

                    {/!* Category Mini Breakdown *!/}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Top Categories</h4>
                        <div className="space-y-1">
                            {Object.entries(monthData.categoryTotals)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 3)
                                .map(([category, amount]) => {
                                    const CategoryIcon = categoryIcons[category as ExpenseCategory]
                                    return (
                                        <div key={category} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <CategoryIcon className="h-3 w-3 text-gray-500" />
                                                <span className="text-gray-600">{category}</span>
                                            </div>
                                            <span className="font-medium">{formatCurrency(amount)}</span>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>

    {/!* Historical Summary *!/}
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Historical Summary
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 font-medium">Total Months</p>
                    <p className="text-2xl font-bold text-blue-600">{historicalData.length}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">Avg Income</p>
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(
                            historicalData.reduce((sum, month) => sum + month.income, 0) / historicalData.length || 0,
                        )}
                    </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700 font-medium">Avg Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(
                            historicalData.reduce((sum, month) => sum + month.expenses, 0) / historicalData.length || 0,
                        )}
                    </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700 font-medium">Months On Budget</p>
                    <p className="text-2xl font-bold text-purple-600">
                        {historicalData.filter((month) => !month.isOverBudget).length}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
</TabsContent>*/
