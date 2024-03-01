"use server";

import { effect, z } from "zod";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

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

const AuthFormSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  username: z.string({
    invalid_type_error: "Please enter a username.",
  }),
  password: z.string().min(6),
})

export type AuthState = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

const Authenticate = AuthFormSchema.omit({ username: true });
export async function authenticate(
  prevState: AuthState,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = Authenticate.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Authentication failed.',
    };
  }

  try {
    const value = await signIn('credentials', formData);
    return { message: "Authentication succeed!" }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {message: 'Invalid credentials.'};
        default:
          return {message: 'Something went wrong.'};
      }
    }
    throw error
  }
}

export async function authorization(
  prevState: AuthState,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = AuthFormSchema.safeParse({
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Authorization failed.',
    };
  }
  
  try {
    bcrypt.hash(validatedFields.data.password, 10, async (err, hash) => {
      await prisma.user.create({
        data: {...validatedFields.data, password: hash}
      })
    });
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }
  
  redirect(`/login`);
}
