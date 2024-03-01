import LoginForm from '@/app/ui/login-form';
import { PiggyBank } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full rounded-lg bg-green-600 p-3 md:h-36 items-end">
          <PiggyBank size={50} /> 
          <div className="text-white md:w-36 flex text-3xl font-bold ml-2">
            Coinly
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}