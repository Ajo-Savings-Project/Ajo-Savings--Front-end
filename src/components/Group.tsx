



import { Link } from "react-router-dom";
import dots from "../assets/groups/dots.svg";

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from "../store/hooks/index";
import { getAllGroupMember } from "../slices/getGroupMemberSlice";

import { useEffect } from "react";



const Group = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { allGroupsWithMember } = useAppSelector((state) => state.allGroupsWithMember)



  const fetchallGroupsWithMember = async () => {
    try {
      const result = await dispatch(getAllGroupMember()).unwrap()
      if (result.data.length === 0) {
        navigate("/dashboard/nongroup")
      }
      console.log(result)

    } catch (error) {
      navigate("/dashboard/nongroup")
    }

  }


  useEffect(() => {
    fetchallGroupsWithMember()
  }, [])
  

  return (
    <>



      <div className="b">

        <div className="flex justify-between items-center w-full">
          <h1 className="text-black  text-xl text-[32px] font-bold leading-10 not-italic font-[Inter] tracking-tight">
            Active Savings
          </h1>
          <div className=" flex justify-between items-center gap-[12px]">

            <Link to="/dashboard/create-group">
              <h3 className="text-cyan-600  text-xl sm:text-[16px] font-normal leading-5 not-italic font-[Inter] tracking-tight">
                Create Group
              </h3>
            </Link>

            <Link to="/dashboard/exploregroups">
              <h3 className="text-cyan-600  text-xl sm:text-[16px] font-normal leading-5 not-italic font-[Inter] tracking-tight">
                Explore Groups
              </h3>
            </Link>

          </div>

        </div>
        {
          allGroupsWithMember.map((item) => (
            <div key={item.id} className="sm:flex sm:justify-start sm:items-start md:w-[800px] lg:w-[870px] xl:w-[1100px] sm:p-[30px] sm:shadow-lg sm:mt-[30px] bg-white">
              <div className="shrink-0 ">
                <img src={item.group_image} alt="" className="w-[134px] h-[184px] mb-10" />
              </div>

              <div className="sm:ml-[30px] ">
                <div className=" flex justify-between w-full items-center px-5 lg:ml-[20px] ">
                  <div className="w-[91px] h-[47px] rounded-3xl bg-blue-100 flex justify-center items-center ">
                    <span className="text-blue-500">waiting</span>
                  </div>

                  <div className="flex  items-center space-x-20">
                    <div className="sm:flex justify-center sm:items-center lg:ml-[390px] hidden  ">
                      <img
                        src={item.group_image}
                        alt=""
                        className="h-12 w-12  object-cover rounded-full ring-2 ring-white "
                      />

                    </div>

                    <div className="  object-cover rounded-full ring-2 ring-white ms-[-15px] text-center p-2">
                      <img src={dots} alt="" />

                    </div>


                  </div>
                </div>

                <div className="lg:ml-[40px] mt-[16px] ml-[40px] sm:ml-0 md:ml-[40px]">
                  <h2 className="text-black  text-xl sm:text-[24px] font-semibold leading-8 not-italic font-[Inter] tracking-tight">

                    {item.title}
                  </h2>
                </div>

                <div className=" grid grid-cols-2 grid-rows-3 max-w-20 gap-5  sm:gap-0 sm:flex sm:justify-between sm:items-center mt-[16px] mx-[40px]">
                  <div className="w-[81px] ">
                    <p className="text-[#98A2B3]  text-xl sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      Saving
                    </p>

                    <p className="text-black  sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      {item.contribution_amount}
                    </p>
                  </div>

                  <div className=" w-[81px] ">
                    <p className="text-[#98A2B3]  text-xl sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      Withdrawal
                    </p>

                    <p className="text-black   text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      {item.amount_withdrawn}
                    </p>
                  </div>

                  <div className=" w-[111px] text-start mr-20 sm:mr-0">
                    <p className="text-[#98A2B3]  text-xl sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      Saving Freq
                    </p>

                    <p className="text-black   sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      {item.frequency}
                    </p>
                  </div>

                  <div className=" w-[65px]  ">
                    <p className="text-[#98A2B3]  text-xl sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      Duration
                    </p>

                    <p className="text-black   sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      3 mos
                    </p>
                  </div>

                  <div className=" w-[109px]  ">
                    <p className="text-[#98A2B3]  text-xl sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      Cash out Date
                    </p>

                    <p className="text-black   sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight">
                      1st of October
                    </p>
                  </div>
                </div>


                <div className="mt-[36px] mx-[40px] cursor-pointer pb-10">
                  <Link className="text-[#2F80ED]  text-xl sm:text-base font-normal leading-6 not-italic font-[Inter] tracking-tight" to={`/dashboard/singlegroup/${item.id}`}>
                    View Group
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </>
  );
};

export default Group;





