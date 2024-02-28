import { PiggyBank } from "lucide-react";
import Pagination from "./pagination";

export default function TransactionHeader(){
  return (
    <div className="rounded-b-3xl w-screen bg-green-600 p-3">
      <div className="flex justify-between items-center">
        <PiggyBank size='30' className="w-20" />
        <div className="flex w-1/3 justify-between items-center">
          <Pagination />
        </div>
        <select name="cars" id="cars" className="bg-inherit text-white text-lg w-20">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div>
        <h4 className="font-bold text-center mt-3 text-lg">
          Remaining: $40.00
        </h4>
      </div>
    </div>
  )
}