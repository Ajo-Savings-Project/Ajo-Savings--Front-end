import { useEffect } from "react";
import Add from "../../assets/dashboard/add.png"
import Wallet from "../../assets/dashboard/account_balance_wallet.png"
import Send from "../../assets/dashboard/Send.png"
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getGlobalSavings } from "../../slices/getGlobalWalletSlice";

// import React from 'react'
interface Props {
  showModal: () => void
}
const GlobalWallet = ({ showModal }: Props) => {
  const dispatch = useAppDispatch()
  const { globalSavings } = useAppSelector((state) => state.globalSavings)

  useEffect(() => {
    async function fetch() {
      await dispatch(getGlobalSavings()).unwrap()
    }

    fetch()
  }, [dispatch])
  return (

    <div className="inline-flex flex-col items-start gap-[8px] p-[16px] relative flex-[0_0_auto] bg-cyan-500 rounded-[16px] border border-solid border-grey-200 shadow-bottom-card-shadow-light">
      <div className="inline-flex items-center gap-[213px] relative flex-[0_0_auto]">
        <div className="!relative !w-[32px] !h-[32px]" color="white" />
      </div>
      <div className="inline-flex flex-col items-start justify-center gap-[4px] relative flex-[0_0_auto]">
        <img alt="Add" src={Wallet} />
        <div className="relative w-fit mt-[-1.00px] font-button-semi-bold-14 font-[number:var(--button-semi-bold-14-font-weight)] text-white text-[length:var(--button-semi-bold-14-font-size)] text-center tracking-[var(--button-semi-bold-14-letter-spacing)] leading-[var(--button-semi-bold-14-line-height)] whitespace-nowrap [font-style:var(--button-semi-bold-14-font-style)]">
          Global Wallet
        </div>
        <div className="relative w-fit [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[24px] text-center tracking-[0.12px] leading-[20px] whitespace-nowrap">
          ₦ {globalSavings.total_amount}
        </div>
      </div>
      <div className="flex w-[260px] items-center justify-between cursor-pointer" >

        <div className="inline-flex hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out items-start gap-[8px] px-[8px] py-[4px] relative flex-[0_0_auto] bg-cyan-600 rounded-[16px]" onClick={() => showModal()}>
          <img className="relative w-[24px] h-[24px]" alt="Add" src={Add} />

          <div className="relative w-fit mt-[-1.00px] font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-white text-[length:var(--text-md-medium-font-size)] text-center tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] whitespace-nowrap [font-style:var(--text-md-medium-font-style)]">
            Deposit
          </div>
        </div>

        <div className="inline-flex items-start hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out gap-[8px] px-[8px] py-[4px] relative flex-[0_0_auto] rounded-[16px] border border-solid border-white">
          <img className="relative w-[24px] h-[24.38px]" alt="Send" src={Send} />
          <div className="relative w-fit mt-[-1.00px] font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-white text-[length:var(--text-md-medium-font-size)] text-center tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] whitespace-nowrap [font-style:var(--text-md-medium-font-style)]">
            Withdraw
          </div>
        </div>
      </div>

    </div>


  )
}

export default GlobalWallet