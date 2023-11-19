import { useState, ChangeEvent } from "react";
import AjoImg from "../../../assets/resetPasswordImages/Ajo Savings.svg";
import { Input } from "../../../components/Input";
import { ButtonBig } from "../../../components/Button";
import PasswordUpdateModal from "../../../components/passwordUpdateModal/PasswordUpdateModal";
import "./ConfirmPasswordPage.css";
import { useSearchParams, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/httpService";

const initialState = { password: "", confirmPassword: "" };

const ConfirmPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async() => {
    try {
      if(!formData.password) {
        toast.error(" Password is required ")
        return
      }
    
      if(!formData.confirmPassword) {
        toast.error(" Confirm passord is required ")
        return 
      }
      if(formData.password !== formData.confirmPassword) {
        toast.error(" Password and confirm password must match ")
        return
      }
      setLoading(true)
      const payload = {newPassword:formData.password, confirmPassword:formData.confirmPassword}
       await axios.post("/users/resetPass", payload, {headers:{Authorization:`Bearer ${token}`}})
        setFormData(initialState);
        setLoading(false)
        setOpenSuccessModal(true);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
      setLoading(false)
        if (err.response) {
          toast.error(err.response.data.message);
      } else if (err.request) {
          toast.error("Internal Server Error");
      } else {
          toast.error("Error", err.message);
      }
    }
  };
  return (
    <div>
      <div className="Ajo-img">
        <img src={AjoImg} alt="" />
      </div>

      <div className="confirmPassword-container">
        <div className="reset">
          <h2>Reset your password</h2>
        </div>

        <div>
          <div className="label-container">
            <label htmlFor="password">
              <div className="password-container">
                <div>
                  <span className="star">*</span>
                </div>

                <div>
                  <span className="span-text">New Password</span>
                </div>
              </div>
            </label>
          </div>

          <div className="input-container">
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder=".................."
            />
          </div>

          <div className="label-container">
            <label htmlFor="password">
              <div className="password-container">
                <div>
                  <span className="star">*</span>
                </div>

                <div>
                  <span className="span-text">Confirm New Password</span>
                </div>
              </div>
            </label>
          </div>

          <div className="input-container">
            <Input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder=".................."
            />
          </div>

          <div>
            <ButtonBig disabled={loading} onClick={handleSubmit} className="btn-big">
              {loading?"Loading ...":"Reset Password"}
            </ButtonBig>
          </div>
        </div>
      </div>

      <footer className="footer-container">
        <div>
          <h3>Privacy Policy</h3>
        </div>

        <div>Copyright &copy; 2023</div>
      </footer>
      {openSuccessModal && (
        <PasswordUpdateModal
          handleClose={() => {
            setOpenSuccessModal(false);
            navigate("/login")
          }}
        />
      )}
    </div>
  );
};

export default ConfirmPassword;
