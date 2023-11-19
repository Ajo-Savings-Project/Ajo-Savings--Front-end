/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { imageData } from "../utils/constants";
import ProgressBar from "./ProgressBar";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getTargetInfo } from "../slices/targetSlice";
import { Target } from "./Target";
import { Link } from "react-router-dom";


export interface SavingsCardProps {
  category: string;
  target: string;
  total_amount_saved: number;
  total_amount: number;
  key?: string | number;
  id: string;
}

const SavingsCard: React.FC<SavingsCardProps> = ({
  id,
  category,
  target,
  total_amount_saved,
  total_amount,
  key,
}) => {
  const percentageSaved = ((total_amount_saved / total_amount) * 100).toFixed(
    2
  );

  return (
    <div className="pt-5" key={key}>
      <div className="pb-4">
        <Link to={`/dashboard/singleTarget/${id}`}>
          <div className="pt-3 pr-3 pb-3 pl-3 bg-white gap-6">
            <div className="flex justify-between pb-4 w-237.5 h-24.75">
              <div className="flex justify-between w-124.2 h-24.75 pr-14.25 gap-10">
                <div className="w-32.75 h-24.75 rounded-2 pr-0">
                  <img
                    src={imageData[category]}
                    className="h-32 w-32"
                    alt={category}
                  />
                </div>
                <div className="gap-2.5 w-67.75 h-22 pr-80">
                  <p className="">
                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] leading-none text-cyan-500">
                      {category}
                    </span>
                  </p>
                  <h1>{target}</h1>
                  <h4>
                    ₦{total_amount_saved} / ₦{total_amount}
                  </h4>
                </div>
              </div>
              <div>{percentageSaved}%</div>
            </div>
            <ProgressBar percentage={+percentageSaved} />
          </div>
        </Link>
      </div>
    </div>
  );
};

interface Props {
  children?: React.ReactNode;
  type?: string;
  value?: string | any;
  placeholder?: string;
  className?: string;
  checked?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddTarget: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { targets } = useAppSelector((state) => state.targets);
  console.log("TARGETS", targets);

  useEffect(() => {
    dispatch(getTargetInfo());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="bg-gray-50 h-screen pl-7 pb-5 pr-32 pt-5">
        <div className="pt-6 flex justify-between w-250 h-11.25">
          <h1 className="text-black font-bold">My Goals</h1>
          <h3 className="text-cyan-600 cursor-pointer hover:bg-cyan-500 hover:rounded-full hover:p-1 hover:text-white hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out" onClick={openModal}>
            Add New Goal
          </h3>
        </div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <Target onClose={closeModal} />
          </div>
        )}
        {/* {Datar.map((item: { category: string; target: string; total_amount_saved: string; total_amount: string; }, index: React.Key | null | undefined) => ( */}
       
        {targets.map((item, index) => (
           <div className="hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
          <SavingsCard
            id={item.id}
            key={index}
            category={item.category}
            target={item.target}
            total_amount_saved={item.amount_saved}
            total_amount={item.target_amount}
          // total_amount_saved={item.total_amount_saved}
          // total_amount={item.total_amount}
          />
          </div>
        ))}
      </div>
    </>
  );
};

