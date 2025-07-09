import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {transactionSchema, type TransactionSchema} from "@/schemas/transactionSchema.ts";
import useTransactionQuery from "@/hooks/queries/useTransactionQuery.ts";
import type {ExpenseCategory, IncomeCategory, TransactionType} from "@/types/enums.ts";
import {mergeDateWithCurrentTime} from "@/lib/utils.ts";
import {useAuth, useClerk} from "@clerk/clerk-react";

export default function useTransactionForm() {
    const { createTransaction, isCreating } = useTransactionQuery();
    const { isSignedIn } = useAuth();
    const { redirectToSignIn } = useClerk();

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

        if (newType === "INCOME") {
            setValue("incomeCategory", "SALARY");
            setValue("expenseCategory", undefined);
        } else {
            setValue("expenseCategory", "NEEDS");
            setValue("incomeCategory", undefined);
        }
    };

    const handleCategoryChange = (value: string) => {
        if (watchedType === 'INCOME') {
            setValue("incomeCategory", value as IncomeCategory);
        } else {
            setValue("expenseCategory", value as ExpenseCategory);
        }
    }

    const onSubmit = async (data: TransactionSchema) => {
        if (!isSignedIn) {
            redirectToSignIn();
            return;
        }

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
            expenseCategory: 'NEEDS',
            incomeCategory: undefined,
        });
    };

    return {
        form,
        control,
        watchedType,
        isCreating,
        getCurrentCategory,
        handleTypeChange,
        handleCategoryChange,
        handleSubmit: handleSubmit(onSubmit),
    }
}