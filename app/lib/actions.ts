"use server";

import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient()
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

const FormSchema = z.object({
  userId: z.number(),
  category: z.string({
    invalid_type_error: "Please select a category.",
  }),
  amount: z.coerce.number().refine((value) => value !== 0, {
    message: "Amount must not be equal to 0",
  }),
  date: z.coerce.date({
    invalid_type_error: "Please enter a valid date.",
  }),
  description: z.string().refine((value) => value !== '', {
    message: "Please enter a description."
  })
});

export type State = {
  errors?: {
    category?: string[];
    amount?: string[];
    description?: string[];
    date?: string[];
  };
  message?: string | null;
};

const CreateTransaction = FormSchema.omit({ userId: true });

export async function createTransaction(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateTransaction.safeParse({
    category: formData.get('category'),
    amount: formData.get('amount'),
    date: formData.get('date'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Transaction.',
    };
  }

  // Prepare data for insertion into the database
  const { category, amount, date, description } = validatedFields.data;
  const amountInCents = amount * 100;

  // Insert data into the database
  try {
    await prisma.transaction.create({
      data: {
        userId: 1,
        date: date,
        description: description,
        amount: amountInCents,
        category: category,
      }
    })
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Transaction.',
    };
  }

  const month = date.getMonth()
  const year = date.getFullYear()
  
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/transactions?month=${month+1}&&year=${year}`);
  redirect(`/transactions?month=${month+1}&&year=${year}`);
}

// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice.' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice.' };
//   }
// }

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }
