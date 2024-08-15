import React, { useState } from 'react';

const UploadLetter = ({ isOpen, onClose }) => {
  const [selectedLabs, setSelectedLabs] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('File uploaded:', file);
  };

  const handleLabSelection = (lab) => {
    setSelectedLabs((prevSelectedLabs) =>
      prevSelectedLabs.includes(lab)
        ? prevSelectedLabs.filter((item) => item !== lab)
        : [...prevSelectedLabs, lab]
    );
  };

  const handleSubmit = () => {
    console.log('Selected labs:', selectedLabs);
    // handle form submission logic here
  };

  const labOptions = ['Lab A', 'Lab B', 'Lab C']; // Add your lab options here

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative">
        <img 
          src="/images/closebutton.png" 
          alt="Close" 
          className="w-6 h-6 absolute top-2 right-2 cursor-pointer" 
          onClick={onClose} 
        />
        <h1 className="text-2xl font-bold mb-4">Upload Surat Penunjukkan</h1>
        <input type="file" onChange={handleFileUpload} className="mb-4 w-full" />
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Pilihan akses lab:</h2>
          {labOptions.map((lab) => (
            <div key={lab} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={lab}
                value={lab}
                onChange={() => handleLabSelection(lab)}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <label htmlFor={lab} className="ml-2 text-gray-700">{lab}</label>
            </div>
          ))}
        </div>
        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadLetter;
