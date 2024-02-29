"use client";

import { Boxes, Calendar, CheckIcon, CircleDollarSign, ClockIcon, TextIcon, UserCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button } from '../button';
import { createTransaction } from '@/app/lib/actions';
import { toLocalISOString } from '@/app/lib/utils';

export default function Form({ categories }: { categories: string[] }) {
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createTransaction, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-950 py-4 md:p-6">
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              className="peer block w-full cursor-pointer rounded-md border text-gray-700 border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
              defaultValue=""
              aria-describedby="category-error"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Boxes className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-700" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Transaction Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border text-gray-700 border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby="amount-error"
              />
              <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-700 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Macdonalds"
                className="peer block w-full rounded-md border text-gray-700 border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby="description-error"
              />
              <TextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-700 peer-focus:text-gray-900" />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date"
                name="date"
                type="datetime-local"
                defaultValue={toLocalISOString(new Date())}
                className="peer block w-full rounded-md border text-gray-700 border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                aria-describedby="date-error"
              />
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-700 peer-focus:text-gray-900" />
            </div>
            <div id="date-error" aria-live="polite" aria-atomic="true">
              {state.errors?.date &&
                state.errors.date.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/transactions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Transaction</Button>
      </div>
    </form>
  );
}
