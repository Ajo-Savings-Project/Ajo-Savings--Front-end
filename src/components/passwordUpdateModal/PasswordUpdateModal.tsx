import { ModalFade } from "../Modal";
import "./PasswordUpdateModal.css";
import CloseImg from "../../assets/resetPasswordImages/Close.svg";
import SuccessImg from "../../assets/resetPasswordImages/Success.svg";

interface Props {
  // Add other props as needed
  handleClose?: () => void;
}

const PasswordUpdateModal: React.FC<Props> = ({ handleClose }) => {
  return (
    <ModalFade>
      <div>
        {/* Close img */}
        <div onClick={handleClose} className="closeimg">
          <img src={CloseImg} alt="" />
        </div>

        {/* Success img */}
        <div className="modal-content">
          <div className="successimg-container">
            <img src={SuccessImg} alt="" />
          </div>

          {/* Text */}
          <div className="heading">
            <h2>Password Reset Successful!</h2>
          </div>
          <div>
            <p>
              Your password has been changed successfully. <br />
              <span>Use your new password to log in.</span>
            </p>
          </div>
        </div>
      </div>
    </ModalFade>
  );
};

export default PasswordUpdateModal;
