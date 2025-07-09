import {FormControl, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {expenseCategoryMeta, incomeCategoryMeta} from "@/constants/categoryMeta.ts";
import type {TransactionType} from "@/types/enums.ts";

interface TransactionCategorySelectProps {
    type: TransactionType;
    value: string;
    onCategoryChange: (value: string) => void;
}

export default function TransactionCategorySelect({type, value, onCategoryChange}: TransactionCategorySelectProps) {
    const currentCategories = type === 'INCOME' ? incomeCategoryMeta : expenseCategoryMeta;

    return (
        <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
                <Select
                    value={value}
                    onValueChange={onCategoryChange}
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