import { useState } from 'react';
import down from "../../../images/chevron-down.png"
// import calender from "../../../images/calendar-lines.png"
import { MyInput } from '../../../components/Target';
import TextInput from './TextInput';
import FileUpload from '../../../components/FileUpload';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { userKYC } from '../../../slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';


const KYC = () => {

    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isIdOpen, setIsIdOpen] = useState(false);
    const [isOccupationOpen, setIsOccupationOpen] = useState(false);
    const [selectedOccupation, setSelectedOccupation] = useState('');
    const [, setIsDropdownOpen] = useState(false);
    const [selectedIdType, setSelectedIdType] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [formInfo, setFormInfo] = useState({
        bvn: '',
        address: '',
        idNumber: '',
        idDoc: '',
        proofOfAddress: '',
        gender: '',
        occupation: '',
        dob: '',
        idType: ''
    })

    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.auth)

    const [loading, setLoading] = useState(false)
    console.log(loading, setLoading)

    const navigate = useNavigate()

    // Define an array of gender options
    const genders = ['Male', 'Female']

    // Define an array of identification types
    const idTypes = [
        'NIN',
        `Driver's License`,
        'Passport',
        'NEPA Bill'
    ];

    // Define an array of occupation names
    const occupations = [
        'Farmer',
        'Human Resources',
        'Marketing Specialist',
        'Assistant',
        'Teacher',
        'Engineer',
        'IT Professional',
        'Sales Representative',
        'Doctor',
        'Accountant',
        'Lawyer',
        'Banker',
        'Entrepreneur',
        'Project Manager',
        'Graphic Designer',
        'Others'
    ];

    // Function to handle gender selection
    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
        setIsGenderOpen(false);
        setFormInfo((prev) => ({
            ...prev,
            gender
        }))
    };

    console.log(formInfo)
    // Function to handle identification type selection
    const handleIdTypeSelect = (idType: string) => {
        setSelectedIdType(idType);
        setIsIdOpen(false);
        setFormInfo((prev) => ({
            ...prev,
            idType
        }))
    };

    // Function to handle occupation selection
    const handleOccupationSelect = (occupation: string) => {
        setSelectedOccupation(occupation);
        setIsDropdownOpen(false);
        setFormInfo((prev) => ({
            ...prev,
            occupation
        }))
    };

    const toggleGender = () => {
        setIsGenderOpen(!isGenderOpen)
    }
    const toggleId = () => {
        setIsIdOpen(!isIdOpen)
    }
    const toggleOccupation = () => {
        setIsOccupationOpen(!isOccupationOpen)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            const payload = new FormData()
            payload.append("bvn", formInfo.bvn)
            payload.append("address", formInfo.address)
            payload.append("identification_number", formInfo.idNumber)
            payload.append("identification_doc", formInfo.idDoc)
            payload.append("proof_of_address_doc", formInfo.proofOfAddress)
            payload.append("gender", formInfo.gender)
            payload.append("occupation", formInfo.occupation)
            payload.append("date_of_birth", formInfo.dob)
            payload.append("identification_type", formInfo.idType)
            // const payload = {
            //     bvn: formInfo.bvn,
            //     address: formInfo.address,
            //     idNumber: formInfo.idNumber,
            //     idDoc: formInfo.idDoc,
            //     proofOfAddress: formInfo.proofOfAddress,
            //     gender: formInfo.gender,
            //     occupation: formInfo.occupation,
            //     dob: formInfo.dob,
            //     idType: formInfo.idType,
            // };

            console.log(formInfo);
            // setLoading(true)

            await dispatch(userKYC(payload)).unwrap()

            // setLoading(false)
            // toast.success(data.message)
            // handleClose();
            // openSuccessModal();
            navigate("/dashboard");
        } // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            // setLoading(false);
            if (error.response) {
                console.log(error.response);
                toast.error(error.response.data.message);
                return
            }
            if (error.request) {
                toast.error("Network Error");
                return
            }
            if (error.message) {
                toast.error(error.message);
            }
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormInfo((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageUpload = (file: File, fieldName: string) => {
        console.log(fieldName)
        setFormInfo((prev) => ({
            ...prev,
            [fieldName]: file
        }))
    }

    return (

        <div className=" lg:flex bg-[#FFF]  lg:px-10 lg:py-8 lg:justify-center ">
            <form action="" onSubmit={handleSubmit}>
                <div className="lg:w-[526px] h-[1101px] px-10 py-8">
                    <div className="flex-col px-10 mb-8">
                        <div className="lg:w-[374px] lg:h-[91px]">
                            <div className="text-2xl font-bold gap-2 text-[#101828]">
                                <h1>Complete Your KYC Verification</h1>
                            </div>
                            <div className="flex text-center justify-center text-base text-[#cfdffe]">
                                <p>Please complete the KYC verification process to unlock the full features and benefits of <span className="text-[#088AB2] text-base">Savi</span>.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[446px] h-[78px] lg:justify-start lg:items-start gap-6 lg:inline-flex mb-[30px] lg:mb-6 ">
                        <div className="lg:w-[211px] lg:flex-col lg:justify-start lg:items-start gap-4 lg:inline-flex">
                            <div className="lg:self-stretch h-[78px] lg:flex-col lg:justify-start lg:items-start gap-2 lg:flex">
                                <div className="text-gray-900 text-base font-semibold">Gender</div>
                                <div
                                    onClick={toggleGender}
                                    className="self-stretch px-4 py-3 bg-white rounded-lg border border-gray-300 justify-between items-center inline-flex cursor-pointer"
                                >
                                    <div className="text-gray-400 text-sm">
                                        {selectedGender || 'Select your Gender'}
                                    </div>
                                    <img src={down} className="w-6 h-6 relative" alt="Calendar Icon" />
                                </div>
                                {isGenderOpen && (
                                    <div className="relative z-10 left-0 w-[234px] bg-white rounded-lg shadow border border-gray-200">
                                        {genders.map((gender) => (
                                            <div
                                                key={gender}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleGenderSelect(gender)}
                                            >
                                                {gender}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-col justify-start items-start gap-4 inline-flex mb-[50px]">
                            <div className="flex-col justify-start items-start gap-2 flex">
                                <div className="text-gray-900 text-base font-semibold">Occupation</div>
                                <div
                                    onClick={toggleOccupation}
                                    className="self-stretch px-4 py-3 bg-white rounded-lg border border-gray-300 justify-between items-center inline-flex cursor-pointer"
                                >
                                    <div className="text-gray-400 text-sm">
                                        {selectedOccupation || 'Select your Occupation'}
                                    </div>
                                    <img src={down} className="w-6 h-6 relative" alt="down arrow Icon" />
                                </div>
                                {isOccupationOpen && (
                                    <div className="relative z-10 left-0 w-[234px] bg-white rounded-lg shadow border border-gray-200">
                                        {occupations.map((occupation) => (
                                            <div
                                                key={occupation}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleOccupationSelect(occupation)}
                                            >
                                                {occupation}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-[446px] h-[78px] lg:justify-start lg:items-start gap-6 lg:inline-flex mb-6 space-y-">
                        <div className="lg:w-[211px] lg:flex-col lg:justify-start lg:items-start gap-4 lg:inline-flex">
                            <div className="self-stretch h-[78px] flex-col justify-start items-start gap-4 flex">
                                <div className="self-stretch h-[78px] flex-col justify-start items-start gap-2 flex">
                                    <div className="text-gray-900 text-base font-semibold">Date of Birth</div>
                                    {/* <div
                                        onClick={toggleCalendar}
                                        className="self-stretch px-4 py-3 bg-white rounded-lg border border-gray-300 justify-between items-center inline-flex cursor-pointer"
                                    >
                                        <div className="text-gray-400 text-sm">Pick your D.O.B</div>
                                        <img src={calender} className="w-6 h-6 relative" alt="Calendar Icon" />

                                    </div> */}
                                    {/* Calendar Dropdown */}

                                    <MyInput
                                        type="date"
                                        className=" w-full px-[22px] py-[22px] border border-gray-300 rounded-md mb-3"
                                        onChange={(e) => { handleChange(e) }}
                                        value={formInfo.dob}
                                        name='dob'
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="flex-col justify-start items-start gap-4 inline-flex">
                            <div className="flex-col justify-start items-start gap-2 flex">
                                <div className="text-gray-900 text-base font-semibold">Identification Type</div>
                                <div
                                    onClick={toggleId}
                                    className="self-stretch px-4 py-3 bg-white rounded-lg border border-gray-300 justify-between items-center inline-flex cursor-pointer"
                                >
                                    <div className="text-gray-400 text-sm">
                                        {selectedIdType || 'Select your ID Type'}
                                    </div>
                                    <img src={down} className="w-6 h-6 relative" alt="arrow down Icon" />
                                </div>
                                {isIdOpen && (
                                    <div className="relative z-10 left-0 w-[234px] bg-white rounded-lg shadow border border-gray-200">
                                        {idTypes.map((idType) => (
                                            <div
                                                key={idType}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleIdTypeSelect(idType)}
                                            >
                                                {idType}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <TextInput label="BVN" placeholder="Input your BVN" value={formInfo.bvn} name='bvn' onChange={handleChange} />
                        <TextInput label="Address" placeholder="Input your Address" value={formInfo.address} name='address' onChange={handleChange} />
                        <TextInput label="Identification Number" placeholder="Input your Identification Number" value={formInfo.idNumber} name='idNumber' onChange={handleChange} />
                    </div>

                    <div>
                        <FileUpload id="idDoc" label="Upload Identification Document" handleImageUpload={(file) => {
                            console.log('Calling handleImageUpload with idDoc');
                            handleImageUpload(file, 'idDoc');
                        }} />

                        <FileUpload id="proof_of_address" label="Upload Proof of Address" handleImageUpload={(file) => {
                            console.log('Calling handleImageUpload with proofOfAddress');
                            handleImageUpload(file, 'proofOfAddress');
                        }} />



                    </div>

                    <div className="lg:w-[446px] h-[46px] px-4 py-3 bg-cyan-600 rounded-lg justify-center items-center gap-2 inline-flex">
                        <button type="submit" className="text-white text-base font-semibold font-['Inter'] leading-snug tracking-tight w-1/2" onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Loading" : "Submit"}</button>



                        {/* <button onClick={handleSubmit} disabled={isLoading}>{isLoading ? "Loading" : "Submit"} className="py-3 px-4 text-base  text-cyan-500 w-full font-semibold rounded-lg border hover:text-white hover:bg-cyan-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1">
                {loading ? "Loading" : "Save"}
              </button>
              <button onClick={onClose} className="py-3 px-4 text-base  text-cyan-500 w-full font-semibold rounded-lg border hover:text-white hover:bg-red-500 hover:border-transparent focus:outline-none focus:ring-1 focus:ring-cyan-600 focus:ring-offset-1">
                Cancel
              </button> */}

                    </div>
                </div>
            </form>
        </div>



    )
}
// eslint-disable-next-line react-refresh/only-export-components
export default KYC