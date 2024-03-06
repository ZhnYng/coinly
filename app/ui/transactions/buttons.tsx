"use client"

import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { deleteTransaction } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';

export function CreateTransaction() {
  return (
    <Link
      href="/transactions/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Create Transaction</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTransaction({ id }: { id: number }) {
  return (
    <Link
      href={`/transactions/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-800"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteTransaction({ id }: { id: number }) {
  const deleteTransactionWithId = deleteTransaction.bind(null, id);
  const [error, dispatch] = useFormState(deleteTransactionWithId, { message: '' });

  if(error.message){
    toast.error(error.message)
  }

  return (
    <form action={dispatch}>
      <button className="rounded-md border p-2 hover:bg-gray-800">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}