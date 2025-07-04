import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";
import MonthlyFinancialSummary from "@/components/monthly_history/MonthlyFinancialSummary.tsx";

export default function MonthlyHistory() {
    return (
        <TabsWrapper>
            <MonthlyFinancialSummary />
        </TabsWrapper>
    );
}

/*
<Card className="border border-gray-200 shadow-sm rounded-lg">
    <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">Monthly Timeline</CardTitle>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-transparent">
                    Last 6 months
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-transparent">
                    Export
                </Button>
            </div>
        </div>
    </CardHeader>
    <CardContent>
        <div className="space-y-6">
            {/!* June 2025 *!/}
            <div className="relative">
                <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="w-px h-16 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">June 2025</h3>
                                <p className="text-sm text-gray-600">Current month • 13 transactions</p>
                            </div>
                            <Badge className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Income</p>
                                <p className="text-lg font-semibold text-green-600">₦13,400</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Expenses</p>
                                <p className="text-lg font-semibold text-red-600">₦2,290</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Net</p>
                                <p className="text-lg font-semibold text-gray-900">₦11,110</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/!* May 2025 *!/}
            <div className="relative">
                <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-px h-16 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">May 2025</h3>
                                <p className="text-sm text-gray-600">Previous month • 18 transactions</p>
                            </div>
                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                Completed
                            </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Income</p>
                                <p className="text-lg font-semibold text-green-600">₦12,800</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Expenses</p>
                                <p className="text-lg font-semibold text-red-600">₦3,450</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Net</p>
                                <p className="text-lg font-semibold text-gray-900">₦9,350</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/!* April 2025 *!/}
            <div className="relative">
                <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-px h-16 bg-gray-200 mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">April 2025</h3>
                                <p className="text-sm text-gray-600">2 months ago • 22 transactions</p>
                            </div>
                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                Completed
                            </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Income</p>
                                <p className="text-lg font-semibold text-green-600">₦15,200</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Expenses</p>
                                <p className="text-lg font-semibold text-red-600">₦4,100</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Net</p>
                                <p className="text-lg font-semibold text-gray-900">₦11,100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/!* March 2025 *!/}
            <div className="relative">
                <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h3 className="text-base font-medium text-gray-900">March 2025</h3>
                                <p className="text-sm text-gray-600">3 months ago • 15 transactions</p>
                            </div>
                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                Completed
                            </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Income</p>
                                <p className="text-lg font-semibold text-green-600">₦11,900</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Expenses</p>
                                <p className="text-lg font-semibold text-red-600">₦2,800</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600 mb-1">Net</p>
                                <p className="text-lg font-semibold text-gray-900">₦9,100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CardContent>
</Card>*/
