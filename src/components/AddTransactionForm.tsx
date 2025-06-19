import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import type { transactionType} from "@/types/transaction.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import useTransactions from "@/hooks/useTransactions.ts";
import {transactionSchema, type TransactionSchema} from "@/schemas/transactionSchema.ts";
import {Loader2, Plus} from "lucide-react";
import TransactionField from "@/components/transaction/TransactionField.tsx";
import TransactionTypeToggle from "@/components/transaction/TransactionTypeToggle.tsx";
import TransactionDate from "@/components/transaction/TransactionDate.tsx";
import TransactionCategorySelect from "@/components/transaction/TransactionCategorySelect.tsx";

export default function AddTransactionForm() {
    const { createTransaction } = useTransactions();

    const form = useForm<TransactionSchema>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            title: '',
            amount: undefined,
            type: 'EXPENSE',
            date: new Date().toISOString().split('T')[0],
            expenseCategory: 'NEEDS',
        }
    });

    const { watch, setValue, handleSubmit, control, reset, formState } = form;
    const { isSubmitting, errors } = formState;

    const watchedType = watch("type");
    const watchedIncomeCategory = watch("incomeCategory");
    const watchedExpenseCategory = watch("expenseCategory");

    const getCurrentCategory = () =>
        watchedType === 'INCOME' ? watchedIncomeCategory || '' : watchedExpenseCategory || '';

    const handleTypeChange = (newType: transactionType) => {
        setValue("type", newType);

        // Reset categories when switching types
        if (newType === "INCOME") {
            setValue("incomeCategory", "SALARY");
            setValue("expenseCategory", undefined);
        } else {
            setValue("expenseCategory", "NEEDS");
            setValue("incomeCategory", undefined);
        }
    };

    const onSubmit = async (data: TransactionSchema) => {
        const dateWithCurrentTime = new Date(); // Current date/time
        const selectedDate = new Date(data.date); // Selected date at midnight

        // Set the selected date but keep current time
        dateWithCurrentTime.setFullYear(selectedDate.getFullYear());
        dateWithCurrentTime.setMonth(selectedDate.getMonth());
        dateWithCurrentTime.setDate(selectedDate.getDate());

        // Create transaction using the API
        await createTransaction({
            ...data,
            date: dateWithCurrentTime.toISOString(),
        });

        reset({
            title: "",
            amount: undefined,
            type: "EXPENSE",
            date: new Date().toISOString().split('T')[0],
            // incomeCategory: undefined,
            expenseCategory: 'NEEDS',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    <h3 className={'font-semibold text-2xl'}>Add Transaction</h3>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <TransactionField control={control} />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TransactionTypeToggle control={control} onTypeChange={handleTypeChange} />
                            <TransactionDate control={control} />
                            <TransactionCategorySelect
                                type={watchedType}
                                value={getCurrentCategory()}
                                onChange={(val) =>
                                    watchedType === 'INCOME'
                                    ? setValue("incomeCategory", val as any)
                                    : setValue("expenseCategory", val as any)
                                }
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            <Plus className="h-4 w-4 mr-2" />
                            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Add Transaction"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}