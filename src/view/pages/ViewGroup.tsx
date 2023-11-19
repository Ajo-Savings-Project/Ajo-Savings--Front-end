import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/httpService";
import ViewGroupHeader from "../../components/ViewGroupHeader";
import GroupInfo from "../../components/GroupInfo";
import GroupPerformance from "../../components/GroupPerformance";
import cover from "../../assets/groupPic1.svg";
import JoinGroupModal from "../../components/JoinGroupModal";
import { useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";


interface Group_transactions {
  transaction_id: string;
  date_initiated: Date;
  contributors_id: string;
  amount: number;
  transaction_type: string;
}
interface Members {
  member_id: string;
  name: string;
  amount_contributed: number;
  amount_withdrawn: number;
}
export interface GroupData {
  id: string;
  title: string; //group name
  description: string; //purpose and goals
  admin_id: string;
  group_image: string;
  contribution_amount: number; //contribution amount
  amount_contributed: number;
  duration: string;
  group_transactions: Group_transactions;
  amount_withdrawn: number;
  members: Members[];
  number_of_participants: number; //number of participants
  frequency: string; //ft
  startDate: Date; //start date
  endDate: Date; //end date
  created_at: Date;
}









const ViewGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const { Group } = useAppSelector((state) => state.groups);
  console.log(Group)


  const [groupInfo, setGroupInfo] = useState<GroupData | null>(null);


  const { id } = useParams();


  const fetchFromExploreGroup = async () => {



    try {
      const { data } = await axios.get(`/groups/getsinglegroup/${id}`);
  
      console.log("singledataMe", data.data);

  
      return setGroupInfo(data.data); // Update the state with fetched data
  
  
      console.log({groupInfo});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
  
  useEffect(() => {
    fetchFromExploreGroup();
  });
  




  const handleShow = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="mr-16 ml-4 mb-14">
      <ViewGroupHeader
        setShowModal={setShowModal}
        groupTitle={groupInfo?.title || "Default Title"}
        groupDescription={groupInfo?.description || "Default Description"}
      />

      {/* <div
      // style={{ backgroundImage: `url(${cover})` }}
      // className="w-full h-[260px] bg-cover bg-top"
      ></div> */}

      <div className="mb-6">
        <img className="hidden md:inline" src={groupInfo?.group_image} alt="" />
        <img className=" md:hidden w-full  " src={cover} alt="" />

        <p className="mt-5 text-base text-gray-500 font-normal tracking-wide ">
        {groupInfo?.description || "Default Title"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <GroupInfo />
        <GroupPerformance />
      </div>

      <JoinGroupModal visible={showModal} onClose={handleShow} />
    </div>
  );
};

export default ViewGroup;
