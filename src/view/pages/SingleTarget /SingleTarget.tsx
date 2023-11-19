/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuSend } from "react-icons/lu";
import WithdrawModal from "./WithdrawModal";
import FundModal from "./FundModal";
import axios from "../../../api/httpService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { formatNumberToDecimalPlace } from "../../../utils/helpers";

const SingleTarget = (): JSX.Element => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savingsData, setSavingsData] = useState<any>(null); // Define the state for savingsData
  const { id } = useParams(); // Get the id from the URL params

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/savings/get_single_target/${id}`);
      setSavingsData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Network Error");
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFundTarget = async (payload: Record<string, number>): Promise<undefined> => {
    try {
      const { data } = await axios.post(`/savings/fund_target/${id}`, payload);
      toast.success(data.message);
      await fetchData();
    } catch (error) {
      // Handle the error here, e.g., display an error message or log it.
      console.error("An error occurred while handling the fund target:", error);
      // You can also throw the error to propagate it further if needed.
      throw error;
    }
  };
  

  const handleWithdrawTarget = async (payload: Record<string, number>): Promise<undefined> => {
    try {
      const { data } = await axios.post(`/savings/withdraw_from_target/${id}`, payload);
      toast.success(data.message);
      await fetchData();
    } catch (error) {
      // Handle the error here, e.g., display an error message or log it.
      console.error("An error occurred while handling the withdrawal from target:", error);
      // You can also throw the error to propagate it further if needed.
      throw error;
    }
  };
  

  return (
    <>
      <div className="container mx-auto p-4 sm:p-8 md:p-12 lg:p-16 min-w-fit w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 mt-24 lg:mt-0">
        <div className="flex items-center ml-2 space-x-96 sm:flex-row min-w-fit sm:w-8/12 lg:w-full mx-3.5 md:w-3.5 mb-4 sm:mb-12 font-bold px-4 justify-between">
          <div className="text-black text-2xl sm:text-4xl mb-2 sm:mb-0">{savingsData?.name}</div>
          <div className="text-blue-600 cursor-pointer custom-left-align">Add a new Goal</div>
        </div>

        <div className="bg-cyan-600 rounded-lg p-8 min-w-fit mx-3.5 md:w-12/12 h-fit flex flex-col items-center">
          <div className="text-white flex mt-4 justify-between">
            <div className="ml-18 text-left">
              <p className="text-[white]">Amount Saved</p>
              <p className="text-5xl font-semibold text-[white] mr-16">{`₦${formatNumberToDecimalPlace(
                savingsData?.data?.amount_saved || 0
              )}`}</p>
            </div>
            <div className="text-left">
              <p className="text-[white]">Total Target</p>
              <p className="text-5xl font-semibold mr-16 text-[white]">{`₦${formatNumberToDecimalPlace(
                savingsData?.data?.target_amount || 0
              )}`}</p>
            </div>
            <div className="text-left">
              <p className="text-[white]">Days Left</p>
              <p className="text-5xl font-semibold text-[white]">{`${formatNumberToDecimalPlace(
                savingsData?.data?.days_left || 0
              )} days`}</p>
            </div>
          </div>
          <div>
            <div className="mb-4 flex justify-center min-w-fit mt-12">
              <button
                className="bg-white text-cyan-600 font-semibold py-3 px-6 rounded-md mr-6 flex items-center"
                onClick={() => setModalOpen(true)}
              >
                <IoMdAddCircleOutline style={{ width: "2rem", height: "1.5rem" }} />
                <span>Fund Target</span>
              </button>
              <button
                className="bg-cyan-600 text-white font-semibold py-3 px-6 rounded-md border border-white flex items-center"
                onClick={() => setWithdrawModalOpen(true)}
              >
                <LuSend style={{ width: "2rem", height: "1.5rem" }} />
                Withdraw from Wallet
              </button>
            </div>

            {/* Withdraw Modal */}
            {isWithdrawModalOpen && (
              <WithdrawModal handleWithdrawTarget={handleWithdrawTarget} close={() => setWithdrawModalOpen(false)} />
            )}
            {/* Fund Modal */}
            {isModalOpen && <FundModal handleFundTarget={handleFundTarget} close={() => setModalOpen(false)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTarget;
