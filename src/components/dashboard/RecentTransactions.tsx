import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, DollarSign, List} from "lucide-react";
import {useNavigate} from "react-router-dom";
import TransactionItem from "@/components/transaction/TransactionItem.tsx";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import {TransactionSkeleton} from "@/components/common/SkeletonLoader.tsx";

export default function RecentTransactions() {
    const navigate = useNavigate();
    const {
        recentTransactions,
        isLoadingRecent,
        deleteTransaction,
        isDeleting
    } = useTransactionQuery();

    const handleViewAll = () => {
        navigate('/transactions');
    };

    const handleDelete = (id: string) => {
        deleteTransaction(id);
    };

    if (isLoadingRecent) {
        return (
            <TransactionSkeleton title={'Recent Transactions'} />
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={'text-2xl font-semibold'}>Recent Transactions</CardTitle>
                <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={handleViewAll}
                >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {recentTransactions && recentTransactions.length > 0 ? (
                    recentTransactions.map(transaction => (
                        <TransactionItem
                            key={transaction.id}
                            transaction={transaction}
                            onTransactionDelete={() => handleDelete(transaction.id)}
                            isDeleting={isDeleting}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No transactions for this month. Add your first transaction above!</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
                <Button
                    variant="outline"
                    className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={handleViewAll}
                    aria-label="View all transactions"
                >
                    <List className="mr-2 h-4 w-4" />
                    View All Transactions
                </Button>
            </CardFooter>
        </Card>
    );
}