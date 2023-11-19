

interface Props {
  allGroup: {
    title: string; //group name
    description: string; //purpose and goals
    frequency: string;
    contribution_amount: number; //contribution amount
    amount_contributed: number;
    startDate: Date; //start date
    endDate: Date;
    amount_withdrawn: number;

    number_of_participants: number;
  }


}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GroupdetailsTable: React.FC<Props> = ( { allGroup }) => {
  const formattedStartDate = allGroup.startDate.toLocaleString();
  const formattedEndDate = allGroup.endDate.toLocaleString();
  return (

    <div>
      <table className="w-full hidden md:block">
        <thead>
          <tr>
            <th className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left pr-3">
              Contribution
            </th>
            <th className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left pr-3">
              Exp. Withdrawal
            </th>
            <th className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left pr-3">
              Saving Freq
            </th>
            <th className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left pr-3">
              Duration
            </th>
            <th className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left pr-3">
              Available Slots
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="py-3">{allGroup.contribution_amount}</td>
            <td>{allGroup.amount_withdrawn}</td>
            <td>{allGroup.frequency}</td>
            <td>{formattedStartDate}</td>
            <td>{formattedEndDate}</td>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-2 w-full gap-4 md:hidden md:gap-44">
        <div>
          <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
            Contribution
          </p>
          <p>{allGroup.contribution_amount}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
            Exp. Withdrawal
          </p>
          <p>{allGroup.amount_withdrawn}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
            Saving Freq
          </p>
          <p>{allGroup.frequency}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
            Duration
          </p>
          <p>8 mos</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 leading-6 tracking-wide font-normal text-left mb-2 ">
            Available Slots
          </p>
          <p className="mb-4">2, 5 and 7</p>
        </div>
      </div>
    </div>
  );
};

export default GroupdetailsTable;
