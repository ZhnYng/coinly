import { fetchMonthNet, fetchMonthlyTransactions } from "../lib/data";
import TransactionsTable from "../ui/transactions/table";
import { CreateTransaction } from "../ui/transactions/buttons";
import { formatCurrency } from "../lib/utils";
import { Home, LogOut, LucideLayoutDashboard, PowerIcon, User } from "lucide-react";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    month: string;
    year: string;
  };
}) {
  const remaining = await fetchMonthNet(searchParams.month, searchParams.year)
  return (
    <main>
      {(remaining == 0 || remaining) && <div>
        <h4 className="font-bold text-center mt-3 text-lg">
          Net: {formatCurrency(remaining)}
        </h4>
      </div>}
      <div className="fixed bottom-16 right-4 md:right-10 md:bottom-10">
        <CreateTransaction />
      </div>
      <TransactionsTable  
        month={searchParams.month}
        year={searchParams.year}
      />
    </main>
  )
}