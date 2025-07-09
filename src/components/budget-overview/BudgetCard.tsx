import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {BudgetVsActual} from "@/types/budget.ts";
import {Target} from "lucide-react";
import {useCategoryBudgetCardData, useTotalBudgetCardData} from "@/hooks/transformed/useBudgetCardData.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface TotalBudgetCardProps {
    totalBudget: number;
    isLoading: boolean;
}

export function TotalBudgetCard({totalBudget, isLoading}: TotalBudgetCardProps) {
    const { title, amount } = useTotalBudgetCardData(totalBudget);

    if (isLoading) {
        return (
            <Card>
                <CardHeader className={'flex flex-row items-center justify-between space-y-0'}>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-3/4" />
                </CardContent>
            </Card>
        );
    }

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
    isLoading: boolean;
}

export default function BudgetCard({budget, isLoading}: CategoryBudgetCardProps) {
    const { title, amount, icon: IconComponent, remainingText, remainingStyle } = useCategoryBudgetCardData(budget);

    if (isLoading) {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                </CardContent>
            </Card>
        );
    }

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