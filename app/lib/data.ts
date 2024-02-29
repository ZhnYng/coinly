import { transactions } from "../lib/placeholder-data"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function fetchMonthlyTransactions(
  month: string,
  year: string
){
  try {
    // Convert month to zero-based index (January is 0)
    const targetMonth = new Date(parseInt(year), parseInt(month) - 1);
    const nextMonth = new Date(new Date(parseInt(year), parseInt(month) - 1).setMonth(parseInt(month)))
  
    const filteredTransactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: targetMonth,
          lt: nextMonth
        }
      },
      orderBy: {
        date: "desc"
      }
    })
    return filteredTransactions;
  } catch (err) {
    return err
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
  
    const net = await prisma.transaction.groupBy({
      by: ['userId'],
      where: {
        date: {
          gte: targetMonth,
          lt: nextMonth
        }
      },
      _sum: {
        amount: true
      }
    })
  
    return net[0]._sum.amount
  } catch (err) {
    return '0'
  }
}