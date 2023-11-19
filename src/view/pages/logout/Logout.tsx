
import LogoutModal from "../../../components/LogoutModal"
import { useAppDispatch } from "../../../store/hooks"
import {logout} from "../../../slices/userSlice"
import { useNavigate } from "react-router-dom"
const Logout = () => {
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const handleLogout = ()=>{
     dispatch(logout())
    
}

const handleClose = ()=>{
  navigate("/dashboard")
}
  return (
    <div>

      <LogoutModal handleLogout={handleLogout} handleClose = {handleClose}/>
    </div>
  )
}

export default Logout