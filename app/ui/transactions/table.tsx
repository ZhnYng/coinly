import Image from 'next/image';
// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchMonthlyTransactions } from '@/app/lib/data';
import { Briefcase, Bus, HandCoins, Shirt, Utensils } from 'lucide-react';
import { DeleteTransaction, UpdateTransaction } from './buttons';

export default async function TransactionsTable({
  month,
  year
}: {
  month: string;
  year: string;
}) {
  const transactions = await fetchMonthlyTransactions(month, year);

  const getIconForCategory = (
    category: string
  ): JSX.Element | undefined => {
    const categoryIcons: Record<string, JSX.Element> = {
      "Food": <Utensils size={28} className='mr-2'/>,
      "Transportation": <Bus size={28} className='mr-2'/>,
      "Income": <HandCoins size={28} className='mr-2'/>,
      "Apparel": <Shirt size={28} className='mr-2'/>
    }
    return categoryIcons[category];
  };

  return (
    <div className="flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 m-4 md:pt-0">
          <div className="md:hidden">
            {transactions?.map((transaction) => (
              <div
                key={transaction.id}
                className="w-full rounded-md bg-black p-4 mb-8"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {getIconForCategory(transaction.category)}
                      <p>{transaction.description}</p>
                    </div>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p>{formatDateToLocal(transaction.date.toDateString())}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateTransaction id={transaction.id} />
                    <DeleteTransaction id={transaction.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-black">
              {transactions?.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {getIconForCategory(transaction.category)}
                      <p>{transaction.description}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(transaction.date.toDateString())}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateTransaction id={transaction.id} />
                      <DeleteTransaction id={transaction.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}