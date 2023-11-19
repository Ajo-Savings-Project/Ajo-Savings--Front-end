const GroupPerformance = () => {
  return (
    <div className="mt-4 md:mt-0 md:ml-12">
      <h3 className="text-[15px] font-medium text-[#475569] tracking-[0.075px] mb-2">
        Members
      </h3>

      <table className=" bg-white shadow rounded-lg overflow-hidden border-[1px] border-gray-800">
        <thead className="bg-gray-50 border-b-2 border-gray-200 ">
          <tr className="">
            <th className="px-5 py-3 text-xs leading-4 font-medium tracking-[0.06px] text-gray-500 text-left w-[39px]">
              SLOTS
            </th>
            <th className="px-5 py-3 text-xs leading-4 font-medium tracking-[0.06px] text-gray-500 text-left w-[186px]">
              NAME
            </th>
            <th className="px-5 py-3 text-xs leading-4 font-medium tracking-[0.06px] text-gray-500 text-left w-[92px]">
              PERFORMANCE
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              1
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              Oluwatomilola Eze
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-green-500 tracking-[0.07]">
              90.23%
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              2
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              Mohammed Adebayo
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-red-500 tracking-[0.07]">
              45.50%
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              3
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              Oluwadamilare Idowu
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-green-500 tracking-[0.07]">
              90.23%
            </td>
          </tr>
          <tr>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              4
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-gray-800 tracking-[0.07]">
              Harry Smith
            </td>
            <td className="px-5 py-3 leading-5 font-medium text-blue-500 tracking-[0.07]">
              New user
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GroupPerformance;
