import { ArrowRightIcon, Home, LogOut, LucideLayoutDashboard, PiggyBank, PowerIcon, User } from "lucide-react";
import TransactionHeader from "../ui/transactions/header";
import { signOut } from "@/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden md:grid md:grid-cols-5">
        <div className="col-span-1 fixed top-0 h-screen">
          <div className="flex flex-col h-full p-2">
            <div className="flex h-20 w-full rounded-lg border-white border-4 bg-green-600 p-3 md:h-36 items-end">
              <PiggyBank size={50} />
              <div className="text-white md:w-36 flex text-3xl font-bold ml-2">
                Coinly
              </div>
            </div>
            <div className="bg-green-600 rounded-lg mt-2 border-4 border-white h-full">
              <TransactionHeader />
              <div className="p-3 flex flex-col gap-4 mx-6">
                <div className="flex justify-between w-full p-3 rounded-lg hover:cursor-pointer bg-green-500">
                  <div className="flex gap-2">
                    <Home />
                    <span>Home</span>
                  </div>
                  <ArrowRightIcon/>
                </div>
                <div className="flex justify-between w-full p-3 rounded-lg hover:cursor-pointer bg-green-600">
                  <div className="flex gap-2">
                    <LucideLayoutDashboard />
                    <span>Dashboard</span>
                  </div>
                  <ArrowRightIcon/>
                </div>
                <div className="flex justify-between w-full p-3 rounded-lg hover:cursor-pointer bg-green-600">
                  <div className="flex gap-2">
                    <User />
                    <span>Account</span>
                  </div>
                  <ArrowRightIcon/>
                </div>
                <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <div className="flex justify-between w-full p-3 rounded-lg hover:cursor-pointer bg-green-600">
                    <div className="flex gap-2">
                      <LogOut />
                      <span>Logout</span>
                    </div>
                    <ArrowRightIcon/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 col-start-2 m-14">
          {children}
        </div>
      </div>
      <div className="md:hidden">
        <TransactionHeader />
        {children}
        <div className="bg-green-600 rounded-t-xl fixed bottom-0 w-full p-3 flex justify-evenly items-center">
          <Home />
          <LucideLayoutDashboard />
          <User />
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="align-middle">
              <LogOut className="w-6" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
