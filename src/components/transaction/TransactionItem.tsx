import {Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {Transaction} from "@/types/transaction.ts";
import {formatCurrencyTHB, getCategoryMeta} from "@/lib/utils.ts";

interface TransactionItemProps {
    transaction: Transaction;
    onTransactionDelete?: (id: string) => void;
    isDeleting?: boolean;
}

export default function TransactionItem({ transaction, onTransactionDelete }: TransactionItemProps) {
    // Get the appropriate category value
    const categoryValue = transaction.type === 'INCOME' ? transaction.incomeCategory : transaction.expenseCategory;

    const categoryInfo = getCategoryMeta(transaction.type, categoryValue);

    // Get the icon component
    const IconComponent = categoryInfo?.icon;

    return (
        <div className={'flex items-center justify-between p-3 rounded-lg border bg-white hover:bg-gray-50 transition-colors'}>
            <div className={'flex items-center gap-3'}>
                <div className={`p-2 rounded-full ${transaction.type === 'INCOME' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {IconComponent && (
                        <IconComponent className={`h-4 w-4 ${transaction.type === "INCOME" ? "text-green-600" : "text-gray-600"}`} />
                    )}
                </div>
                <div>
                    <p className={'font-medium text-gray-900'}>{transaction.title}</p>
                    {categoryValue && (
                        <Badge className={categoryInfo?.style} variant="outline">
                            {categoryInfo?.label || categoryValue}
                        </Badge>
                    )}
                </div>
            </div>
            <div className={'flex items-center gap-2'}>
                <span className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}
                    {formatCurrencyTHB(transaction.amount)}
                </span>
                {onTransactionDelete && (
                    <Button
                        variant={'ghost'}
                        size={"sm"}
                        onClick={() => onTransactionDelete(transaction.id)}
                        className={'text-gray-400 hover:text-red-600'}
                    >
                        <Trash2 className={'h-4 w-4'} />
                    </Button>
                )}
            </div>
        </div>
    );
}