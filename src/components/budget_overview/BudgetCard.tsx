import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {BudgetVsActual} from "@/types/budget.ts";
import {Target} from "lucide-react";
import useBudgetCardData from "@/hooks/transformed/useBudgetCardData.ts";

interface TotalBudgetCardProps {
    type: 'total';
    totalBudget: number;
}

interface CategoryBudgetCardProps {
    type: 'categories';
    budget: BudgetVsActual;
}

type BudgetCardsProps = TotalBudgetCardProps | CategoryBudgetCardProps;

export default function BudgetCard(props: BudgetCardsProps) {
    const cardData = useBudgetCardData(
        props.type,
        props.type === 'total' ? props.totalBudget : undefined,
        props.type === 'categories' ? props.budget: undefined
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-gray-600">
                    {cardData?.title} Budget
                </CardTitle>
                {cardData.type === 'total' ? (
                    <Target className={'h-4 w-4 text-blue-600'} />
                ) : (
                    cardData.icon && <cardData.icon className={'h-4 w-4 text-gray-600'} />
                )}
            </CardHeader>

            <CardContent>
                <div className="text-2xl font-bold">
                    {cardData.amount}
                </div>

                {cardData.remainingText && (
                    <p className={cardData.remainingStyle}>
                        {cardData.remainingText}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}