import { ChangeEvent, useState } from 'react';

type FileUploadProps = {
    label?: string;
    onChange?: () => void;
    handleImageUpload?: (file: File) => void;
    id?: string;
};

const FileUpload = ({ label, handleImageUpload, id }: FileUploadProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Function to handle file selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            handleImageUpload && handleImageUpload(file);
            e.target.files = null;
        }
    };


    return (
        <div className=" w-full lg:w-[446px] h-[159px] lg:flex-col lg:justify-start lg:items-start gap-2 lg:inline-flex mb-6 ">
            <div className="text-gray-900 text-base font-semibold">{label}</div>
            <div className="self-stretch h-[129px] p-10 bg-white rounded-lg border-2 border-dashed border-gray-400 flex-col justify-start items-center gap-5 flex">
                <div className="flex-col justify-start items-center gap-[5px] flex">
                    <div className="justify-center items-start gap-[5px] inline-flex">
                        <div className="text-gray-800 text-base font-medium">Drop your files here or</div>
                        <div className="justify-start items-start flex">
                            <label htmlFor={id} className="justify-start items-center gap-2.5 flex">
                                <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                    <div className="text-center text-blue-500 text-base font-semibold">Browse</div>
                                </div>
                            </label>
                            <input
                                type="file"
                                id={id}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="text-center text-[#9CA3AF] text-sm font-medium">Maximum size: 50MB</div>
                    <div>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Selected Image"
                                className="max-h-32 max-w-full"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
