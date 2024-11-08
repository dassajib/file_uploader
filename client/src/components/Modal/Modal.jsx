import React, { useState } from "react";

const Modal = ({ closeModal }) => {
  const [files, setFiles] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFiles(e.target.files); // Multiple files are stored here
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();

    // Create FormData to send files
    const formData = new FormData();
    for (let file of files) {
      formData.append("attachments", file); // Append each file
    }

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message); // Success message
        // Close modal or handle success
        closeModal();
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Upload Files</h2>

        {/* Form to submit files */}
        <form className="flex flex-col space-y-4" onSubmit={handleFileUpload}>
          <input
            type="file"
            multiple
            accept="*/*"
            onChange={handleFileChange}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
