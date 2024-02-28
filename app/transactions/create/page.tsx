import { Button } from "@/app/ui/button";
import Breadcrumbs from "@/app/ui/transactions/breadcrumbs";
import Form from "@/app/ui/transactions/create-form";
import Link from "next/link";

 
export default async function Page() {
  // const customers = await fetchCustomers();
  const categories = ['food', 'transport', 'apparel', 'allowance', 'freelance', 'salary', 'others']
 
  return (
    <main>
      <Button>
        <Link href="/transactions">
          Back
        </Link>
      </Button>
      <Form categories={categories} />
    </main>
  );
}