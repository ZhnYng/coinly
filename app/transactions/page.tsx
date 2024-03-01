import { fetchMonthNet, fetchMonthlyTransactions } from "../lib/data";
import TransactionsTable from "../ui/transactions/table";
import { CreateTransaction } from "../ui/transactions/buttons";
import { formatCurrency } from "../lib/utils";
import { signOut } from "@/auth";
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
      <div className="fixed bottom-16 right-4">
        <CreateTransaction />
      </div>
      <TransactionsTable  
        month={searchParams.month}
        year={searchParams.year}
      />
      <div className="bg-green-600 rounded-t-xl fixed bottom-0 w-full p-3 flex justify-evenly items-center">
        <Home/>
        <LucideLayoutDashboard/>
        <User/>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="align-middle">
            <LogOut className="w-6"/>
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </main>
  )
}