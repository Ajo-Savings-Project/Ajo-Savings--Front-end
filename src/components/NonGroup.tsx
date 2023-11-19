import { useState } from "react";
import { Link } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import { ModalSuccess } from "./Modal";
// import CreateGroup from "./CreateGroup";
// import { ModalSuccess } from "./Modal";

const NonGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <>
      <div className="bg-gray-50">
        <div className=" flex justify-between items-center px-4 sm:max-w-full sm:justify-between  sm:flex sm:items-center p-10">
          <h1 className="text-center text-black sm:text-3xl text-sm font-bold font-['Inter'] leading-10 tracking-tight">
            Active Savings
          </h1>

          <Link
            to="/dashboard/exploregroups"
            className="text-center text-blue-500 text-base font-normal font-['Inter'] leading-snug tracking-tight"
          >
            Explore Groups
          </Link>
        </div>

        <div className="flex justify-center flex-col text-center items-center h-screen max-w-lg sm:mx-auto">
          <h2>You don't have any active saving group, you can </h2>
          <div>
            <div
              onClick={() => setShowModal(true)}

              className=" text-blue-500 cursor-pointer">
              Create a new group
            </div>
            or
            <Link to="/dashboard/exploregroups" className=" text-blue-500 cursor-pointer">
              Explore groups
            </Link>
          </div>
        </div>

        {showModal && (
          <CreateGroup
            handleClose={() => setShowModal(false)}
            openSuccessModal={() => setSuccess(true)}
          />
        )}
        {success && (
          <ModalSuccess handleSubmit={() => console.log("")} text="Your new savings group was successfully created. As participants join, you will be notified, and the savings will start as soon as all available slots are filled. " />
        )}
      </div>
    </>
  );
};

export default NonGroup;
