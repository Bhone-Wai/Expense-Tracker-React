import * as z from 'zod';
import {EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES} from "@/types/enums.ts";

export const transactionSchema = z.object({
    title: z.string().min(1, 'Transaction title is required'),
    amount: z.coerce.number({
        required_error: "Amount is required",
        invalid_type_error: "Please enter a valid number",
    }).positive('Amount must be positive'),
    type: z.enum(TRANSACTION_TYPES),
    date: z.string(),
    incomeCategory: z.enum(INCOME_CATEGORIES).optional(),
    expenseCategory: z.enum(EXPENSE_CATEGORIES).optional(),
}).refine(data => {
    if (data.type === 'INCOME') {
        return !!data.incomeCategory;
    }
    if (data.type === 'EXPENSE') {
        return !! data.expenseCategory;
    }
    return true;
}, {
    message: 'Category is required based on transaction type',
    path: ['category'],
});

export type TransactionSchema = z.infer<typeof transactionSchema>;