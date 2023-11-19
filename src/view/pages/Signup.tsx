/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react"; //add FormEvent when it's time for integraton
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../api/httpService";
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  confirm_password: "",
}

export default function Signup() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword((prevPass) => !prevPass);
  };
  console.log(formData);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        ...formData,
      };

      const { data } = await axios.post("/users/register", payload);
      setFormData(initialState);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.User))
      setLoading(false);
      toast.success(data.message)
      navigate("/otp-page");
      console.log(data);
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(`Internal Server Error`);
      } else {
        toast.error(`Error, ${error.message}`);
      }
    }
  };

  return (
    <div className=" mt-0 md:flex h-screen md:overflow-y-hidden">
      <div className="bg-cover bg-center h-screen md:w-1/2 relative object-none bg-lady">
        <h1 className="text-white text-[32px] font-[500] font-bodoni-moda my-[50px] mx-[50px] top-0 z-10">
          Ajó Savings
        </h1>
        <div className="absolute bottom-40 inset-x-0 flex items-center justify-center flex-col p-4">
          <h2 className="text-white text-[32px] font-[600] font-Inter mb-5">
            Welcome to Ajó Savings
          </h2>
          <p className="text-white text-[16px] font-[600] font-Inter">
            Start saving securely and hassle-free with Ajó Savings the
            <br />
            <span className="ml-8">smart savings platform.</span>
          </p>
        </div>
      </div>

      <div className="md:overflow-y-auto lg:w-[50%]">
        <div className="md:flex-row  md:items-center md:justify-center px-[30px] py-[40px] gap-3 md:w-1/2 max-w-sm mx-auto">
          <div className="w-[100%]">
            <h1 className="text-[#088AB2] md:text-[32px] font-[500] font-bodoni-mod text-[18px] md:mb-[28px] flex items-center justify-center">
              {" "}
              Ajó Savings
            </h1>
            <p className="mb-[28px] flex items-center justify-center">Welcome to Ajó Savings.</p>
          </div>
          {/* <button className="flex items-center gap-1" type="submit">
          <img src={google} alt="google logo"/>
          Sign up with Google
        </button>
        <h3>0R</h3> */}
          <div className=" ">
            <form onSubmit={handleSubmit}
              action=""
              // onSubmit={handleSubmit}
              className=""
            >
              <label>First Name</label>
              <input
                className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400] h-[46px] px-[10px] md:h-[46px] md:w-[280px]  border md:pl-7 rounded-lg w-full"
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder=" Enter your first name"

              />
              <label>Last Name</label>

              <input
                className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400]  px-[10px]  h-[46px] md:h-[46px] md:w-[280px] border md:pl-7 rounded-lg w-full"
                type="text"
                name={"lastName"}
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />

              <label>Email Address</label>

              <input
                className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400] md:h-[46px]  px-[10px] md:w-[280px]  h-[46px] border md:pl-7 rounded-lg w-full"
                type="email"
                name={"email"}
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <label>Phone Number</label>

              <input
                className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400]  px-[10px] md:h-[46px] md:w-[280px]  h-[46px] border md:pl-7 rounded-lg w-full"
                type="phone"
                name={"phone"}
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              <div className="flex relative flex-col">
                <label>Password</label>
                <input
                  className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400]  px-[10px] md:h-[46px] md:w-[280px]  h-[46px] border relative password-input md:pl-7 rounded-lg w-full"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="***************"
                  name={"password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <span
                  className="absolute top-[60%] md:left-[250px]  right-4 transform cursor-pointer"
                  onClick={handleTogglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
              </div>
              <div className="flex relative flex-col">
                <label>Confirm Password</label>
                <input
                  className="placeholder:text-[#98A2B3] placeholder:text-[16px] placeholder:font-[400]  px-[10px] md:h-[46px] md:w-[280px]  h-[46px] border relative password-input md:pl-7 rounded-lg w-full"
                  type={showPassword ? "text" : "password"}
                  placeholder="***************"
                  onChange={handleChange}
                  name={"confirm_password"}
                  value={formData.confirm_password}
                  required
                />
                <span
                  className="absolute top-[60%] md:left-[250px] right-4 transform cursor-pointer"
                  onClick={handleTogglePasswordVisibility2}
                >
                  {showPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
              </div>
              <button className="bg-[#088AB2] py-[12px] transition duration-300 hover:bg-white hover:text-cyan-600 hover:border-2 px-[16px] md:w-[280px]  text-white text-[16px] font-[500] font-Inter rounded-lg w-full mt-[10%]"
                type="submit"
                disabled={loading}>
                {loading ? "Loading" : "Sign up"}
              </button>
            </form>
            <div className="mt-7">
              <div className="md:flex md:w-[400px] gap-2 md:items-center md:justify-start ">
                <p className="text-[#98A2B3] ">
                  Already have an account?</p>
                <p><Link
                  className="text-[#088AB2] underline underline-offset-1"
                  to="/login"
                > Sign in here
                </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}