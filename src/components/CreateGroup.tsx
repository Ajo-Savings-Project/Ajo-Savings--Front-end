/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "./Input";
import { ButtonSmall } from "./Button";
import { ModalFade } from "./Modal";
import messageIcon from "../assets/groups/Imagemessage-icon.svg";
// import CreateGroupModal from "./CreateGroupModal";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "../api/httpService";
import { toast } from "react-toastify";

interface props {
  handleClose?: () => void;
  openSuccessModal?: () => void;
}

const initialState = {
  title: "",
  contribution_amount: "",
  startDate: "",
  endDate: "",
  duration:"" ,
  frequency:"",
  number_of_participants: "",
  time: "",
  group_image: "",
  purpose_and_goals: "",
}

export const CreateGroup: React.FC<props> = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState<string | null>(null);


  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value


    }));

  };

  // const [groups, isLoading] = useAppSelector((state)=> state.groups)

  const [loading, setLoading]= useState(false)

  const handleSubmit = async (e: any) => {
    try {
      const payload = {
        group_name: formData.title,
        purpose_and_goals: formData.purpose_and_goals,
        contribution_amount: formData.contribution_amount,
        frequency: formData.frequency,
        startDate: formData.startDate,
        endDate: formData.endDate,
        number_of_participants: formData.number_of_participants,
        group_image: formData.group_image,
        duration: formData.duration,
        time: formData.time,
      };
      e.preventDefault();
     
      console.log(formData);
      setLoading(true)

     const {data} = await axios.post("/groups/create-group", payload);
     setLoading(false)
     toast.success(data.message)
      // handleClose();
      // openSuccessModal();
      navigate("/dashboard/groups");
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (error: any) {
    setLoading(false);
    if (error.response) {
      console.log(error.response);
      toast.error(error.response.data.message);
      return
    }
    if (error.request) {
      toast.error("Network Error");
      return
    }
    if (error.message) {
      toast.error(error.message);
    }
  }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const options = [
    "1 month",
    "2 months",
    "3 months",
    "4 months",
    "5 months",
    "6 months",
    "1 Year",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e: any, option: any) => {
    e.stopPropagation()
    setSelectedOption(option);
    
    setFormData((prevData) => ({
      ...prevData,
      duration: option   
    }));
    setIsOpen( () => false);
  };



  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/dashboard/groups")
  };

  if (!isModalOpen) {
    return null;
  }

  const handleFrequencySelect = (frequency: string) => {
    setFormData((prev) => ({
      ...prev,
      frequency
    }))
  }

  console.log({ formData })
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <ModalFade className="p-6 h-[90vh] overflow-auto border-x-0 box-content">
        <div className="">
          <form onSubmit={handleSubmit} className="mt-4 md:mt-4">
            <div className="text-black text-2xl font-medium leading-loose">Create New Savings Group</div>
            <div className="self-stretch mt-2 p-4 flex-col justify-start items-start flex border border-gray-200 bg-white h-50 pt-4">
            <div className="flex justify-center items-center">
        {image ? (
          <img src={image} alt="Uploaded Image" className="w-100 object-cover" />
        ) : (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="drop-area p-6 flex flex-col justify-center items-center border border-gray-300 cursor-pointer"
          >
            <img src={messageIcon} alt="Message Icon" />
            <div className="flex items-center mt-4">
            <h1 className="text-gray-800 text-base font-medium leading-normal tracking-tight mb-2">
             Drop your image here or
            </h1>
            <label htmlFor="file-input" className="text-center text-blue-500 text-base mb-2 font-semibold leading-normal tracking-tight cursor-pointer ml-2">
             browse
            </label>
            </div>
            <p className="text-center text-gray-400 text-sm font-medium leading-tight tracking-tight">
              Drop a picture that represents the title of your savings group here
            </p>
          </div>
        )}
      </div>
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
      />        
    </div>


            <label className="text-gray-400 text-sm font-normal leading-tight">
              <span className="text-gray-900 text-base font-semibold leading-snug tracking-tight">Group Name</span>
              <Input               
                type="text"
                value={formData.title}
                name="title"
                onChange={handleChange}
                className="block w-full h-10 mt-1 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                placeholder="Enter the name of the group"
              />
            </label>

            <label className="text-gray-400 text-sm font-normal leading-tight">
              <span className="text-gray-900 text-base font-semibold leading-snug tracking-tight">Contribution amount</span>
              <Input
                type="text"
                name="contribution_amount"
                value={formData.contribution_amount}
                onChange={handleChange}
                className="block w-full h-10 mt-1 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                placeholder="Enter the amount"
              />
            </label>


            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <label className="text-gray-400 text-sm font-normal leading-tight">
                <span className="text-gray-900 text-base font-semibold leading-snug tracking-tight">Expected Start Date</span>
                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="block h-10 w-full mt-1 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                  placeholder="Select your start date"
                />
              </label>

              <label className="text-gray-400 text-sm font-normal leading-tight flex-grow">
                <span className="text-gray-900 text-base font-semibold leading-snug tracking-tight">Expected End Date</span>
                <Input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="block w-full mt-1 h-10 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                  placeholder="Select your end date"
                />
              </label>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-4 ">
              <label className="text-gray-400 text-sm font-normal leading-tight">
                <span className="text-gray-900 text-base font-semibold leading-snug tracking-tight">Duration</span>
                <div className="relative w-48">
                  <div className="relative">
                    <Input
                      type="text"
                      name="duration"
                      id="duration-input"
                      className="block w-full mt-1 h-10  rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                      placeholder="Select your duration"
                      onClick={toggleDropdown}
                      value={selectedOption}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                      onClick={toggleDropdown}
                    >
                      <IoIosArrowDown />
                    </div>
                  </div>
                  {isOpen && (
                    <ul className="absolute mt-10 w-48 bg-white border rounded-md shadow-lg">
                      {options.map((option) => (
                        <li
                          key={option}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={(e) => handleOptionClick(e,option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </label>

              <label className="text-gray-400 text-sm font-normal leading-tight">
                <span className="text-gray-900 text-base font-semibold leading-snug tracking-tight">Number of participants</span>
                <Input
                  type="text"
                  name="number_of_participants"
                  value={formData.number_of_participants}
                  onChange={handleChange}
                  className="block w-[220px] h-10 mt-1 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                  placeholder="Enter the number of people"
                />
              </label>
            </div>

            <div className="flex justify-center gap-8 mt-4">
              <ButtonSmall type="button" onClick={() => handleFrequencySelect("Daily")} className={`text-zinc-800  font-normal leading-none bg-zinc-100 rounded-3xl h-12  px-8 justify-center items-center ${formData.frequency === "Daily" ? "text-neutral-50 bg-cyan-600" : "" }`}>
                Daily
              </ButtonSmall>
              <ButtonSmall type="button" onClick={() => handleFrequencySelect("Weekly")} className={`text-zinc-800  font-normal leading-none bg-zinc-100 rounded-3xl h-12  px-8 justify-center items-center ${formData.frequency === "Weekly" ? "text-neutral-50 bg-cyan-600" : "" }`}>
                Weekly
              </ButtonSmall>
              <ButtonSmall type="button" onClick={() => handleFrequencySelect("Monthly")} className={`text-zinc-800  font-normal leading-none bg-zinc-100 rounded-3xl h-12  px-8 justify-center items-center ${formData.frequency === "Monthly" ? "text-neutral-50 bg-cyan-600" : "" }`}>
                Monthly
              </ButtonSmall>
            </div>
            <br />

            <label className="text-gray-400 text-sm font-normal mt-4">
              <span className="text-gray-900 text-base font-semibold">Time</span>
              <Input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="block w-full mt-1 h-10 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                placeholder="4:00 PM"
              />
            </label>

            <label className="text-gray-400 text-sm font-normal mt-4">
              <span className="text-gray-900 text-base font-semibold">Purpose And Goals</span>
              <Input
                type="text"
                name="purpose_and_goals"
                value={formData.purpose_and_goals}
                onChange={handleChange}
                className="block w-full mt-1 h-10 rounded border-3 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none focus:placeholder-opacity-100 placeholder-opacity-0"
                placeholder="Notes to encourage users to join your saving group"
              />
            </label>

            {/* Submit button */}
            <div className="md:flex mt-5 gap-4 ">
              <ButtonSmall
                
                className="text-neutral-50 text-base font-normal leading-none bg-cyan-600 rounded-3xl h-12 w-60 justify-center items-center gap-2 flex "
              >
                {loading ? "loading" : "Create a new group"}
              </ButtonSmall>

              <ButtonSmall
                onClick={closeModal}
                className="text-zinc-800 text-base font-normal leading-none bg-zinc-100 rounded-3xl h-12 w-60 justify-center items-center gap-2 flex "
              >
                Cancel
              </ButtonSmall>
            </div>
          </form>
        </div>
      </ModalFade>
    </>
  );
};

export default CreateGroup;
