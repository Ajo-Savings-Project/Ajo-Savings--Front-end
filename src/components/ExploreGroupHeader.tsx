import filter from "../assets/filter.svg";

const ExploreGroupHeader = () => {
  return (
    <header className="flex justify-between mt-4 mb-4 items-center">
      <h1 className="text-3xl font-bold leading-10 text-center ">
        Explore Groups
      </h1>
      <div className="flex">
        <img src={filter} alt="filter icon" className="w-6 h-6" />
        <span className="pl-2 text-gray-400">Filter</span>
      </div>
    </header>
  );
};

export default ExploreGroupHeader;
