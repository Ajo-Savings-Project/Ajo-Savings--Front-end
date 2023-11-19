import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex w-[1175px] items-start justify-center gap-[10px] p-[10px] relative bg-cyan-600">
      <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-normal text-white text-[16px] tracking-[0.15px] leading-[22.4px] whitespace-nowrap">
        <span role = "generic" className="font-[number:var(--body-text-bold-16-font-weight)] font-body-text-bold-16 [font-style:var(--body-text-bold-16-font-style)] tracking-[var(--body-text-bold-16-letter-spacing)] leading-[var(--body-text-bold-16-line-height)] text-[length:var(--body-text-bold-16-font-size)]">
          Complete account setup
        </span>
        <span className="font-body-text-normal-16 [font-style:var(--body-text-normal-16-font-style)] font-[number:var(--body-text-normal-16-font-weight)] tracking-[var(--body-text-normal-16-letter-spacing)] leading-[var(--body-text-normal-16-line-height)] text-[length:var(--body-text-normal-16-font-size)]">
          .{" "}
        </span>
        <Link to="/dashboard/kyc">
          <span  className="[font-family:'Inter-Regular',Helvetica] hover:scale-105 hover:text-lg transition-transform duration-300 ease-in-out underline">
            Click here
          </span>
        </Link>
      </p>
    </div>
  )
}
export default Header