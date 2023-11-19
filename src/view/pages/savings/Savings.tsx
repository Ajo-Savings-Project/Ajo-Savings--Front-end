/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react'
import { Target } from '../../../components/Target';


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
}



const Savings: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(!showModal)
  }
  // const closeModal = () => {
  //   setShowModal(true)
  // }
  return (
    <>
      <body className="h-screen bg-gray-50">

        <div className="pt-6">
          <h1 className="pl-10 font-bold text-black text-start">
            My Goals
          </h1>
          <h3 className="cursor-pointer text-cyan-600 text-end pr-44" onClick={openModal}>Add New Goal</h3>
        </div>
        <div className="pt-64">
          <h6 className="text-center">
            You don't have any active savings target, you can
          </h6>
          <br />
          <p className="cursor-pointer text-center text-cyan-600" onClick={openModal}>create a new target</p>
        </div>
        {showModal && (
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
            <Target onClose={()=>setShowModal(false)} />
          </div>
        )}
      </body>
    </>
  )
}

export default Savings