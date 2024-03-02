import { fetchTransactionById } from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import TransactionForm from './transaction-form';

export default async function Page({ params }: { params: { id: string } }) {

  const id = params.id;

  const currentTransaction = await fetchTransactionById(id)
  // const router = useRouter()

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