/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { ButtonSmall } from "./Button";

interface Prop {
  setShowModal: any;
  groupDescription: string;
  groupTitle:string
}

const ViewGroupHeader = ({ setShowModal,groupTitle}: Prop) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="w-[480px] flex items-center md:block ">
        <h1 className="text-3xl font-bold leading-10 md:mb-3 ">
          {groupTitle}
        </h1>

        <div className=" hidden w-full md:flex bg-white w-80 items-center bg-opacity-90">
          <span className="m-3 text-sm font-medium leading-5">
            {/* {groupTitle} */}
            Active Savings Group
          </span>
          <HiChevronRight className=" text-neutral-500" />
          <span className="m-3 text-sm font-medium leading-5">
            Explore Groups
          </span>
          <HiChevronRight className=" text-neutral-500" />
          <span className="m-3 text-sm font-medium leading-5 text-neutral-500">
            {groupTitle}
          </span>
        </div>
      </div>

      <ButtonSmall
        children="Join"
        className="bg-cyan-600 text-white rounded-lg px-[50px] py-4 ml-4"
        onClick={() => setShowModal((prev: any) => !prev)}
      />
    </div>
  );
};

export default ViewGroupHeader;
