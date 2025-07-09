import {Badge} from "@/components/ui/badge.tsx";
import {TimelineIndicator} from "@/components/monthly_history/TimelineIndicator.tsx";
import {FinancialMetricCard} from "@/components/monthly_history/FinancialMetricCard.tsx";
import type {MonthlyFinancialData} from "@/types/financial.ts";

interface MonthlyFinancialCardProps {
    data: MonthlyFinancialData;
}

export function MonthlyFinancialCard({ data }: MonthlyFinancialCardProps) {
    const getBadgeProps = () => {
        if (data.status === 'active') {
            return {
                className: 'bg-green-50 text-green-700 border-green-200',
                children: 'Active'
            }
        }
        return {
            className: 'bg-gray-50 text-gray-700 border-gray-200',
            children: 'Completed'
        };
    };

    const formatMonthYear = () => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${monthNames[data.month - 1]} ${data.year}`;
    }

    const getStatusText = () => {
        if (data.isCurrentMonth) {
            return `Current month • ${data.totalTransactions} transactions`;
        }
        const monthsAgo = new Date().getMonth() - data.month + 1;
        return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago • ${data.totalTransactions} transactions`
    }

    return (
        <div className={'relative'}>
            <div className={'flex items-start gap-4'}>
                <TimelineIndicator isActive={data.status === 'active'} />

                <div className={'flex-1 min-w-0'}>
                    <div className={'flex items-center justify-between mb-2'}>
                        <div>
                            <h3 className={'text-base font-medium text-gray-900'}>
                                {formatMonthYear()}
                            </h3>
                            <p className={'text-sm text-gray-600'}>
                                {getStatusText()}
                            </p>
                        </div>
                        <Badge {...getBadgeProps()} />
                    </div>

                    <div className={'grid grid-cols-3 gap-4 mt-3'}>
                        <FinancialMetricCard
                            label={'Income'}
                            value={data.totalIncome}
                            textColor={'text-green-600'}
                        />
                        <FinancialMetricCard
                            label={'Expenses'}
                            value={data.totalExpense}
                            textColor={'text-red-600'}
                        />
                        <FinancialMetricCard
                            label={'Net'}
                            value={data.netAmount}
                            textColor={'text-gray-900'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}