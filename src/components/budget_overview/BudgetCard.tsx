import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {BudgetVsActual} from "@/types/budget.ts";
import {Target} from "lucide-react";
import {useCategoryBudgetCardData, useTotalBudgetCardData} from "@/hooks/transformed/useBudgetCardData.ts";

interface TotalBudgetCardProps {
    totalBudget: number;
}

export function TotalBudgetCard({totalBudget}: TotalBudgetCardProps) {
    const { title, amount } = useTotalBudgetCardData(totalBudget);

    return (
        <Card>
            <CardHeader className={'flex flex-row items-center justify-between space-y-0'}>
                <CardTitle className={'text-sm font-medium text-gray-600'}>
                    {title} Budget
                </CardTitle>
                <Target className={'h-4 w-4 text-blue-600'} />
            </CardHeader>

            <CardContent>
                <div className={'text-2xl font-bold'}>
                    {amount}
                </div>
            </CardContent>
        </Card>
    )
}

interface CategoryBudgetCardProps {
    budget: BudgetVsActual;
}

export default function BudgetCard({budget}: CategoryBudgetCardProps) {
    const { title, amount, icon: IconComponent, remainingText, remainingStyle } = useCategoryBudgetCardData(budget);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                    {title} Budget
                </CardTitle>
                {IconComponent && (
                    <IconComponent className={'h-4 w-4 text-gray-600'} />
                )}
            </CardHeader>

            <CardContent>
                <div className="text-2xl font-bold">
                    {amount}
                </div>

                <p className={remainingStyle}>
                    {remainingText}
                </p>
            </CardContent>
        </Card>
    );
}