
import { SearchNormal1 } from "iconsax-react";
interface Props {
    value?: string
    onSearch? : (e:any)=>void
}
const SearchResult = ({value , onSearch}:Props) => {

  return (
    <div className="relative md:w-[65px]">
    <SearchNormal1
      fontSize={20}
      className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
    />
    <input
      type="text"
      placeholder="Search..."
      className="text-sm focus:outline-none active:outline-none border border-gray-300 w-full md:w-[24rem] sm:w-[65px] h-10 pl-11 pr-4 rounded-3xl"
      onChange ={onSearch}
      value ={value}
    />
  </div>
  )
}

export default SearchResult