import React, { useState, useContext } from 'react';
import { LabContext } from '../contexts/LabContext'; // Import LabContext

const UploadLetter = ({ isOpen, onClose }) => {
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [file, setFile] = useState(null); // Menyimpan file yang dipilih
  const { addLabs } = useContext(LabContext); // Mengakses fungsi addLabs dari LabContext

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile); // Menyimpan file ke state
    console.log('File uploaded:', uploadedFile);
  };

  const handleLabSelection = (lab) => {
    setSelectedLabs((prevSelectedLabs) =>
      prevSelectedLabs.includes(lab)
        ? prevSelectedLabs.filter((item) => item !== lab)
        : [...prevSelectedLabs, lab]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (!file) {
      alert('Silakan pilih file sebelum submit.');
      return;
    }

    if (selectedLabs.length === 0) {
      alert('Silakan pilih minimal satu lab sebelum submit.');
      return;
    }

    console.log('Selected labs:', selectedLabs);
    console.log('Uploaded file:', file);

    // Menambahkan lab ke LabContext
    addLabs(selectedLabs);

    alert(`File "${file.name}" berhasil diunggah untuk lab: ${selectedLabs.join(', ')}`);
    onClose(); // Menutup modal setelah submit
  };

  const labOptions = [
    'Lab. Device',
    'Lab. Energy',
    'Lab. Kabel & Aksesori FTTH',
    'Lab. Kalibrasi',
    'Lab. Transmisi',
    'Lab. Infra Service Research (ISR)',
    'Lab. Broadband Access Network Research (BAN)',
    'Lab. Mobility & FMC Research (FMC)',
    'Lab System Integration & Readiness (SIR)',
    'Bagian Infrastructure User Relation (UREL)',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative">
        <img
          src="/images/closebutton.png"
          alt="Close"
          className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-2xl font-bold mb-4">Upload Surat Penunjukkan</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fileUpload" className="block text-gray-700 font-semibold mb-2">
              Upload File:
            </label>
            <input
              type="file"
              id="fileUpload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Pilihan Akses Lab:</h2>
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
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white py-2 px-4 rounded shadow hover:bg-gray-500"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadLetter;
