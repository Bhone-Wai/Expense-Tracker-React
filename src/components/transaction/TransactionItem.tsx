import type {transactionType} from "@/types/transaction.ts";
import {Trash2} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {expenseCategories, incomeCategories} from "@/constants/categories.ts";

interface TransactionItemProps {
    transaction: {
        id: string,
        title: string,
        amount: number,
        type: transactionType,
        incomeCategory?: string,
        expenseCategory?: string,
    };
    onDelete?: (id: string) => void;
}

// Category colors mapping
const categoryColors: Record<string, string> = {
    // Income categories
    'SALARY': 'border-green-200 text-green-700 bg-green-50',
    'FREELANCE': 'border-green-200 text-green-700 bg-green-50',
    'BONUS': 'border-green-200 text-green-700 bg-green-50',
    'INVESTMENT': 'border-green-200 text-green-700 bg-green-50',

    // Expense categories
    'NEEDS': 'border-blue-200 text-blue-700 bg-blue-50',
    'WANTS': 'border-purple-200 text-purple-700 bg-purple-50',
    'SAVINGS': 'border-green-200 text-green-700 bg-green-50',
}

export default function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
    // Get the appropriate category value
    const categoryValue = transaction.type === 'INCOME' ? transaction.incomeCategory : transaction.expenseCategory;

    // Find the category configuration
    const currentCategories = transaction.type === 'INCOME' ? incomeCategories : expenseCategories;
    const categoryConfig = currentCategories.find(cat => cat.value === categoryValue);

    // Get the icon component
    const IconComponent = categoryConfig?.icon;

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
                        <Badge className={categoryColors[categoryValue]} variant="outline">
                            {categoryConfig?.label || categoryValue}
                        </Badge>
                    )}
                </div>
            </div>
            <div className={'flex items-center gap-2'}>
                <span className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}
                    ฿{transaction.amount}.00
                </span>
                {onDelete && (
                    <Button
                        variant={'ghost'}
                        size={"sm"}
                        onClick={() => onDelete(transaction.id)}
                        className={'text-gray-400 hover:text-red-600'}
                    >
                        <Trash2 className={'h-4 w-4'} />
                    </Button>
                )}
            </div>
        </div>
    );
}