import { fetchTransactionById } from '@/app/lib/data';
import TransactionForm from './transaction-form';

export default async function Page({ params }: { params: { id: string } }) {

  const id = params.id;

  const currentTransaction = await fetchTransactionById(id)

  return (
    <main className="p-10">
      {currentTransaction &&
      <TransactionForm 
        id={id} 
        currentTransaction={currentTransaction}
      />
      }
    </main>
  );
}