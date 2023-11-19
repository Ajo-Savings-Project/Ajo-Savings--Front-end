import { useState } from "react";
import AjoImg from "../../../assets/resetPasswordImages/Ajo Savings.svg"
import { Input } from "../../../components/Input";
import { ButtonBig } from "../../../components/Button";
import { toast } from "react-toastify";
import axios from "../../../api/httpService";
import { useNavigate } from "react-router-dom";

// import "./ResetPasswordPage.css";
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const ResetPassword = () => {
  const[email , setEmail] = useState("")
  const[loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = async() => {
    try {
      if(!emailPattern.test(email)){
        toast.error("Email is not valid ")
        return 
      }
      setLoading(true)
      const payload = {email}
      const {data} = await axios.post("/users/forgotPass", payload)
      setLoading(false)
      setEmail("")
      toast.success(data.message)
      navigate("/login")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
    setLoading(false)
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
  }

  return (
    <div>
      <div className="Ajo-img">
        <img src={AjoImg} alt="" />
      </div>

      <div className="resetPassword-container flex flex-col justify-center items-center">
        <div className="text-container text-center mb-8">
          <div className="h2-text">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Reset your password</h2>
          </div>
          <div className="p-text">
            <p className="text-gray-400">
              Enter your email below and we'll send you <br />
              instructions on how to reset your password.
            </p>
          </div>
        </div>

        <div className="action-container">
          <div className="label">
            <label htmlFor="email" className="">
              <div className="required-container flex items-center gap-1">
                <div>
                  <span className="required text-rose-600">*</span>
                </div>
                <div>
                  <span className="text-gray-900 font-medium text-base">Email Address</span>
                </div>
              </div>
            </label>
          </div>

          <div className="input">
            <Input  onChange={ (e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" />
          </div>

          <div className="btn-container mt-8">
            <ButtonBig disabled={loading} onClick={handleSubmit} className="btn">{loading?"Loading ...":"Send reset instructions"}</ButtonBig>
          </div>

          <div className="link text-center mt-4">
            <p>
              <span className="text-gray-400">Go back to </span>
              <a href="/signup" className="text-cyan-600 underline">Sign in here</a>{" "}
            </p>
          </div>
        </div>
      </div>

      <footer className="flex justify-around items-center mt-60 text-lg">
        <div>
          <h3>Privacy Policy</h3>
        </div>

        <div>Copyright &copy; 2023</div>
      </footer>
    </div>
  );
};

export default ResetPassword;
