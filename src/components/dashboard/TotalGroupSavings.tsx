
import Add from "../../assets/dashboard/add.png";
import Group from "../../assets/dashboard/group.png";
import AddMoneyModal from "../AddMoneyModal";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getGroupSavings } from "../../slices/groupSavingSlice";




const GroupSavings = () => {
  const dispatch = useAppDispatch()
  // const { data } = useAppSelector((state) => state.payment)
  const { groupSavings } = useAppSelector((state) => state.groupSavings)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    async function fetch(){
     await  dispatch(getGroupSavings()).unwrap()
    }
   
   fetch
  }, [dispatch])
  return (
    <div className="inline-flex flex-col items-start gap-[8px] pl-[16px] pr-[8px] py-[16px] relative flex-[0_0_auto] bg-white rounded-[16px] border border-solid border-grey-200 shadow-bottom-card-shadow-light">
      <div className="inline-flex items-center gap-[213px] relative flex-[0_0_auto]">
        <img className="relative w-[32px] h-[32px]" alt="Group" src={Group} />
      </div>
      <div className="inline-flex flex-col items-start justify-center gap-[4px] relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
          Total Group Savings Wallet
        </div>

        <div className="relative w-fit [font-family:'Inter-SemiBold',Helvetica] font-semibold text-main-text text-[24px] text-center tracking-[0.12px] leading-[20px] whitespace-nowrap">  ₦ {groupSavings.total_amount}</div>

      </div>

      <div
        className="flex items-center hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out justify-between pl-[16px] pr-[32px] py-[4px] relative self-stretch w-full flex-[0_0_auto] bg-cyan-600 rounded-[16px]"
        onClick={() => setShowModal(!showModal)}
        style={{ cursor: 'pointer' }}
      >
        <img className="relative w-[24px] h-[24px]" alt="Add" src={Add} />
        <div className="relative w-fit mt-[-1.00px] font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-white text-[length:var(--text-md-medium-font-size)] text-center tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] whitespace-nowrap [font-style:var(--text-md-medium-font-style)]">
          Add money
        </div>
      </div>

      {/* Render the AddMoneyModal component conditionally */}
      {/* {isModalOpen && <AddMoneyModal amount={''} closeModal={closeGroupSavingsModal} />} */}
      {showModal && <AddMoneyModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default GroupSavings;
