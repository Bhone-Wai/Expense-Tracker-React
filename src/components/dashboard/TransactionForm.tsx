import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import {transactionSchema, type TransactionSchema} from "@/schemas/transactionSchema.ts";
import {Loader2, Plus} from "lucide-react";
import TransactionField from "@/components/transaction/TransactionField.tsx";
import TransactionTypeToggle from "@/components/transaction/TransactionTypeToggle.tsx";
import TransactionDate from "@/components/transaction/TransactionDate.tsx";
import TransactionCategorySelect from "@/components/transaction/TransactionCategorySelect.tsx";
import type {TransactionType} from "@/types/enums.ts";
import {mergeDateWithCurrentTime} from "@/lib/utils.ts";

export default function TransactionForm() {
    const { createTransaction, isCreating } = useTransactionQuery();

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

    const { watch, setValue, handleSubmit, control, reset } = form;

    const watchedType = watch("type");
    const watchedIncomeCategory = watch("incomeCategory");
    const watchedExpenseCategory = watch("expenseCategory");

    const getCurrentCategory = () =>
        watchedType === 'INCOME' ? watchedIncomeCategory || '' : watchedExpenseCategory || '';

    const handleTypeChange = (newType: TransactionType) => {
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
        const formattedDate = mergeDateWithCurrentTime(data.date);

        await createTransaction({
            ...data,
            date: formattedDate.toISOString(),
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
                                onCategoryChange={(value) =>
                                    watchedType === 'INCOME'
                                    ? setValue("incomeCategory", value as any)
                                    : setValue("expenseCategory", value as any)
                                }
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isCreating}>
                            {isCreating ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Transaction
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}