import { useParams } from "react-router-dom";
//  import corperimg from "./corper.jpeg";
import Contributions from "./Contributions";
import TransactionsHistory from "./TransactionsHistory";
import axios from "../../api/httpService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ContributionForm from "../../view/pages/contribution/ContributionForm";
import { formatNumberToDecimalPlace } from "../../utils/helpers";
import { format } from "date-fns";
// import { useParams } from "react-router-dom";

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

// interface Payform {
//   contribution_amount: number;
// }

const SingleGroupPage = () => {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [modal, setModal] = useState(false);
 

  // const [groupData, setGroupData] = useState({});

  const handleOnClose = () => setModal(false);

  // function setModal(arg0: boolean): void {
  //   throw new Error("Function not implemented.");
  // }

  const { id } = useParams();

  const fetchSingleGroup = async () => {
    try {
    
      const { data } = await axios.get(`/groups/getsinglegroup/${id}`);

      console.log("singledata", data?.data);

      return setGroupData(data?.data); // Update the state with fetched data

      // console.log( groupData.group.title);

      // console.log({groupData});
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return toast.error(error.response.data?.message);
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
    fetchSingleGroup();
  }, []);

  //  console.log("gr"+ groupData.group.title);

  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mt-8  px-10">
      <div className="flex flex-col justify-between gap-4 text-center md:text-left md:flex-row md:gap-8">
        <div className=" w-[30%] ">
          <h1 className="text-[38px]  font-bold mb-4 text-[#000]">
            {groupData?.title || "Default Title"}
          </h1>
          <div className="bg-white h-10 pt-2 rounded-md">
            <span className="font-[600] mx-4 text-center text-[14px]">
              Active Savings Group
            </span>
            <span className="text-[#64748B] ">&gt;</span>
            <span className=" mx-4 text-[#64748B] text-[14px]">
              {groupData?.title || "Default Title"}
            </span>
          </div>
        </div>
        <div>
          <div className="">
            <h2 className="text-[#101828] text-[16px] mb-[16px]">
              {`${format(new Date(), "MMMM").toUpperCase()} CONTRIBUTION `}
            </h2>
            <p className="text-[#101828] text-[14px] font-[300]">
              {formattedDate}
            </p>
            <p className="font-bold text-[#101828] mb-[16px] text-[24px]">
              {`₦${
                formatNumberToDecimalPlace(
                  Number(groupData?.contribution_amount),
                  2
                ) || "0"
              }`}
            </p>
            <p className="text-[#101828] text-[14px]">
              {`Your payment will be debited from your WALLET (₦${
                formatNumberToDecimalPlace(
                  Number(groupData?.contribution_amount),
                  2
                ) || "0"
              }).`}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-[26%] pl-10 ">
          <div className="">
            <button
              onClick={() => setModal(true)}
              className=" text-white mt-[50%]"
            >
              <span className="py-[10px] px-[24px] text-[16px]  bg-[#088AB2] rounded-md whitespace-nowrap">
                Pay Now
              </span>
            </button>
            <ContributionForm onClose={handleOnClose} visible={modal} />
          </div>
          <button className=" text-white ">
            <span className="py-[10px] px-[24px] text-[16px]  text-black bg-white border rounded-md font-[600]">
              DISMISS
            </span>
          </button>
        </div>
      </div>

      <div className="h-[260px] overflow-hidden">
        <img
          // src={corperimg}
          src={groupData?.group_image || ""}
          alt="corperimg"
          className="object-cover object-top w-full px-4 my-6 md:h-full"
        />
      </div>

      <div className="text-[#667085] text-[16px] px-4 mb-[24px] mt-[30px]">
        {groupData?.description || "Default Title"}

        {/* Bros/Sis, no dull yourself for dis service year money mata. Join Lagos
        Corp Members Thrift Saving Group sharp-sharp! We go secure your money,
        make am grow well-well, and support each other for dis money journey.
        Learn money sense, plan for your future, and enjoy the benefits of our
        community. No time to waste, come join us now! Contact [07067482633].
        Make we flex our money together! */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[164px] gap-6 ">
        <div>
          <Contributions groupData={groupData as GroupData} />
        </div>
        <div>
          <TransactionsHistory />
        </div>
      </div>
    </div>
  );
};

export default SingleGroupPage;

// 4fa56c46-0f1b-470a-bb49-41d5153100ef ==>single group id
