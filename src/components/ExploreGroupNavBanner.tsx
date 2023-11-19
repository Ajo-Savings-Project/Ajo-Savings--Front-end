import { HiChevronRight } from "react-icons/hi";

const ExploreGroupNavBanner = () => {
  return (
    <div className="flex bg-white w-80 items-center bg-opacity-90">
      <span className="m-3 text-sm font-medium leading-5">
        Active Savings Group
      </span>
      <HiChevronRight className=" text-neutral-500" />
      <span className="m-3 text-sm font-medium leading-5 text-neutral-500">
        Explore Groups
      </span>
    </div>
  );
};

export default ExploreGroupNavBanner;
