import React, { useEffect } from 'react';
import TransactionCard from '../../../components/TransactionCard';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { getTransactionInfo } from '../../../slices/transactionSlice';

const Transaction: React.FC = () => {

  const { transactions } = useAppSelector((state) => state.transaction);
  console.log(transactions)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getTransactionInfo())

  },[dispatch])

  return (
    <div className="mx-10 my-10">
      <div className="md:flex justify-between items-center space-x-12">
        <h1 className="text-center font-inter text-2xl font-semibold text-black">
          Transactions
        </h1>
        <h3 className="text-right font-inter text-blue-500 text-lg font-medium hover:text-shadow-md hover:text-red-500">
  Clear All
</h3>

      </div>
      <div>
        <h4 className=" mt-4">Today</h4>
      </div>
      {transactions.map((transaction, index) => (
      <TransactionCard key={index} transaction = {transaction} />
      ))}
      
      {/* <div>
       <h4 className=" mt-4"> Yesterday </h4>
       </div>
       {pastTransactions.map((transaction, index) => (
        <TransactionCard key={index} {...transaction} />
      ))} */}
    </div>
  );
};

export default Transaction;




