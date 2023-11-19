/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/httpService";
import { Circles } from "react-loader-spinner"
// import CircularProgress from "@mui/material/CircularProgress";


const ValidatePayment = () => {
    const [searchParams] = useSearchParams()
    const reference = searchParams.get("reference")

    const history = useNavigate();

    useEffect(() => {
        if (reference) {
            (async () => {

                try {
                    await axios.get(`/paystack/webhook/${reference}`);
                    toast.success("Payment status updated")
                    history("/dashboard");
                } catch (error) {
                    console.log(error)

                    toast.error("Payment status update failed");
                    // history("/dashboard");
                }
            })();
        }
        // eslint-disable-next-line
    }, [reference]);

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default ValidatePayment;