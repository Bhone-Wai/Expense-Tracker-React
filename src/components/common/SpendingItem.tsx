import {formatCurrencyTHB} from "@/lib/utils.ts";
import {Progress} from "@/components/ui/progress.tsx";
import * as React from "react";

interface SpendingItemData {
    title: string;
    icon: React.ReactNode;
    actual: number;
    budget: number;
    percent: number;
    progress: number;
    isOverBudget: boolean;
}

interface SpendingItemProps {
    data: SpendingItemData;
    variant?: 'default' | 'compact' | 'badge';
    overBudgetText?: string;
}

export default function SpendingItem({
    data,
     variant = 'default',
    overBudgetText,
}: SpendingItemProps) {

    const { title, icon, actual, budget, percent, progress, isOverBudget } = data;

    const isCompact = variant === 'compact';

    return (
        <div className={'space-y-2'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <div className={"text-gray-600"}>{icon}</div>
                    <span className={isCompact ? 'text-sm font-medium' : 'text-base font-semibold'}>
                        {title}
                    </span>
                </div>

                <span className={`font-semibold ${isCompact ? 'text-sm' : 'text-base'}`}>
                    {formatCurrencyTHB(actual)}
                </span>
            </div>

            <div className={'space-y-1'}>
                <div className={`flex justify-between text-gray-500 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    <span>Goal: {formatCurrencyTHB(budget)}</span>
                    <span>{Math.round(percent)}%</span>
                </div>

                <Progress value={progress} className={isCompact ? 'h-2' : 'h-3'} />

                {isOverBudget && (
                    <p className={'text-xs text-red-600'}>
                        {overBudgetText ??
                            `Over budget by ${formatCurrencyTHB(actual - budget)}`
                        }
                    </p>
                )}
            </div>
        </div>
    );
}