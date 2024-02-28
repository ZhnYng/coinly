import { ChevronLeft, ChevronRight, PiggyBank } from "lucide-react";
import Pagination from "../ui/transactions/pagination";
import { fetchMonthlyTransactions } from "../lib/data";
import TransactionsTable from "../ui/transactions/table";
import { CreateTransaction } from "../ui/transactions/buttons";
import TransactionHeader from "../ui/transactions/header";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    month: string;
    year: string;
  };
}) {
  const filteredTransactions = await fetchMonthlyTransactions(
    searchParams.month,
    searchParams.year
  );

  return (
    <main>
      <div className="fixed bottom-4 right-4">
        <CreateTransaction />
      </div>
      <TransactionsTable  
        month={searchParams.month}
        year={searchParams.year}
      />
    </main>
  )
}