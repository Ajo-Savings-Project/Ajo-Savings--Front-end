import { Link } from "react-router-dom";

const GroupCardDropdownActive = () => {
  return (
    <div className="mt-3 bg-gray-100 flex flex-col w-123px p-2.5 rounded-md space-y-2 absolute top-9 right-3 ">
      <Link
        className="hover:font-medium hover:bg-gray-200 rounded pl-1"
        to={"#"}
      >
        Leave Group
      </Link>
      <Link
        className="hover:font-medium hover:bg-gray-200 rounded pl-1"
        to={"#"}
      >
        Report Group
      </Link>
      <Link to={"/dashboard/viewgroups"}
        className="hover:font-medium hover:bg-gray-200 rounded pl-1"     
      >
        View Details
      </Link>
    </div>
  );
};

export default GroupCardDropdownActive;
