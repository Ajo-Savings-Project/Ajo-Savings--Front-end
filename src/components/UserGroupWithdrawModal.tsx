import { useState } from "react";
import { ButtonSmall } from "./Button";
import { useAppDispatch } from "../store/hooks";
import { withdrawFromGroup } from "../slices/internalFundingSlice";

interface Prop {
  visible: boolean;
  onClose: any;
}

const UserGroupWithdrawModal = ({ visible, onClose }: Prop) => {
  const [amount, setAmount] = useState("");
  const dispatch = useAppDispatch();

  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  const handleSubmit = () => {
    try {
      const payload = {
        amount,
      };

      dispatch(withdrawFromGroup(payload));
    } catch (error) {
      console.log(error);
    }
    console.log(amount);
    setAmount("");
    onClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      id="container"
      onClick={handleClose}
    >
      <div className="relative w-[474px] h-[270px] bg-white px-[16px] pt-[24px] pb-[32px] flex flex-col justify-center items-center text-center rounded-lg ">
        <h1 className="text-[24px] text-[#101828] font-bold font-[Inter] font-not-italic my-[32px]">
          Withdraw from your Group Wallet
        </h1>
        <div className="mx-[20px] ">
          <div className=" text-start pb-[12px]">
            <span className="text-[16px] text-[#101828] font-semibold font-[Inter] font-not-italic  leading-[22px] pb-[12px]">
              Amount to Withdraw
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
              className="min-w-full md:w-[320px] py-[12px] px-[16px] rounded-[8px] border-[#D0D5DD] bg-[#FFF] border-2 focus:outline-none mb-3"
            />
          </div>
          <ButtonSmall
            children={"Cancel"}
            className="cursor-pointer text-gray-700 ml-3 hover:bg-gray-300 w-2/5"
            onClick={onClose}
          />

          <ButtonSmall
            children={"Submit"}
            className="bg-cyan-600 text-white ml-4 w-2/5"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserGroupWithdrawModal;
