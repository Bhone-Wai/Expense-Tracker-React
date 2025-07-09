import {formatCurrencyTHB} from "@/lib/utils.ts";

interface FinancialMetricCard {
    label: string;
    value: number;
    textColor: string;
}

export function FinancialMetricCard({ label, value, textColor }: FinancialMetricCard) {
    return (
        <div className="bg-gray-50 rounded-lg p-3">
            <p className={"text-xs text-gray-600 mb-1"}>{label}</p>
            <p className={`text-lg font-semibold ${textColor}`}>
                {formatCurrencyTHB(value)}
            </p>
        </div>
    );
}