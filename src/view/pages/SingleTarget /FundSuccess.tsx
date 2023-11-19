import { useEffect } from 'react'
import { ModalSuccess } from '../../../components/Modal'
import { useNavigate } from "react-router-dom";

const FundSuccess = () => {
  const navigate = useNavigate();

  // Define the timeout duration in milliseconds (e.g., 5000 for 5 seconds)
  const timeoutDuration = 5000;

  useEffect(() => {
    // Set a timeout to redirect after the specified duration
    const timeoutId = setTimeout(() => {
    
      navigate('/singleTarget');
    }, timeoutDuration);

    // Clean up the timeout if the component unmounts prematurely
    return () => clearTimeout(timeoutId);
  }, [navigate]);


  return (
    <ModalSuccess className='mt-48 justify-center' text='A sum of ₦50,000 has been deposited into your wallet,
    your remaining wallet balance is ₦250,000' />
  )
}

export default FundSuccess