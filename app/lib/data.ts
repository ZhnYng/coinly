import { auth } from "@/auth";
import { transactions } from "../lib/placeholder-data"
import { prisma } from "./_base";

export async function fetchMonthlyTransactions(
  month: string,
  year: string
){
  try {
    // Convert month to zero-based index (January is 0)
    const targetMonth = new Date(parseInt(year), parseInt(month) - 1);
    const nextMonth = new Date(new Date(parseInt(year), parseInt(month) - 1).setMonth(parseInt(month)))
  
    const session = await auth();
    if(session?.user?.email){
      const user = await prisma.user.findFirst({
        where: {
          email: session?.user?.email,
        },
        select: {
          id: true
        }
      })

      const filteredTransactions = await prisma.transaction.findMany({
        where: {
          date: {
            gte: targetMonth,
            lt: nextMonth
          },
          userId: user?.id
        },
        orderBy: {
          date: "desc"
        }
      })
      return filteredTransactions;
    }
  } catch (err) {
    return []
  }
}

export async function fetchMonthNet(
  month: string,
  year: string
){
  try {
    // Convert month to zero-based index (January is 0)
    const targetMonth = new Date(parseInt(year), parseInt(month) - 1);
    const nextMonth = new Date(new Date(parseInt(year), parseInt(month) - 1).setMonth(parseInt(month)))
  
    const session = await auth();
    if(session?.user?.email){
      const user = await prisma.user.findFirst({
        where: {
          email: session?.user?.email,
        },
        select: {
          id: true
        }
      })
      
      const net = await prisma.transaction.groupBy({
        by: ['userId'],
        where: {
          date: {
            gte: targetMonth,
            lt: nextMonth
          },
          userId: user?.id,
        },
        _sum: {
          amount: true
        }
      })
      
      return net[0]._sum.amount
    }
  
  } catch (err) {
    return 0
  }
}