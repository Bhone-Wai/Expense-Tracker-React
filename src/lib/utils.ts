import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this to your lib/utils.ts file
export function formatCurrency(amount: number | undefined | null): string {
  // Handle undefined, null, or invalid numbers
  if (amount == null || isNaN(amount)) {
    amount = 0;
  }

  return `฿${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

// Alternative versions if you want different formatting:

// Without decimals (matches your transaction display)
export function formatCurrencySimple(amount: number): string {
  return `฿${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}

// With Thai locale formatting
export function formatCurrencyThai(amount: number): string {
  return `฿${amount.toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}