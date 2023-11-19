import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getTargetInfo } from "../../slices/targetSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import { imageData } from "../../utils/constants";
import SearchResult from "../SearchResult";

// import { TargetDetails } from "../../slices/targetSlice";


const MyGoals = () => {
  const dispatch = useAppDispatch();
  const { targets } = useAppSelector((state) => state.targets);
  console.log("TARGETS", targets);
  // const [target, setTarget] = useState<TargetDetails>([])
  useEffect(() => {
    dispatch(getTargetInfo());
  }, [dispatch,]);



  return (
    <>
     
      <div className="inline-flex flex-col items-start p-[16px] relative bg-white overflow-">
        <div className="flex w-[348px] items-start justify-between bg-white relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-main-text text-[14px] tracking-[0.07px] leading-[20px] whitespace-nowrap">
            MY GOALS
          </div>
          <Link to="/dashboard/savings">
            <div className="relative hover:text-lg hover:scale-105 transition-transform duration-300 ease-in-out w-fit mt-[-1.00px] hover:text-cyan-500 cursor-pointer font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-blue-1 text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
              View all
            </div>
          </Link>
        </div>
        {
          targets.slice(0, 2).map(target => (
            <div key={target.id} className="inline-flex flex-col items-start relative flex-[0_0_auto] h-[50]">
              <div className="flex w-[338px] justify-between items-center gap-[20px] relative flex-[0_0_auto] overflow-y-auto">
                <div className="inline-flex items-center gap-[12px] relative flex-[0_0_auto]">
                  <img className="relative w-[30px] h-[30px]" alt="category" src={imageData[target.category]} />
                  <div className="inline-flex flex-col items-start gap-px relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                      {target.target}
                    </div>
                    <p className="relative w-fit font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-transparent text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                      <span className="text-[#101828] font-button-normal-14 [font-style:var(--button-normal-14-font-style)] font-[number:var(--button-normal-14-font-weight)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] text-[length:var(--button-normal-14-font-size)]">
                        ₦ {target.amount_saved}
                      </span>
                      <span className="text-[#d9d9d9] font-button-normal-14 [font-style:var(--button-normal-14-font-style)] font-[number:var(--button-normal-14-font-weight)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] text-[length:var(--button-normal-14-font-size)]">
                        / ₦ {target.target_amount}
                      </span>

                    </p>
                  </div>
                </div>
                <div className="relative w-fit font-button-normal-14 font-[number:var(--button-normal-14-font-weight)] text-main-text text-[length:var(--button-normal-14-font-size)] tracking-[var(--button-normal-14-letter-spacing)] leading-[var(--button-normal-14-line-height)] whitespace-nowrap [font-style:var(--button-normal-14-font-style)]">
                  {((target.amount_saved / target.target_amount) * 100)}%
                </div>
              </div>
              <div className="inline-flex items-start gap-[10px] p-[10px] relative flex-[0_0_auto]">
              </div>
              <ProgressBar className=" lg:w-[350px] borderWidth-dash" percentage={((target.amount_saved / target.target_amount) * 100)} />
            </div>
          ))
        }
      </div>
    </>
  )
};

export default MyGoals;