import { PiggyBank } from "lucide-react";
import Pagination from "./pagination";
import { fetchMonthNet } from "@/app/lib/data";
import { Suspense } from "react";

export default function TransactionHeader(){
  return (
    <>
    <div className="rounded-b-xl w-full bg-green-600 p-3 md:hidden">
      <div className="flex justify-between items-center">
        <PiggyBank size='30' className="w-20" />
        <div className="flex justify-between items-center">
          <Suspense>
            <Pagination />
          </Suspense>
        </div>
        <select name="cars" id="cars" className="bg-inherit text-white text-lg w-20">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
    </div>
    <div className="w-full p-3 hidden md:block">
      <div className="flex justify-between items-center">
        <PiggyBank size='30' className="w-20" />
        <div className="flex justify-between items-center">
          <Suspense>
            <Pagination />
          </Suspense>
        </div>
        <select name="cars" id="cars" className="bg-inherit text-white text-lg w-20">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
    </div>
    </>
  )
}