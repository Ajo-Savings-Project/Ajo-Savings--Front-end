import React, { useState } from "react";
import ProfilePictureModal from "../profilePictureModal";
import { SearchNormal1 } from "iconsax-react";
import { MdOutlineMoreVert } from "react-icons/md";
import { ModalForPayment } from "../Modal";
import { toast } from "react-toastify";
import axios from "../../api/httpService"

const Navbar: React.FC = () => {
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  // const [isExpanded, setIsExpanded] = useState(false)
  
  // const MdOutlineMoreVert = ({ options }: { options : string[]})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPassword, setcurrentPassword] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [confirmNewPassword, setconfirmNewPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)




  const userName = localStorage.getItem('user');
  const parseUserName = userName ? JSON.parse(userName) : null

  const toggleDropdown: () => void = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword) return toast.error("Please enter current password")
    if (!newPassword) return toast.error("Please enter new password")
    if (!confirmNewPassword) return toast.error("Please confirm your new  password")
    if (newPassword !== confirmNewPassword) {
      toast.error("The passwords do not match")
      return
    }
    try {
      setPasswordLoading(true)
      const payload = { oldPassword: currentPassword, newPassword, confirmPassword: confirmNewPassword }
      const { data } = await axios.post("/users/change-password", payload)
      toast.success(data.message)
      setcurrentPassword("")
      setnewPassword("")
      setconfirmNewPassword("")
      setPasswordLoading(false)
      setShowModal(false)
      // dispatch(initiatePayment(payload))

      // setEmail("")
      // setAmount("")

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setPasswordLoading(false)
      if (error.response) {
        console.log(error.response)
        return toast.error(error.response.data.message);
      }
      if (error.request) {
        return toast.error("Network Error");
      }
      if (error.message) {
        return toast.error(error.message);
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateProfilePicture = (newImageUrl: string) => {
    setProfilePicture(newImageUrl);
  };

  // function handleProfilePictureUpload(imageUrl: string): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
      <div className="relative md:w-[65px]">
        <SearchNormal1
          fontSize={20}
          className="absolute text-gray-400 -translate-y-1/2 top-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-full md:w-[24rem] sm:w-[65px] h-10 pl-11 pr-4 rounded-3xl"
        />
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <div className="relative flex items-center gap-2">
          <div className="flex ml-2 text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full bg-center bg-no-repeat bg-cover cursor-pointer"
                src={profilePicture!}
                alt=""
                onClick={openModal}
              />
              {modalOpen && (
                <div className="absolute profile-popup right-0 mr-40">
                  <ProfilePictureModal onClose={closeModal} onUpload={updateProfilePicture} />
                </div>
              )}
            </div>
          </div>
        </div>
        <span className="text-gray-600">{`${parseUserName.firstName}`}</span>
        <div className="relative z-10">
          <button
            onClick={toggleDropdown}
            className="rounded-full hover:bg-gray-300">
            <MdOutlineMoreVert />
          </button>
          {isDropdownOpen &&
            <div className="items-left absolute bg-gray-100 right-0 cursor-pointer overflow-hidden text-sm justify-start px-2 py-2">
              <ul className="">
                <li className="flex-row hover:bg-cyan-500 hover:rounded whitespace-nowrap mb-2 px-3"
                  onClick={openModal}
                >
                  Upload Picture
                </li>

                <li onClick={() => setShowModal(!showModal)} className="flex-row hover:bg-cyan-500 hover:rounded whitespace-nowrap px-3">Change Password</li>
              </ul>
            </div>
          }
        </div>
      </div>
      {showModal && (<ModalForPayment className="text-center z-30" handleCancel={() => setShowModal(false)} handleSubmit={handleSubmit} depositLoading={passwordLoading} >
        <h1 className="text-[24px] text-[#101828] font-bold font-[Inter] font-not-italic my-[32px]">Change Password</h1>
        <div className="mx-[20px] ">
          <div className="text-start pb-[12px]">
            <span className="text-[16px] text-[#101828] font-semibold font-[Inter] font-not-italic  leading-[22px] mb-[6px] text-start">Current Password</span>
            <input type="text" value={currentPassword} onChange={(e) => setcurrentPassword(e.target.value)} className=" min-w-full md:w-[370px] py-[12px] px-[16px] rounded-[8px] border-2 border-[#D0D5DD] bg-[#FFF] focus:outline-none" />
          </div>
          <div className=" text-start pb-[12px]" >
            <span className="text-[16px] text-[#101828] font-semibold font-[Inter] font-not-italic  leading-[22px] pb-[12px]">New Password</span>
            <input type="text" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} className="min-w-full md:w-[320px] py-[12px] px-[16px] rounded-[8px] border-[#D0D5DD] bg-[#FFF] border-2 focus:outline-none" />
          </div>
          <div className=" text-start pb-[12px]" >
            <span className="text-[16px] text-[#101828] font-semibold font-[Inter] font-not-italic  leading-[22px] pb-[12px]"> Confirm New Password</span>
            <input type="text" value={confirmNewPassword} onChange={(e) => setconfirmNewPassword(e.target.value)} className="min-w-full md:w-[320px] py-[12px] px-[16px] rounded-[8px] border-[#D0D5DD] bg-[#FFF] border-2 focus:outline-none" />
          </div>
        </div>


      </ModalForPayment>)
      }
    </div>
  );
};

export default Navbar;

