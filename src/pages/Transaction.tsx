import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DollarSign, List, Plus} from "lucide-react";
import TransactionItem from "@/components/transaction/TransactionItem.tsx";
import {useNavigate} from "react-router-dom";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import {useEffect} from "react";
import {TransactionSkeleton} from "@/components/common/SkeletonLoader.tsx";
import {formatTransactionDate, groupTransactionsByDate} from "@/lib/utils.ts";

export default function Transaction() {
    const navigate = useNavigate();
    const handleRedirectDashboard = () => {
        navigate('/');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        transactions,
        isLoading,
        deleteTransaction,
        isDeleting
    } = useTransactionQuery();

    const handleDelete = (id: string) => {
        deleteTransaction(id);
    }

    if (isLoading) {
        return (
            <TransactionSkeleton title={`All Transactions`} />
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5" />
                    <span className={'text-2xl'}>All Transactions</span>
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={handleRedirectDashboard}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Transactions
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {transactions && transactions.length > 0 ? (
                    groupTransactionsByDate(transactions).map(({date, transactions: dayTransactions}) => (
                        <div key={date} className={'mb-3'}>
                            <h3 className="font-medium text-gray-900 mb-3 sticky top-0 bg-white py-2">{formatTransactionDate(date)}</h3>
                            <div className={'space-y-2'}>
                                {dayTransactions.map(transaction => (
                                    <TransactionItem
                                        key={transaction.id}
                                        transaction={transaction}
                                        onTransactionDelete={() => handleDelete(transaction.id)}
                                        isDeleting={isDeleting}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No transactions for this month. Add your first transaction above!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}