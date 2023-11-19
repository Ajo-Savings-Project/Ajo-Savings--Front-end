import React from "react";
import { TransactionDetails } from "../slices/transactionSlice";
import Placeholder from "../assets/placeholder.jpeg" 

interface Props {
  transaction: TransactionDetails
}

const TransactionCard: React.FC<Props> = ({transaction}) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md mb-4 mt-5">
      <div className="grid grid-cols-7 gap-4">
        <div className="w-1/2">
        <img src={Placeholder} alt="Transaction" className="w-16 h-16 rounded-full" />
        </div>
        <div className=" mr-8">
          <p className="  text-black font-inter  font-medium leading-normal">
            {transaction.reciever}
          </p>
        </div>
        <div>
          <p className="text-black font-inter text-base font-medium leading-normal">
            {transaction.type}
          </p>
        </div>

        <div>
          {/* <p className="text-black font-inter text-base font-medium leading-normal">
            {transaction.created_at}
          </p> */}
        </div>
        <div>
          {/* <p className="text-black font-inter text-base font-medium leading-normal">
            {time}
          </p> */}
        </div>
        <div>
          <p className="text-black font-inter text-base font-medium leading-normal">
          ₦{transaction.amount}
          </p>
        </div>
        <div>
          {/* <p
            className={`${
              transactionStatus?.toLowerCase() === "received" ? "text-green-500" : "text-red-500"
            } font-inter text-base font-medium leading-normal  `}
          >
            {transaction.}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
