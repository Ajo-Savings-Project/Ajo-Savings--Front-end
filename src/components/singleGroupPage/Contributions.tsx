import { Link } from "react-router-dom";
import { formatNumberToDecimalPlace } from "../../utils/helpers";
import { GroupData } from "./SingleGroupPage";
import { format } from "date-fns";

interface Props {
  groupData: GroupData;
}

const Contributions: React.FC<Props> = ({ groupData }) => {
  return (
    <div className="pl-5 mt-5 border rounded-md py-3">
      <div className="grid grid-cols-2 gap-24 md:gap-0 leading-8 mb-[14px]">
        <div className="">
          <p className="text-[14px] text-[#98A2B3]">Contribution Amount</p>
          <p className="font-[600] text-[14px]">{`₦${
            formatNumberToDecimalPlace(
              Number(groupData?.contribution_amount),
              2
            ) || "0"
          }`}</p>
        </div>

        <div>
          <p className="text-[14px] text-[#98A2B3]">Schedule</p>
          <p className="font-[600] text-[14px]">{groupData.frequency}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-24 md:gap-0  mb-[14px] leading-8">
        <div className="">
          <p className="text-[14px] text-[#98A2B3]">Contribution Timeline</p>
          <p className="font-[600] text-[14px]">{groupData.duration}</p>
        </div>

        <div>
          <p className="text-[14px] text-[#98A2B3]">Estimated Collection</p>
          <p className="font-[600] text-[14px]">{`₦${
            formatNumberToDecimalPlace(
              Number(groupData?.amount_contributed),
              2
            ) || "0"
          }`}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-24 md:gap-0  mb-[14px] leading-8">
        <div className="">
          <p className="text-[14px] text-[#98A2B3]">Start Date</p>
          <p className="font-[600] text-[14px]">
            {groupData.startDate
              ? format(new Date(groupData.startDate), "MMMM d, yyyy")
              : format(new Date(), "MMMM d, yyyy")}
          </p>
        </div>

        <div>
          <p className="text-[14px] text-[#98A2B3]">End Date</p>
          <p className="font-[600] text-[14px]">
            {groupData.endDate
              ? format(new Date(groupData.endDate), "MMMM d, yyyy")
              : format(new Date(), "MMMM d, yyyy")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-24 md:gap-0 mb-[14px] leading-8">
        <div className="">
          <p className="text-[14px] text-[#98A2B3]">Available Slots</p>
          <p className="font-[600] text-[14px]">{`${
            formatNumberToDecimalPlace(
              Number(
                groupData?.number_of_participants - groupData.members?.length
              ),
              0
            ) || "0"
          }`}</p>
        </div>

        <div>
          <p className="text-[14px] text-[#98A2B3]">Total Slots</p>
          <p className="font-[600] text-[14px]">{`${
            formatNumberToDecimalPlace(
              Number(groupData?.number_of_participants),
              0
            ) || "0"
          }`}</p>
        </div>
      </div>

      <div>
        <Link to="/dashboard/groupflow">
          <button>
            <p className="text-[#2F80ED] text-16px]">
              View Flow{" "}
              <span className="text-[#2F80ED] text-16px] mb-[8px]"> &gt;</span>
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Contributions;
