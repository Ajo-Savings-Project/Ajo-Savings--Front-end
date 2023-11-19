/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import { MySetDate } from "./MySetDate";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store/hooks";
import { createTarget } from "../slices/targetSlice";
import { ModalFade } from "./Modal";
interface Props {
  type?: string;
  value?: string | any;
  placeholder?: string;
  className?: string;
  checked?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onClose?: () => void;
}

interface AddTargetProps {
  className?: string;
  onClose: () => void;
}

interface CreateTargetInput {
  target: string;
  category: string;
  target_amount: string;
  frequency: string;
  startDate: string;
  endDate: string;
}
export const MyInput: React.FC<Props> = ({
  name,
  type,
  required,
  className,
  ...rest
}) => {

  return (
    <>
      <input
        className={` peer mt-1 block w-80 px-4 
        py-3 border border-slate-400 rounded-md text-sm shadow-sm placeholder:slate-400 
        focus:outline-none focus:border-cyan-500 disabled:shadow-none
        focus:ring-1 focus:ring-cyan-500 disabled:bg-slate-50  disabled:text-slate-500
        disabled:border-slate-200 disabled:shadow-slate-500 invalid:border-pink-500
        invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${className}`}
        type={type}
        name={name}
        {...rest}
        required={required}
      />

    </>
  );
};

const initialState = {
  target: '',
  category: '',
  target_amount: '',
  frequency: '',
  startDate: '',
  endDate: ''
}

function validatePayload(payload: CreateTargetInput) {
  const errors: Partial<Record<keyof CreateTargetInput, string>> = {};

  if (!payload.target) {
    errors.target = "Target is required.";
  }

  if (!payload.category) {
    errors.category = "Category is required.";
  }

  if (!payload.target_amount) {
    errors.target_amount = "Target amount is required.";
  } else if (isNaN(+payload.target_amount)) {
    errors.target_amount = "Target amount must be a number.";
  }

  // Add more validation rules as needed

  return errors;
}

export const Target: React.FC<AddTargetProps> = ({
  className = "",
  onClose,
  ...rest
}) => {

  const [createTargetInput, setCreateTargetInput] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateTargetInput({
      ...createTargetInput,
      [name]: value
    });
  }

  const handleCreateTarget = async () => {
    try {
      const errors = validatePayload(createTargetInput);

      // Check if there are validation errors
      if (Object.keys(errors).length > 0) {
        // Display validation errors using react-toastify
        Object.values(errors).forEach((error) => {
          toast.error(error);
        });
        // Handle the validation errors here (e.g., prevent the request)
        return
      }
      setLoading(true)
      const payload = {
        target: createTargetInput.target,
        category: createTargetInput.category,
        target_amount: createTargetInput.target_amount,
        frequency: createTargetInput.frequency,
        startDate: createTargetInput.startDate,
        endDate: createTargetInput.endDate,
        name: createTargetInput.target,
      }

      await dispatch(createTarget(payload)).unwrap()
      setCreateTargetInput(initialState);
      // setPassword("");
      setLoading(false);
      onClose()
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message)
      } else if (error.request) {
        toast.error(`Internal Server Error`)
      } else {
        toast.error(`Error, ${error.message}`)
      }
    }
  }
  return (
    <ModalFade className="" >
      <div
        className={` rounded-4 flex justify-center items-center ${className}`}
        {...rest}
      >
        <div
          className={`bg-white p-4 rounded-lg shadow-lg max-w-md w-full ${className}`}
        >
          <div className="w-80 pl-6 ml-9">
            <div className="text-center pt-4">
              <h2 className="text-lg font-semibold mb-4">Set a Target</h2>
              <p className="pb-8">
                Create and track multiple saving goals to achieve your financial
                target
              </p>
            </div>

            <div className="pb-2">
              <label className="block mb-1">Target</label>
              <MyInput
                type="text"
                placeholder="Target"
                className=" w-full p-2 border border-gray-300 rounded-md mb-3"
                onChange={(e) => { handleInputChange(e) }}
                value={createTargetInput.target}
                name='target'
              />
            </div>

            <div className="pb-4">
              <label className="block mb-1">Category</label>
              <select
                className="peer mt-1 block text-gray-400 w-full px-4
        py-3 border border-slate-400 rounded-md text-sm shadow-sm placeholder:slate-400 
        focus:outline-none focus:border-cyan-500 disabled:shadow-none
        focus:ring-1 focus:ring-cyan-500 disabled:bg-slate-50  disabled:text-slate-500
        disabled:border-slate-200 disabled:shadow-slate-500 invalid:border-pink-500
        invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                onChange={(e) => { handleInputChange(e) }}
                value={createTargetInput.category}
                name='category'
              >
                <option value="default">Choose a category</option>

                <option>Travel</option>
                <option>Dream_Car</option>
                <option>Dream_Home</option>
                <option>Rent</option>
                <option>Gadgets</option>
                <option>Other</option>
              </select>

            </div>

            <div className="pb-2">
              <label className="block mb-1">Target Amount</label>
              <MyInput
                type="number"
                placeholder="Target Amount"
                className="w-full p-2 border border-gray-300 rounded-md mb-3"
                onChange={(e) => { handleInputChange(e) }}
                value={createTargetInput.target_amount}
                name='target_amount'
              />
            </div>

            <div className="pb-4">
              <label className="block mb-1">Frequency</label>
              <select
                className="peer mt-1 block text-gray-400 w-full px-4
        py-3 border border-slate-400 rounded-md text-sm shadow-sm placeholder:slate-400 
        focus:outline-none focus:border-cyan-500 disabled:shadow-none
        focus:ring-1 focus:ring-cyan-500 disabled:bg-slate-50  disabled:text-slate-500
        disabled:border-slate-200 disabled:shadow-slate-500 invalid:border-pink-500
        invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                onChange={(e) => { handleInputChange(e) }}
                value={createTargetInput.frequency}
                name='frequency'
              >
                <option value="default">Pick your frequency</option>

                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Annually</option>

              </select>

            </div>



            <div className="pb-2">
              <label className="block mb-1">Set a date</label>
              <MySetDate type="date" onChange={(e) => { handleInputChange(e) }}
                value={createTargetInput.startDate}
                name='startDate' />
            </div>

        
            <div className="pb-1">
              <label className="block mb-1">Withdrawal Date</label>
              <MySetDate type="date" onChange={(e) => { handleInputChange(e) }}
                value={createTargetInput.endDate}
                name='endDate' />
            </div>

            <div className="flex justify-between items-center mt-4 pb-3 gap-2">
              <button onClick={handleCreateTarget} disabled={loading} className="py-3 px-4 text-base  text-cyan-500 w-full font-semibold rounded-lg border hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1">
                {loading ? "Loading" : "Save"}
              </button>
              <button onClick={onClose} className="py-3 px-4 text-base  text-cyan-500 w-full font-semibold rounded-lg border hover:text-white hover:bg-red-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalFade>
  );
};













