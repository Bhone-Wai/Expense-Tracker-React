import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {DollarSign, TrendingDown, TrendingUp} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";

export default function SummaryStats() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Total Income</span>
                    </div>
                    <span className="font-semibold text-green-600">{formatCurrency(stats.income)}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium">Total Expenses</span>
                    </div>
                    <span className="font-semibold text-red-600">{formatCurrency(stats.expenses)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Net Income</span>
                    </div>
                    <span className={`font-semibold ${stats.netIncome >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(stats.netIncome)}
                        </span>
                </div>
            </CardContent>
        </Card>
    );
}