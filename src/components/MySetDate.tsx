

interface Props {
  children?: React.ReactNode;
  type?: string;
  // eslint-disable-next-line
  value?: string | any;
  placeholder?: string;
  className?: string;
  checked?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export const MySetDate: React.FC<Props> = ({ onChange, value, name }) => {


  return (
    <div
      className="relative mb-3"
      data-te-datepicker-init
      data-te-input-wrapper-init
    >
      <input
        type="date"
        onChange={onChange}
        value={value}
        name={name}
      className="peer mt-1 block w-full px-4 
      py-3 border border-slate-400 rounded-md text-sm shadow-sm placeholder:slate-400 
      focus:outline-none focus:border-cyan-500 disabled:shadow-none
      focus:ring-1 focus:ring-cyan-500 disabled:bg-slate-50  disabled:text-slate-500
      disabled:border-slate-200 disabled:shadow-slate-500 invalid:border-pink-500
      invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      />
      {/* <label
        htmlFor="floatingInput"
        className="pointer-events-none absolute left-3 top-0 mb-2 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-400 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-cyan-500 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-cyan-500"
      >
        Pick your date
      </label> */}
    </div>
  );
};

//export default SetDate;
