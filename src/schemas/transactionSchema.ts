import * as z from 'zod';

export const transactionSchema = z.object({
    title: z.string().min(1),
    amount: z.coerce.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    date: z.string(),
    incomeCategory: z.enum(['SALARY', 'FREELANCE', 'BONUS', 'INVESTMENT']).optional(),
    expenseCategory: z.enum(['NEEDS', 'WANTS', 'SAVINGS']).optional(),
}).refine(data =>
    (data.type === 'INCOME' && data.incomeCategory) ||
    (data.type === 'EXPENSE' && data.expenseCategory),
    {
        message: 'Category is required based on type',
        path: ['incomeCategory'],
    }
);

export type TransactionSchema = z.infer<typeof transactionSchema>;