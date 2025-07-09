import TabsWrapper from "@/components/layout/tabs/TabsWrapper.tsx";
import MonthlyFinancialSummary from "@/components/monthly-history/MonthlyFinancialSummary.tsx";

export default function MonthlyHistory() {
    return (
        <TabsWrapper>
            <MonthlyFinancialSummary />
        </TabsWrapper>
    );
}
