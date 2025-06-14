import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, DollarSign, List} from "lucide-react";

export default function RecentTransactions() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => setShowAllTransactions(true)}
                >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                {recentTransactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No transactions for this month. Add your first transaction above!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {recentTransactions.map((transaction) => renderTransactionItem(transaction))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
                <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={() => setShowAllTransactions(true)}
                >
                    <List className="mr-2 h-4 w-4" />
                    View All Transactions
                </Button>
            </CardFooter>
        </Card>
    )
}