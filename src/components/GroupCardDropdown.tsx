import { Link } from "react-router-dom";

const GroupCardDropdown = () => {
  return (
    <div className="mt-3 bg-gray-100 flex flex-col w-123px p-2.5 rounded-md space-y-2 absolute top-9 right-3 ">
      {/* <Link
        className="hover:font-medium hover:bg-gray-200 rounded pl-1"
        to={"#"}
      >
        Leave Group
      </Link> */}
      <Link
        className="hover:font-medium hover:bg-gray-200 rounded pl-1"
        to={"#"}
      >
        Report Group
      </Link>
      <Link
        className="hover:font-medium hover:bg-gray-200 rounded pl-1"
        to={"/dashboard/viewgroups"}
      >
        View Details
      </Link>
    </div>
  );
};

export default GroupCardDropdown;
