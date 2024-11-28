// /lib/api/utils/format.ts

// Format a number as currency (e.g., $1,234.56)
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format a date into a readable format (e.g., MM/DD/YYYY)
export function formatDate(date: string | Date, format: string = 'MM/DD/YYYY'): string {
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Example of formatting an API response for product price
export function formatProductPrice(price: number): string {
  return price.toFixed(2); // Ensure price is formatted to two decimal places
}

// Convert an object to a query string (e.g., ?key=value&key2=value2)
export function formatQueryParams(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}
