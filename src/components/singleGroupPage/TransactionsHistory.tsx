import { useEffect, useState } from "react";
import user3 from "./user3.png"; // Corrected the import name
import { useParams } from "react-router-dom";
import axios from "../../api/httpService";
import { format } from 'date-fns'


interface Group_transactions {
  user_image: string
  date: string 
  amount: number
  time: string
  createdAt: Date
}

const TransactionsHistory = () => {



  const [transactions, setTransactions] = useState<Group_transactions[]>([])

  // const currentDate = new Date();

  const { id } = useParams();
  
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const {data} = await axios.get(`/groups/get-single-group-transactions/${id}`); // Replace with the actual endpoint URL

        console.log("transactions",data.data)
        return setTransactions(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTransactions();
  }, []);

  
  return (
    <>
      <h1 className="mt-5">Transaction History</h1>
      <section className="mt-3 border rounded-md p-3">
        {transactions.length === 0 && <p>No transaction yet</p>}
       {transactions.map((transaction: Group_transactions) => (
        <div>
        <div className="flex justify-between px-4 items-center">
          <div className="flex gap-[16px] items-center mb-[16px]">
            <div>
              <img
                src={transaction.user_image || user3}
                alt="img"
                className="w-[50px] rounded-full"
              />
            </div>
            <div>
              <p className="text-[14px] font-[600]">{format(new Date(transaction.createdAt), 'EEEE, d MMMM yyyy')}</p>
              <p className="text-[#98A2B3] text-[14px] font-[400]">
                at {format(new Date(transaction.createdAt), 'h:mm a')}
              </p>
            </div>
          </div>
          <div
            className={
              transaction.amount < 0 ? "text-[#Eb5757]" : "text-[#27ae60]"
            }
            style={{ fontSize: "16px", fontWeight: 600 }}
          >
            {transaction.amount}
          </div>
        </div>
      </div>
       ))}
          
   
      </section>
    </>
  );
};

export default TransactionsHistory;
