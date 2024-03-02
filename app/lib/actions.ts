"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import { prisma } from "./_base";

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
  const session = await auth();
  if(session?.user?.email){
    const currentEmail = session.user.email
    try {
      const userId = await prisma.user.findFirst({
        where: {
          email: currentEmail
        }
      })

      if(userId?.id){
        await prisma.transaction.create({
          data: {
            userId: userId.id,
            date: date,
            description: description,
            amount: amountInCents,
            category: category,
          }
        })
      } else {
        return { message: 'User cannot be found.' }
      }
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Transaction.',
      };
    }
  } else {
    return { message: 'Session does not contain user email.' }
  }
  

  const month = date.getMonth()
  const year = date.getFullYear()
  
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/transactions?month=${month+1}&&year=${year}`);
  redirect(`/transactions?month=${month+1}&&year=${year}`);
}

const UpdateTransaction = FormSchema.omit({ userId: true });
export async function updateTransaction(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateTransaction.safeParse({
    category: formData.get('category'),
    amount: formData.get('amount'),
    date: formData.get('date'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { category, amount, date, description } = validatedFields.data;
  const amountInCents = amount * 100;

  const session = await auth();
  if(session?.user?.email){
    try {
      const recordOwner = await prisma.transaction.findFirst({
        where: {
          id: Number(id),
        },
        select: {
          user: {
            select: {
              email: true,
              id: true
            }
          }
        }
      })

      if (session.user.email === recordOwner?.user.email){
        await prisma.transaction.update({
          where: {
            id: Number(id),
          },
          data: {
           ...validatedFields,
           amount: amountInCents,
          }
        })
      } else {
        return { message: "Unauthorized action. You do not own this record." }
      }
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Update Transaction.',
      };
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteTransaction(id: number) {
  const session = await auth();

  try {
    if(session?.user?.email){
      const user = await prisma.user.findFirst({
        where: {
          email: session?.user?.email,
        },
        select: {
          id: true
        }
      })

      const transaction = await prisma.transaction.findFirst({
        where: {
          userId: user?.id,
          id: id
        }
      })
  
      if(transaction) {
        await prisma.transaction.delete({
          where: {
            id: id
          }
        })
      } else {
        return { message: 'Authentication failed. Current user does not own this record.' }
      }
  
      revalidatePath('/transactions');
      return { message: 'Deleted Transaction.' };
    } else {
      return { message: 'User not found.' }
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Transaction.' };
  }
}

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
  prevState: AuthState | undefined,
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
    await signIn('credentials', formData);
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