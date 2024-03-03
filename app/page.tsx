"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Home() {
  const router = useRouter();
  router.replace('transactions')

  return (
    <main className="flex justify-center items-center flex-col text-center p-10 h-screen">
      <h1 className="m-6">Click the button below if you do not get directed to '/transaction'</h1>
      <Button onClick={() => router.replace('transactions')}>
        Redirect
      </Button>
    </main>
  );
}
