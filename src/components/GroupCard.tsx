//import React from 'react'
import { ButtonSmall } from "./Button";
import GroupdetailsTable from "./GroupdetailsTable";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import GroupCardDropdown from "./GroupCardDropdown";

import { useAppDispatch, useAppSelector } from "../store/hooks/index";
import { getAllGroups } from "../slices/getAllGroupSlice";
import { toast } from "react-toastify";
import axios from "../api/httpService";
import { AllGroupsAttributes } from "../slices/getAllGroupSlice";
import { getAllGroupMember } from "../slices/getGroupMemberSlice";
import SearchResult from "./SearchResult";


interface Prop {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowModal: any;
}

const GroupCard = ({ setShowModal }: Prop) => {
  const dispatch = useAppDispatch();
  const { allGroups } = useAppSelector((state) => state.allGroups);

  const fetchallGroups = async () => {
    try {
      const result = await dispatch(getAllGroups()).unwrap();
      return result;
    } catch (error) {
      throw new Error();
    }
  };
  useEffect(() => {
    // dispatch(getAllGroups)
    fetchallGroups();
  }, []);
  //  const handleExplore = ()=>{

  //  }

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<AllGroupsAttributes | null>(null);

  const joinGroup = async (id: string) => {
    try {
      setLoading(true);
      await axios.post(`/groups/join/${id}`);

      setShowModal(true)
      setLoading(false);
      setSelectedGroup(null);

      dispatch(getAllGroupMember)
      await fetchallGroups()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        console.log(error.response);
        toast.error(error.response.data.message);
        return
      }
      if (error.request) {
        toast.error("Network Error");
        return
      }
      if (error.message) {
        toast.error(error.message);
      }
    }
  };
  const [searchExplore, setSearchExplore] = useState('')

  return (
    <>
      <SearchResult value={searchExplore} onSearch={(e: any) => setSearchExplore(e.target.value)} />
      {allGroups.filter((item: { title: string; frequency: string; }) => {
        return searchExplore.toLocaleLowerCase() === "" ? item : item.title.toLocaleLowerCase().includes(searchExplore) ||
          "" ? item : item.frequency.toLocaleLowerCase().includes(searchExplore)
      }).map((allGroup) => (
        <div
          key={allGroup.id}
          className="p-7 bg-white flex mb-4 flex-col md:flex-row md:justify-start md:items-center md:w-[800px] lg:w-[870px] xl:w-[1100px] md:m-[30px] md:g"
        >
          <div className="md:shrink-0 ">
            <img
              src={allGroup.group_image}
              alt="group photo"
              className="md:w-[134px] md:h-[184px] mb-10  "
            />
          </div>
          <div className="group-info-container space-y-4  pt-2 sm:pt-4 md:ml-[30px]">
            <div className="flex  items-center justify-between sm:w-full  md:gap-44">
              <span className="p-2 text-sm text-blue-500 font-medium bg-blue-100 rounded-lg ">
                Waiting
              </span>

              <div className="flex items-center justify-between relative gap-20 ml-36">
                <div className="flex justify-center items-center">
                  <img
                    src={allGroup.group_image}
                    alt="image"
                    className="hidden md:flex w-12 h-12 rounded-full"
                  />
                </div>

                <ButtonSmall
                  // children="Join"
                  disabled={loading && selectedGroup?.id === allGroup.id}
                  className="bg-cyan-600 text-white ml-6 mr-10 rounded-lg"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => { setSelectedGroup(allGroup); joinGroup(allGroup.id) }}> {loading && selectedGroup?.id === allGroup.id ? "loading" : "Join"} </ButtonSmall>


                <span
                  className=" p-2 hover:bg-gray-200 hover:rounded-lg active:text-white"
                  onClick={() => { setSelectedGroup(allGroup); setIsOpen((prev) => !prev) }}
                >
                  <BsThreeDotsVertical className="" />
                </span>
                {isOpen && selectedGroup?.id === allGroup.id && <GroupCardDropdown />}
              </div>
            </div>

            <h2 className="text-2xl font-medium leading-8">{allGroup.title}</h2>
            <p className="text-base text-gray-500 font-normal tracking-wide ">
              {allGroup.description}
            </p>

            <div className="">
              <GroupdetailsTable allGroup={allGroup} />
            </div>

            <span className="text-base text-blue-500 leading-6 tracking-wide font-normal hover:underline">
              <Link to={`/dashboard/viewgroups/${allGroup.id}`}>View Group</Link>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default GroupCard;
