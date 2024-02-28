import { transactions } from "../lib/placeholder-data"

export async function fetchMonthlyTransactions(
  month: string,
  year: string
){
  // Convert month to zero-based index (January is 0)
  const targetDate = new Date(parseInt(year), parseInt(month) - 1);

  // Filter transactions for the specified month and year
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === targetDate.getMonth() && transactionDate.getFullYear() === targetDate.getFullYear();
  });

  return filteredTransactions;
}