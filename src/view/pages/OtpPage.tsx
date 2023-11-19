import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/httpService';
import { toast } from 'react-toastify';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [resendOtpLoading, setResendOtpLoading ] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); // Allow only digits
    setOtp(input);
  };

  const verifyOTP = async () => {
    try {
      if (!otp) {
        toast.error('OTP is required');
        return;
      }

      setLoading(true);

      // Logic to verify OTP
      const response = await axios.post('/users/verify-otp', {
        otp,
      });
      console.log(response.data);

      setLoading(false);

      // Display a success message
      toast.success('OTP verification successful');
      // Navigate to the login page after successful verification
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('Internal Server Error');
      } else {
        toast.error('Error', error.message);
      }
    }
  };

  const resendOTP = async () => {
    try {
      // Logic to resend OTP
      // You can make an API request to resend the OTP
      // For example:
      setResendOtpLoading(true)
      await axios.post('/users/resend-otp', 
       
      );

      toast.success('OTP resent successfully');
setResendOtpLoading(false)
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error(error);
setResendOtpLoading(false)

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('Internal Server Error');
      } else {
        toast.error('Error', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-4 bg-white rounded-lg shadow-md h-72 w-96">
        <h2 className="text-2xl font-bold mb-4">Enter your OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={handleInputChange}
          className="w-full p-2 mt-4 border rounded"
          placeholder="Enter OTP"
          maxLength={5}
          style={{ textIndent: '30px' }}
        />
        <button
          onClick={verifyOTP}
          className={`w-full p-2 mt-8 ${
            loading ? 'bg-gray-300' : 'bg-cyan-600'
          } text-white rounded hover:bg-cyan-600`}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <button
          onClick={resendOTP}
          disabled={resendOtpLoading}
          className="w-full p-2 mt-4 bg-cyan-600 text-white rounded hover:bg-cyan-600"
        >
          {resendOtpLoading ? 'Sending otp...' : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
