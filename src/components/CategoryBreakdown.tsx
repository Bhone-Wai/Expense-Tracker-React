import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";

export default function CategoryBreakdown() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Category Spending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(stats.categoryTotals).map(([category, amount]) => {
                    const CategoryIcon = categoryIcons[category as ExpenseCategory]
                    const goal = currentBudget[category as keyof typeof currentBudget]
                    const progress = goal > 0 ? (amount / goal) * 100 : 0

                    return (
                        <div key={category} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CategoryIcon className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm font-medium">{category}</span>
                                </div>
                                <span className="text-sm font-semibold">{formatCurrency(amount)}</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Goal: {formatCurrency(goal)}</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <Progress value={Math.min(progress, 100)} className="h-2" />
                                {progress > 100 && (
                                    <p className="text-xs text-red-600">Over budget by {formatCurrency(amount - goal)}</p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}