
const GroupInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-[14px] bg-white rounded-lg w-[430px] px-4 py-2 border-[1px] border-gray-200">
      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Contribution Amount
        </p>
        <p className="text-sm">₦500,000</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Schedule
        </p>
        <p className="text-sm">Daily</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Contribution Timeline
        </p>
        <p className="text-sm">5 Months</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Estimated Collection
        </p>
        <p className="text-sm">₦2,000,000</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Start Date
        </p>
        <p className="text-sm">May 1, 2023</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          End Date
        </p>
        <p className="text-sm">October 1, 2023</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Available Slots
        </p>
        <p className="text-sm">2, 5 and 7</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
          Total Slots
        </p>
        <p className="text-sm">6</p>
      </div>
    </div>
  );
};

export default GroupInfo;
