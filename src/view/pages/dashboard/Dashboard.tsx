import React, { useEffect, useState } from "react";
// import UpcomingActivities from "../../../components/dashboard/UpcomingActivities";
import TotalIncome from "../../../components/dashboard/IncomeTotal";
import SafeLock from "../../../components/dashboard/SafeLock";
import PersonalSavings from "../../../components/dashboard/TotalPersonalSavings";
import GroupSavings from "../../../components/dashboard/TotalGroupSavings";
import GlobalWallet from "../../../components/dashboard/GlobalWallet";
import TransactionHistory from "../../../components/dashboard/TransactionHistory";
import { useAppDispatch } from "../../../store/hooks";
import { initiatePayment } from "../../../slices/paymentSlice";
import Calender from "../../../assets/dashboard/Emoji.png";
import MyGoals from "../../../components/dashboard/MyGoals";
import Header from "../../../components/header/Header";
import { ModalForPayment } from "../../../components/Modal";
import { getGroupSavings } from "../../../slices/groupSavingSlice";

import { toast } from "react-toastify";
import UserGroupWithdrawModal from "../../../components/UserGroupWithdrawModal";
import UserSavingsWithdrawModal from "../../../components/UserSavingsWithdrawModal";

// import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  // const navigate = useNavigate()
  const dispatch = useAppDispatch();
  // const { data } = useAppSelector((state) => state.payment)
  // const { groupSavings } = useAppSelector((state) => state.groupSavings)

  // const userEmail = localStorage.getItem("user")
  const [showModal, setShowModal] = useState(false);
  const userName = localStorage.getItem("user");
  const parseUserName = userName ? JSON.parse(userName) : null;
  const [amount, setAmount] = useState("");
  const [depositLoading, setDepositLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getGroupSavings());
  }, [dispatch]);

  // console.log(totalSavings)

  const handleSubmit = async () => {
    try {
      if (!amount) {
        toast.error("please enter your amount");
        return;
      }
      setDepositLoading(true);
      const payload = {
        email: parseUserName.email,
        amount,
      };
      await dispatch(initiatePayment(payload)).unwrap();
      setDepositLoading(false);
      setAmount("");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setDepositLoading(false);
      if (error.response) {
        console.log(error.response);
        return toast.error(error.response.data.message);
      }
      if (error.request) {
        return toast.error("Network Error");
      }
      if (error.message) {
        return toast.error(error.message);
      }
    }
  };
  const currentDate = new Date();

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <div className="md:flex md:flex-row md:space-x-4 lg:space-x-8">
          <div className="md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-bold text-main-text text-xl tracking-wide leading-[1.375]">
                Welcome back{" "}
                {`${parseUserName.firstName} ${parseUserName.lastName}`},
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img className="w-4 h-4" alt="Emoji" src={Calender} />
                <div className="relative w-fit mt-[-1px] text-gray-400 whitespace-nowrap">
                  <span className=" text-gray-400 text-sm">
                    {currentDate.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 lg:w-2/3 xl:w-3/4">
              <div className="bg-gray-50 p-4 rounded-lg md:flex md:space-x-4 lg:space-x-8">
                {/* <div className="inline-flex items-center gap-[36px] px-[17px] py-[24px] relative bg-grey-50"> */}
                <GlobalWallet showModal={() => setShowModal(true)} />

                <GroupSavings setShow={setShow} />

                <PersonalSavings setShow={setVisible} />

                <SafeLock />
              </div>

              <div className="mt-2 md:flex md:space-x-4 lg:space-x-8 md:w-1/2 ">
                <TotalIncome />

                {/* <UpcomingActivities /> */}
              </div>

              <div className="mt-2 md:flex lg:flex lg:justify-between gap-3 md:space-x-4  md:w-1/2 xl:w-3/4">
                <TransactionHistory />

                <MyGoals />
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <ModalForPayment
            className="text-center"
            handleCancel={() => setShowModal(false)}
            handleSubmit={handleSubmit}
            depositLoading={depositLoading}
          >
            <h1 className="text-[24px] text-[#101828] font-bold font-[Inter] font-not-italic my-[32px]">
              Add to Your Savings
            </h1>
            <div className="mx-[20px] ">
              <div className="text-start pb-[12px]">
                <span className="text-[16px] text-[#101828] font-semibold font-[Inter] font-not-italic  leading-[22px] mb-[6px] text-start">
                  Email
                </span>
                <input
                  type="email"
                  value={parseUserName.email}
                  className=" min-w-full md:w-[320px] py-[12px] px-[10px] rounded-[8px] border-2 border-[#D0D5DD] bg-[#FFF] focus:outline-none"
                  readOnly
                />
              </div>
              <div className=" text-start pb-[12px]">
                <span className="text-[16px] text-[#101828] font-semibold font-[Inter] font-not-italic  leading-[22px] pb-[12px]">
                  Amount to Deposit
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAmount(e.target.value)
                  }
                  className="min-w-full md:w-[320px] py-[12px] px-[16px] rounded-[8px] border-[#D0D5DD] bg-[#FFF] border-2 focus:outline-none"
                />
              </div>
            </div>
          </ModalForPayment>
        )}

        <UserGroupWithdrawModal visible={show} onClose={handleShow} />
        <UserSavingsWithdrawModal visible={visible} onClose={handleVisible} />
      </div>
    </>
  );
};

export default Dashboard;
