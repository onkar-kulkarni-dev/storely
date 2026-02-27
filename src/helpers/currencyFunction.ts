// utils/currency.ts

type CurrencyOptions = {
  country?: string; // e.g., 'US', 'IN', 'JP'
  currency?: string; // e.g., 'USD', 'INR', 'JPY'
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

/**
 * Formats a number as currency based on country & currency code
 * @param amount - the number to format
 * @param options - optional settings for country, currency, decimals
 * @returns formatted currency string
 */
export function formatCurrency(
  amount: number,
  options: CurrencyOptions = {}
): string {
  const {
    country = "en-IN",
    currency = "INR",
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;

  const formatter = new Intl.NumberFormat(`${country}`, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(amount);
}
