
import close from "../assets/Close.svg"
interface Props {
    handleLogout: () => void
    handleClose: () => void
}
const LogoutModal = ({ handleLogout, handleClose }: Props) => {


    return (
        <div className={`fixed top-0 left-0 h-full w-full flex justify-center items-center bg-black bg-opacity-50 `} >
            <div className={`bg-white p-4 rounded-lg shadow-lg max-w-md w-full h-[200px] flex justify-center items-center relative`} >

                <img src={close} alt="" className='w-[60px] h-[60px] absolute right-0 top-0 cursor-pointer' onClick={handleClose} />
                <div className='text-center '>
                    <p className='mb-[40px] text-[18px] font-semibold font-[Poppins]'>Are you sure you want to logout ?</p>
                    <button className="px-[40px] py-[10px] bg-cyan-600 text-white rounded-lg" onClick={handleLogout}>OK</button>
                </div>
            </div>

        </div>
    )
}

export default LogoutModal