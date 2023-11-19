import React, { useState } from "react";
import axios from "axios";

interface ProfilePictureModalProps {
  onClose: () => void;
  onUpload: (imageUrl: string) => void;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  onClose,
  onUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleProfilePictureUpload = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("profilePicture", selectedImage);

        const response = await axios.post(
          "http://localhost:3000/users/uploadProfilePicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.imageUrl;
        console.log("Profile picture uploaded:", imageUrl);

        onClose();
        onUpload(imageUrl);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  return (
    <div className="modal fixed top-0 right-0 mt-10 mr-4 z-50">
      <div className="modal-content bg-white p-4 rounded-lg shadow-lg">
        <span className="close absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <h6 className="text-xl font-bold mb-4">Upload Profile Picture</h6>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={{ maxWidth: "100px", maxHeight: "100px" }} // 
            className="mb-4 rounded-lg"
          />
        )}
        <button
          onClick={handleProfilePictureUpload}
          className="button bg-cyan-600 text-white hover:bg-cyan-500 w-24 rounded-lg"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
