import { fetchMonthNet, fetchMonthlyTransactions } from "../lib/data";
import TransactionsTable from "../ui/transactions/table";
import { CreateTransaction } from "../ui/transactions/buttons";
import { formatCurrency } from "../lib/utils";
import { signOut } from "@/auth";
import { PowerIcon } from "lucide-react";

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
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-black p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
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