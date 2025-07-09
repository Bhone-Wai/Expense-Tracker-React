import {Card, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import MonthlyFinancial from "@/components/monthly-history/MonthlyFinancial.tsx";

export default function MonthlyFinancialSummary() {
    return (
        <Card className="border border-gray-200 shadow-sm rounded-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-900">Monthly Financial Summary</CardTitle>
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

            <MonthlyFinancial />
        </Card>
    );
}