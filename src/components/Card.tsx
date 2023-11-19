
import logo from  "../assets/react.svg"

interface Props{
  children?:React.ReactNode;
  className?: string  
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card:React.FC<Props> = ({children, className = '', ...rest}) => {
  return (
    <div className= {`block  hover:bg-cyan-500 active:text-white pt-4 pl-2 pb-4 pr-4 px-4  max-w-lg  mx-auto bg-white space-y-2 rounded-xl shadow-sm sm:py-4 sm:space-y-0 sm:space-x-6 ${className}`} {...rest}>
    {children}
    </div>
  )
}

export default Card
Card.defaultProps={
 children:(
    <div className="">
      <img
        className="block h-10 mx-auto rounded-full sm:shrink-0 sm:mx-0"
        src={logo} // Make sure to import 'logo' from the appropriate file
        alt="woman face"
      />

      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">Ajo Savings</p>
          <p className="text-slate-500 font-md">Your money is safe with us</p>
        </div>
      </div>
    </div>
  ),

 

 
}