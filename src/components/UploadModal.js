import React, { useState } from 'react';

const UploadModal = ({ isOpen, onClose }) => {
  const [selectedLabs, setSelectedLabs] = useState([]);

  const handleLabChange = (e) => {
    const lab = e.target.value;
    setSelectedLabs((prev) =>
      prev.includes(lab) ? prev.filter((item) => item !== lab) : [...prev, lab]
    );
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upload Surat Penunjukkan</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
              Close
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fileUpload">Upload File</label>
            <input type="file" id="fileUpload" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 mb-2">Pilihan akses lab:</span>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Lab A"
                  checked={selectedLabs.includes('Lab A')}
                  onChange={handleLabChange}
                  className="mr-2"
                />
                Lab A
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Lab B"
                  checked={selectedLabs.includes('Lab B')}
                  onChange={handleLabChange}
                  className="mr-2"
                />
                Lab B
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Lab C"
                  checked={selectedLabs.includes('Lab C')}
                  onChange={handleLabChange}
                  className="mr-2"
                />
                Lab C
              </label>
            </div>
          </div>
          <button className="bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 w-full">
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default UploadModal;
