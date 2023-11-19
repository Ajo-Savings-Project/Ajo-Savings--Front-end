import React, { useState } from 'react';
import { Input } from '../components/Input';
import { ButtonBig } from '../components/Button';
import { toast } from 'react-toastify';
import axios from '../api/httpService';
import { getPersonalSavings } from '../slices/personalSavingsSlice';
import {getGlobalSavings} from "../slices/getGlobalWalletSlice"
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../store/hooks';

interface Props {
    //   amount: number | string;
    closeModal?: () => void;
}

const AddMoneyModal: React.FC<Props> = ({ closeModal }) => {
    const [amount, setAmount] = useState(0);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setAmount(value);
    };
const dispatch = useAppDispatch()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const endpoint = "/groups/add-money/total-personal-savings";

        try {
             await axios.post(endpoint, {
                amount,
            });
     
           
                toast.success('Money added successfully');
               
                await dispatch(getGlobalSavings()).unwrap()
                await dispatch(getPersonalSavings()).unwrap()
                closeModal && closeModal()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                console.log(error.response)
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
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50 z-20">
            <div className="bg-white pr-[32px] pl-[40px] mb-20 box-border inline-flex flex-col rounded-lg shadow-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer bg-gray-200 p-2 rounded-full"
                    onClick={closeModal}
                >
                    X
                </button>

                <h1 className="text-[24px] font-[700] mt-[32px] px-[40px]">Access Your Wallet</h1>
                <form onSubmit={handleSubmit}>
                    <h2 className="font-[600] text-[16px] mt-[1rem] pb-[8px]">Amount</h2>
                    <Input
                        type="number"
                        placeholder="Type the amount"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                    <div className="py-[32px]">
                        <ButtonBig className="bg-[#088AB2] w-[320px] text-white">
                            Submit
                        </ButtonBig>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMoneyModal;