import { useState } from "react";
import { ModalFade } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import { ButtonBig } from "../../../components/Button";
import { ModalSuccess } from "../../../components/Modal";
import { toast } from "react-toastify";

interface WithdrawalModalProps {
  close: () => void;
  handleWithdrawTarget: (payload: Record<string, number>) => Promise<undefined>;
}
const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  close,
  handleWithdrawTarget,
}) => {
  const [isActionSuccess, setActionSuccess] = useState<boolean>(false);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!amount) {
        toast.error("Please enter an amount");
        return;
      }
      if (Number.isNaN(Number(amount))) {
        toast.error("Please enter a number");
        return;
      }
      setLoading(true);
      const payload = { amountToWithdraw: Number(amount) };
      await handleWithdrawTarget(payload);
      setActionSuccess(true);
      setLoading(false);
      setAmount("");
      close();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      if (error.response) {
        return toast.error(error.response.data.message);
      }
      if (error.request) {
        return toast.error("Network Error");
      }
      if (error.message) {
        return toast.error(error.message);
      }
    }
  };

  return (
    <ModalFade>
      <div className="modal-content">
        {/* Cancel (X) button */}
        <button
          className="modal-close text-gray-600 hover:text-gray-800 z-10 ml-auto"
          onClick={close}
        >
          {/* "X" icon goes here */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-center mt-4 mb-4">
          Access your Savings
        </h1>
        <span
          className="text-bold text-center mb-2"
          style={{ fontWeight: "bold" }}
        >
          Amount to Withdraw
        </span>
        <label className="flex flex-col items-center mb-4">
        <Input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            placeholder="Type the amount"
          />
        </label>

        <ButtonBig
            className="bg-cyan-600 text-white"
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </ButtonBig>
        {isActionSuccess && <ModalSuccess onClick={close} />}
      </div>
    </ModalFade>
  );
};

export default WithdrawalModal;
