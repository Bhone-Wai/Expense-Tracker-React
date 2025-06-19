import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight, DollarSign, List, Loader2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import TransactionItem from "@/components/transaction/TransactionItem.tsx";
import useTransactions from "@/hooks/useTransactions.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function RecentTransactions() {
    const navigate = useNavigate();
    const {
        recentTransactions,
        isLoadingRecent,
        isErrorRecent,
        errorRecent,
        deleteTransaction,
        isDeleting
    } = useTransactions();

    const handleViewAll = () => {
        navigate('/transactions');
    };

    const handleDelete = (id: string) => {
        deleteTransaction(id);
    };

    if (isLoadingRecent) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Simple skeleton items */}
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                            <Skeleton className="h-5 w-16" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (isErrorRecent) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center">
                        <p className="text-red-600 mb-2">Failed to load transactions</p>
                        <p className="text-sm text-gray-500">
                            {errorRecent?.message || 'Something went wrong'}
                        </p>
                    </div>
                </CardContent>
            </Card>
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
                            onDelete={() => handleDelete(transaction.id)}
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
                >
                    <List className="mr-2 h-4 w-4" />
                    View All Transactions
                </Button>
            </CardFooter>
        </Card>
    );
}
