import success from "../assets/success1.svg";
import close from "../assets/Close.png";

interface Prop {
  visible: boolean;
  onClose: any;
}

const JoinGroupModal = ({ visible, onClose }: Prop) => {
  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      id="container"
      onClick={handleClose}
    >
      <div className="relative w-[474px] h-[270px] bg-white px-[16px] pt-[24px] pb-[32px] flex flex-col justify-center items-center text-center rounded-lg ">
        <img
          src={close}
          alt="close icon"
          className="absolute top-2 right-4 w-[24px] h-[24px]"
          onClick={onClose}
        />

        <img src={success} alt="success icon" className="w-[70px] h-[70px]" />
        <h2 className="py-[22px]">Success!</h2>
        <p>
          you joined <span className="font-semibold">Money Palava Savers</span>{" "}
          succesfully. The contribution will commence immediatly all slots are
          occupied
        </p>
      </div>
    </div>
  );
};

export default JoinGroupModal;
