/* eslint-disable @typescript-eslint/no-explicit-any */

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import Divider from "./Divider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTransactionInfo } from "../../slices/transactionSlice";

const TransactionHistory = () => {

  const dispatch = useAppDispatch()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { transactions }:any = useAppSelector((state) => state.transaction)


  useEffect(() => {
    dispatch(getTransactionInfo())

  }, [dispatch])







  return (


    <div className="inline-flex flex-col items-start gap-[16px] p-[16px] relative flex-[0_0_auto]">
      <div className="flex w-[617px] items-start justify-between relative flex-[0_0_auto]">
        <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-main-text text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
          TRANSACTION HISTORY
        </div>
        <div className="inline-flex items-start gap-[16px] relative flex-[0_0_auto]">
          <div className="inline-flex items-start gap-[10px] px-[4px] py-0 border-b [border-bottom-style:solid] border-blue-1 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-blue-1 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
            
            </div>
          </div>
          <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
          
          </div>
          <a href="/dashboard/transactions">
          <div className="relative hover:text-lg hover:scale-105 transition-transform duration-300 ease-in-out w-fit mt-[-1.00px] hover:text-cyan-500 font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
            More
          </div>
          </a>
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[9px] relative flex-[0_0_auto]">
        {/* <div className="inline-flex items-center gap-[200px] relative flex-[0_0_auto]"> */}
          <div className="inline-flex items-start gap-[150px] relative flex-[0_0_auto]">
          {/* <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
            Receiver
          </div> */}
            <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
              Type
            </div>
            <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
              Date
            </div>
            <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
              Amount
            </div>
            <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-500 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
              Status
            </div>
          </div>
        {/* </div> */}
        
        {transactions?.slice(0, 7)?.map((item: { type: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; created_at: { toLocaleString: () => string | any[]; }; amount: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
          <div
            key={index}>
            <div className="inline-flex items-start relative flex-[0_0_auto]">
              {/* <div className="relative w-[100px] mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                {item.reciever}
              </div> */}
              <div className="inline-flex items-end gap-[60px] relative flex-[0_0_auto]">
                <div className="relative w-[110px] mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                  {item.type}
                </div>
                <div className="relative w-[100px] mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                  {item.created_at.toLocaleString().slice(0, 10)}
                </div>
                <div className="relative ml-[20px] w-[20px] mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                  ₦{item.amount}
                </div>
                <div className={`relative px-2 py-2 bg-yellow-500 ${item.status === 'Successful' ? 'bg-[#008000] w-[50px] text-white rounded-lg' : 'bg-[#AD2A1A] text-white w-[30px] rounded-lg'} w-fit ml-[100px] mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]`}>
                  {item.status}
                </div>
              </div>
            </div>
            <Divider className="!w-[627px] mt-2 !relative" darkmode={false} />
          </div>
        ))}


      </div>
    </div>
  )
}
export default TransactionHistory