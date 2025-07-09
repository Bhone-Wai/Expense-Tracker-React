import type {Control} from "react-hook-form";
import type {TransactionSchema} from "@/schemas/transactionSchema.ts";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

interface TransactionFieldProps {
    control: Control<TransactionSchema>
}

export default function TransactionField({ control }: TransactionFieldProps) {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
            <FormField
                control={control}
                name={'title'}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder={'Enter transaction title'} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={'amount'}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                            <Input
                                type={"number"}
                                step={'0.01'}
                                placeholder={'0.00'}
                                value={field.value || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value === '' ? undefined : parseFloat(value));
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}