"use client"

import { Button } from "@/app/ui/button";
import Breadcrumbs from "@/app/ui/transactions/breadcrumbs";
import Form from "@/app/ui/transactions/create-form";
import Link from "next/link";
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