import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

export const user = {
  email: "test@gmail.com",
  username: "test",
  password: "123456",
}

const prisma = new PrismaClient()

async function seed(){
  bcryptjs.hash(user.password, 10, async (err, hash) => {
    if(err) console.error(err);

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      create: {
        username: user.username,
        email: user.email,
        password: hash
      },
      update: {
        username: user.username,
        password: hash
      }
    })
  });

  const seedUser = await prisma.user.findUnique({
    where: {
      email: "test@gmail.com"
    }
  })
  const userId = seedUser?.id

  if(userId){
    await prisma.transaction.createMany({
      data: [
        {
          userId: userId,
          date: new Date('2024-02-25'),
          description: 'Groceries',
          amount: -5025, // $50.25 in cents (negative for expenses)
          category: 'Food',
        },
        {
          userId: userId,
          date: new Date('2024-02-24'),
          description: 'Gasoline',
          amount: -4000, // $40.00 in cents (negative for expenses)
          category: 'Transportation',
        },
        {
          userId: userId,
          date: new Date('2024-02-23'),
          description: 'Salary',
          amount: 200000, // $2000.00 in cents (positive for income)
          category: 'Income',
        },
        {
          userId: userId,
          date: new Date('2024-02-22'),
          description: 'Wingstop',
          amount: -7520, // $75.20 in cents (negative for expenses)
          category: 'Food',
        },
        {
          userId: userId,
          date: new Date('2024-02-20'),
          description: 'Freelance Project',
          amount: 120000, // $1200.00 in cents (positive for income)
          category: 'Income',
        },
      ]
    })
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })