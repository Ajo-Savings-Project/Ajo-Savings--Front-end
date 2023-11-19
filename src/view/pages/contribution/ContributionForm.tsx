/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import axios from "../../../api/httpService";
import { useParams } from 'react-router-dom';
// import { useAppDispatch } from '../../../store/hooks';
// import { contributeToGroup } from '../../../slices/contributeSlice';


// const dispatch = useAppDispatch;
interface ContributionFormProps {
  visible: boolean;
  onClose: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ visible, onClose }) => {


  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams()

  if (!visible) return null;



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const payload = {
        amount: Number(amount)
      }

      const response = await axios.post(`/groups/contribute/${id}`, payload);
      console.log(response)
      setLoading(false);
      toast.success(response.data.message);
      onClose()
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
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

  return (
    <div className="fixed inset-0 items-center flex flex-col my-7 w-full md:mt-[80px] h-screen">
      <form onSubmit={handleSubmit} className="p-8 mt-4 bg-white rounded-lg shadow-lg w-96 h-1/2 md:mt-4">
        <button onClick={onClose} className='ml-72'>X</button>
        <p className="text-[#101828] text-[20px] font-[600] font-Inter mb-[2rem]">
          Groups Contribution
        </p>
        <p className="text-gray-700 text-[16px] font-[600] font-Inter mb-[2rem]">
          Add to your Savings
        </p>

        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2 text-sm font-bold text-gray-700">
            Contribution Amount (₦)
          </label>
          <input
            type="number"
            className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400] md:h-[46px] md:w-[320px] rounded border md:pl-7 rounded-lg w-full"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#088AB2] py-[12px] px-[16px] w-[320px] rounded text-white text-[16px] font-[500] font-Inter"
          disabled={loading}
        >
          {loading ? 'Loading' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ContributionForm;









