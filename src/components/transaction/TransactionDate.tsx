import type {Control} from "react-hook-form";
import type {TransactionSchema} from "@/schemas/transactionSchema.ts";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

interface TransactionDateProps {
    control: Control<TransactionSchema>
}

export default function TransactionDate({ control }: TransactionDateProps) {
    return (
        <FormField
            control={control}
            name={'date'}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                        <Input
                            type={'date'}
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}