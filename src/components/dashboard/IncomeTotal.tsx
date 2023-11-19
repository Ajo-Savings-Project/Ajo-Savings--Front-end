
import axios from "../../api/httpService";
import { useEffect, useState } from "react";
import Linechart from "./Linechart";
import { toast } from "react-toastify";


const TotalIncome = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([]);

  interface User {
    id: string;
  }



 const fetchMonthlyIncome = async () => {
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      const mainUser: User = JSON.parse(userString);

        const userId = mainUser.id;

        const { data } = await axios.get(`/users/totalincomepermonth/${userId}`);
        console.log("data", data);

        setMonthlyIncome(data.monthlyIncomes);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return toast.error(error.response.data);
      }
      if (error.request) {
        return toast.error("Network Error");
      }
      if (error.message) {
        return toast.error(error.message);
      }


    }
  }

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);


  return (
    <div className="mb-[50px] inline-flex  flex-col items-start gap-[24px] p-[24px] bg-gray-300 relative flex-[0_0_auto] ">
      <div className="flex items-center justify-between self-stretch  relative flex-[0_0_auto]">
        <div className="inline-flex items-center px-[4px] py-[2px] bg-white rounded-[8px] border border-solid border-grey-500 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px]  [font-family:'Inter-Medium',Helvetica] font-medium text-slate-600 text-[14px] tracking-[0.07px] leading-[normal]">
            Last 12 Months
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start gap-[6.5px] relative flex-[0_0_auto]">
          <div className="inline-flex items-start gap-[6.5px] relative flex-[0_0_auto]">
            <div className="inline-flex flex-col h-[175.5px] items-start justify-between relative flex-[0_0_auto]">
              <div className="relative w-[585px] h-px bg-[#e5e7eb]" />
              <div className="relative w-[585px] h-px bg-[#e5e7eb]" />
              <div className="relative w-[585px] h-px bg-[#e5e7eb]" />
              <div className="relative w-[585px] h-px bg-[#e5e7eb]" />
              <div className="relative w-[585px] h-px bg-[#e5e7eb]" />
              <div className="relative w-[585px] h-px mb-[-0.35px] bg-[#e5e7eb]" />
            <Linechart
            info={monthlyIncome}
            xKey="month"
            yKey="totalIncome"
            width="100%"
            // height={175.5}
            height={200.5}
            />             
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TotalIncome;

