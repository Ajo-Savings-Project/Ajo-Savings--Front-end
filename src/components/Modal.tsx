import React from 'react'
import { Input } from './Input';
import { ButtonSmall } from './Button';
import Success from "../assets/success.svg"
import close from "../assets/Close.svg"

interface Props {
  children?: React.ReactNode;
  className?: string
  text?: string
  onClick?: () => void
  handleSubmit?: () => void
  handleCancel?: () => void
}
export const ModalFade: React.FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50  ${className}`} {...rest}>
      <div className={`bg-white p-4 rounded-lg shadow-lg max-w-md w-full ${className}`} {...rest}>
        {children}
      </div>

    </div>
  )
}
export const Modal: React.FC<Props> = ({ children, className = "", ...rest }) => {
  return (
    <div className={`  flex justify-center items-center ${className}`} {...rest}>
      <div className={`bg-white p-4 rounded-lg shadow-lg max-w-md w-full ${className}`}>
        {children}
      </div>

    </div>
  )
}

Modal.defaultProps = {
  children: (
    <div>
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4">Modal</h2>
      </div>
      <label className="block mb-1">Name:</label>
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />
      <label className="block mb-1">Description:</label>
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />
      <label className="block mb-1">Price:</label>
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <div className="flex justify-end mt-4">
        <ButtonSmall >
          Save
        </ButtonSmall>
        <ButtonSmall className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded-md hover:bg-gray-400">
          Cancel
        </ButtonSmall>
      </div>
    </div>
  ),
};
ModalFade.defaultProps = {
  children: (
    <div>
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-4">Modal</h2>
      </div>
      <label className="block mb-1">Name:</label>
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />
      <label className="block mb-1">Description:</label>
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />
      <label className="block mb-1">Price:</label>
      <Input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md mb-3"
      />

      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Save
        </button>
        <button className="bg-gray-300 text-gray-700 ml-2 px-4 py-2 rounded-md hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  ),
};


export const ModalSuccess: React.FC<Props> = ({ text, onClick, className = "", ...rest }) => {

  return (

    <div className={`bg-white  p-4 rounded-lg shadow-lg sm:w-1/3 h-78 mx-auto  ${className}`} {...rest}>
      <div className='flex items-center justify-end'><img src={close} alt="" onClick={onClick} className='pointer' /></div>
      <div className='flex flex-col justify-center items-center mt-5'>
        <img src={Success} alt="suceessButton" className='mb-5' />
        <h1 className='text-2xl font-medium font-Inter mb-5'>Successful!</h1>
        <p className='text-center px-4'>{text}</p>
      </div>

    </div>


  )
}
interface ModalProps {
  children?: React.ReactNode;
  className?: string
  text?: string
  depositLoading: boolean
  onClick?: () => void
  handleSubmit: (e: React.FormEvent) => void
  handleCancel?: () => void
}

export const ModalForPayment: React.FC<ModalProps> = ({ children, handleSubmit, handleCancel, depositLoading, className = "", ...rest }) => {

  const handleButtonClick = (e: React.FormEvent) => {
    handleSubmit(e);

  }

  return (
    <div className={`fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50  ${className}`} {...rest}>
      <div className={`bg-white py-4 px-8 rounded-lg shadow-lg max-w-md  ${className}`} {...rest}>
        {children}
        <div className='flex justify-between items-center w-1/2 gap-[10px]'>
          <button onClick={handleButtonClick}
            disabled={depositLoading}
            className=' min-w-full md:w-[170px] py-[12px] px-[16px] bg-[#088AB2] rounded-[8px] mx-auto text-[#FFF] font-[Inter] text-[16px] font-semibold mb-[12px] hover:bg-cyan-500'>
            {depositLoading ? "Loading..." : "submit"}</button>
          <button onClick={handleCancel} className=' min-w-full md:w-1/2 py-[12px] px-[16px] bg-red-500 rounded-[8px] mx-auto text-[#FFF] font-[Inter] text-[16px] font-semibold mb-[12px] hover:bg-red-400 '>Cancel</button>
        </div>

      </div>


    </div>
  )
}
