/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Divider from "./Divider";
//import Corper from "../../assets/dashboard/Frame 38813497.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUpcomingActivities } from "../../slices/activitiesSlice";
import { RootState } from "../../store";


const UpcomingActivities: React.FC = () => {
  const dispatch = useDispatch();
  const [userId] = useState<string | null>(null);
  const { contributions, loading } = useSelector(
    (state: RootState) => state.activities
  );

  useEffect(() => {
    dispatch(fetchUserUpcomingActivities() as any);
  }, [dispatch, userId]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  // if (loading === "rejected") {
  //   return <div>Error: {error}</div>;
  // }

  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    const date = new Date(dateString);
  
    return date.toLocaleString('en-US', options);
  }
  

  return (
    <div className="inline-flex flex-col items-start gap-[16px] p-[16px] relative bg-white">
      <div className="inline-flex items-start gap-[138px] relative flex-[0_0_auto] pb-2">
        <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
          UPCOMING CONTRIBUTIONS
        </div>
        <div className="relative w-fit mt-[-1.00px] font-button-semi-bold-14 font-[number:var(--button-semi-bold-14-font-weight)] text-blue-1 text-[length:var(--button-semi-bold-14-font-size)] text-center tracking-[var(--button-semi-bold-14-letter-spacing)] leading-[var(--button-semi-bold-14-line-height)] whitespace-nowrap [font-style:var(--button-semi-bold-14-font-style)]">
          View all
        </div>
      </div>
      <div className="inline-flex flex-col items-start gap-[22px] relative flex-[0_0_auto] h-40 overflow-y-auto pb-2">
        {contributions.map((contribution, index) => (
          <div key={index}>
            <div className="inline-flex items-start gap-[34px] relative flex-[0_0_auto]">
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <img
                  className="relative w-[40px] h-[40px] object-cover"
                  alt="Frame"
                  src={contribution.image}
                />
                <div className="inline-flex flex-col items-start gap-px relative flex-[0_0_auto]">
                  <p className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                    {/* Contribution to Lagos Corp Group */}
                    {contribution.groupName}
                  </p>
                  <p className="relative w-fit font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-400 text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                    {/* May 29, 2023 at 11:30 AM */}
                    {formatDate(contribution.date)}
                  </p>
                </div>
              </div>
              <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-cyan-500 text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                {/* -₦5,000 */}
                ₦{contribution.contributionAmount}
              </div>
            </div>

            <Divider
              className="!bg-grey-300 !w-[362px] !relative"
              darkmode={false}
            />
            <div className="inline-flex items-start gap-[34px] relative flex-[0_0_auto]">
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <img
                  className="relative w-[40px] h-[40px] object-cover"
                  alt="Frame"
                  src={contribution.image}
                />
                <div className="inline-flex flex-col items-start gap-px relative flex-[0_0_auto]">
                  <p className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                    {/* Contribution to Lagos Corp Group */}
                    {contribution.groupName}
                  </p>
                  <p className="relative w-fit font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-400 text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                    {/* May 29, 2023 at 11:30 AM */}
                    {formatDate(contribution.date)}
                  </p>
                </div>
              </div>
              <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-primary-color text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                {/* +₦5,000 */}
                ₦{contribution.contributionAmount}
              </div>
            </div>
            <Divider
              className="!bg-grey-300 !w-[362px] !relative"
              darkmode={false}
            />
            <div className="inline-flex items-start gap-[34px] relative flex-[0_0_auto]">
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <img
                  className="relative w-[40px] h-[40px] object-cover"
                  alt="Frame"
                  src={contribution.image}
                />
                <div className="inline-flex flex-col items-start gap-px relative flex-[0_0_auto]">
                  <p className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                    {/* Contribution to Lagos Corp Group */}
                    {contribution.groupName}
                  </p>
                  <p className="relative w-fit font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-grey-400 text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                    {/* May 29, 2023 at 11:30 AM */}
                    {formatDate(contribution.date)}
                  </p>
                </div>
              </div>
              <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-primary-color text-[length:var(--button-normal-14-font-size)] text-center tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                {/* +₦5,000 */}
                ₦{contribution.contributionAmount}
              </div>
            </div>
          </div>
        ))}
        <Divider
          className="!bg-grey-300 !w-[362px] !relative"
          darkmode={false}
        />
      </div>
    </div>
  );
};
export default UpcomingActivities;
