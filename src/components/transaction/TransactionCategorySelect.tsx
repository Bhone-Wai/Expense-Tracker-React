import type {transactionType} from "@/types/transaction.ts";
import {FormControl, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {expenseCategories, incomeCategories} from "@/constants/categories.ts";

interface TransactionCategorySelectProps {
    type: transactionType;
    value: string;
    onChange: (val: string) => void;
    // error?: string;
}

export default function TransactionCategorySelect({type, value, onChange, /*error*/}: TransactionCategorySelectProps) {
    const currentCategories = type === 'INCOME' ? incomeCategories : expenseCategories;
    return (
        <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
                <Select
                    value={value}
                    onValueChange={onChange}
                >
                    <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder={'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                        {currentCategories.map((category) => {
                            const IconComponent = category.icon;

                            return (
                                <SelectItem key={category.value} value={category.value}>
                                    <div className={'flex items-center gap-2'}>
                                        <IconComponent className={'h-4 w-4'} />
                                        {category.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </FormControl>
        </FormItem>
    );
}