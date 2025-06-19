import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {DollarSign, List, Plus} from "lucide-react";
import TransactionItem from "@/components/transaction/TransactionItem.tsx";
import {useNavigate} from "react-router-dom";
import useTransactions from "@/hooks/useTransactions.ts";
import {format} from "date-fns";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useEffect} from "react";

export default function Transaction() {
    const navigate = useNavigate();
    const redirect = () => {
        navigate('/');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        transactions,
        isLoadingRecent,
        deleteTransaction,
        isDeleting
    } = useTransactions();

    const handleDelete = (id: string) => {
        deleteTransaction(id);
    }

    const now = new Date();
    const currentMonthYear = format(now, 'MMM yyy')

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }

        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const groupTransactionsByDate = (transactions) => {
        const grouped = transactions.reduce((acc, transaction) => {
            const dateKey = new Date(transaction.date).toDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(transaction);
            return acc;
        }, {});

        // Convert to array and sort by date (newest first)
        return Object.entries(grouped)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([dateKey, transactions]) => ({
                date: dateKey,
                transactions: transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
            }));
    };

    if (isLoadingRecent) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className={'text-2xl font-semibold'}>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Simple skeleton items */}
                    {[1, 2, 3].map((item) => (
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

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5" />
                    <span className={'text-2xl'}>All Transactions for {currentMonthYear}</span>
                </CardTitle>
                <Button
                    variant="outline"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={redirect}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Transactions
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                {transactions && transactions.length > 0 ? (
                    groupTransactionsByDate(transactions).map(({date, transactions: dayTransactions}) => (
                        <div key={date} className={'mb-3'}>
                            <h3 className="font-medium text-gray-900 mb-3 sticky top-0 bg-white py-2">{formatDate(date)}</h3>
                            <div className={'space-y-2'}>
                                {dayTransactions.map(transaction => (
                                    <TransactionItem
                                        key={transaction.id}
                                        transaction={transaction}
                                        onDelete={() => handleDelete(transaction.id)}
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