import * as z from 'zod';
import {EXPENSE_CATEGORIES} from "@/types/enums.ts";

export const budgetSchema = z.object({
    category: z.enum(EXPENSE_CATEGORIES),
    budgetAmount: z.coerce.number().positive(),
});

export type BudgetSchema = z.infer<typeof budgetSchema>;