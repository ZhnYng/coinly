"use client"

import { Button } from "@/app/ui/button";
import Form from "@/app/ui/transactions/create-form";
import { useRouter } from "next/navigation";
 
export default async function Page() {
  const router = useRouter()
  const categories = ['Food', 'Transport', 'Apparel', 'Allowance', 'Freelance', 'Salary', 'Others']
 
  return (
    <main className="p-10">
      <Button onClick={() => router.back()}>
        Back
      </Button>
      <Form categories={categories} />
    </main>
  );
}