'use client';

import { Button } from '../ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authorization } from '@/app/lib/actions';
import { AlertCircle, ArrowRight, KeyRound, Mail, PiggyBank, User } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const initialState = { message: '', errors: {} };
  const [errorMessage, dispatch] = useFormState(authorization, initialState);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full rounded-lg bg-green-600 p-3 md:h-36 items-end">
          <PiggyBank size={50} /> 
          <div className="text-white md:w-36 flex text-3xl font-bold ml-2">
            Coinly
          </div>
        </div>
        <form action={dispatch} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-950 px-6 pb-4 pt-8">
            <h1 className={`mb-3 text-2xl`}>
              Create an Account.
            </h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full text-gray-950 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {errorMessage.errors?.email &&
                  errorMessage.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full text-gray-950 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter a username"
                    required
                  />
                  <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div id="username-error" aria-live="polite" aria-atomic="true">
                {errorMessage.errors?.username &&
                  errorMessage.errors.username.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full text-gray-950 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div id="password-error" aria-live="polite" aria-atomic="true">
                {errorMessage.errors?.password &&
                  errorMessage.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <SignupButton />
            <div className='text-gray-400 text-sm underline mt-4'>
              <Link href={"/login"}>
                Already have an account? Login.
              </Link>
            </div>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage?.message && (
                <>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage.message}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Sign up <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}