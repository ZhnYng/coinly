import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
async function seed(){
  const insertedUser = await prisma.user.upsert({
    where: {
      email: 'test@gmail.com',
    },
    create: {
      username: "test",
      email: "test@gmail.com",
      password: "123456"
    },
    update: {
      username: "test",
      password: "123456"
    }
  })

  const insertedTransactions = await prisma.transaction.createMany({
    data: [
      {
        userId: 1,
        date: new Date('2024-02-25'),
        description: 'Groceries',
        amount: -5025, // $50.25 in cents (negative for expenses)
        category: 'Food',
      },
      {
        userId: 1,
        date: new Date('2024-02-24'),
        description: 'Gasoline',
        amount: -4000, // $40.00 in cents (negative for expenses)
        category: 'Transportation',
      },
      {
        userId: 1,
        date: new Date('2024-02-23'),
        description: 'Salary',
        amount: 200000, // $2000.00 in cents (positive for income)
        category: 'Income',
      },
      {
        userId: 1,
        date: new Date('2024-02-22'),
        description: 'Wingstop',
        amount: -7520, // $75.20 in cents (negative for expenses)
        category: 'Food',
      },
      {
        userId: 1,
        date: new Date('2024-02-20'),
        description: 'Freelance Project',
        amount: 120000, // $1200.00 in cents (positive for income)
        category: 'Income',
      },
    ]
  })
  console.log({ insertedUser, insertedTransactions })
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