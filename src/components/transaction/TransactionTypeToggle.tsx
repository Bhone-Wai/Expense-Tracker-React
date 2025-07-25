import type {Control} from "react-hook-form";
import type {TransactionSchema} from "@/schemas/transactionSchema.ts";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Toggle} from "@/components/ui/toggle.tsx";
import {TrendingDown, TrendingUp} from "lucide-react";
import type {TransactionType} from "@/types/enums.ts";

interface TransactionTypeToggleProps {
    control: Control<TransactionSchema>;
    onTypeChange: (type: TransactionType) => void;
}

export default function TransactionTypeToggle({control, onTypeChange}: TransactionTypeToggleProps) {
    return (
        <FormField
            control={control}
            name={'type'}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                        <div className={'flex gap-2'}>
                            <Toggle
                                pressed={field.value === 'INCOME'}
                                onPressedChange={() => onTypeChange('INCOME')}
                                className={'flex-1 data-[state=on]:bg-green-100 data-[state=on]:text-green-800'}
                            >
                                <TrendingUp className={'h-4 w-4 mr-2'} />
                                Income
                            </Toggle>
                            <Toggle
                                pressed={field.value === 'EXPENSE'}
                                onPressedChange={() => onTypeChange('EXPENSE')}
                                className="flex-1 data-[state=on]:bg-red-100 data-[state=on]:text-red-800"
                            >
                                <TrendingDown className={'h-4 w-4 mr-2'} />
                                Expense
                            </Toggle>
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}