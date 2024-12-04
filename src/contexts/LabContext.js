import React, { createContext, useState } from 'react';

// Membuat Context untuk Lab
const LabContext = createContext();

// Membuat Provider untuk LabContext
const LabProvider = ({ children }) => {
  const [labs, setLabs] = useState([]); // State untuk menyimpan daftar lab

  // Fungsi untuk memperbarui daftar lab
  const addLabs = (newLabs) => {
    setLabs(newLabs);
  };

  return (
    <LabContext.Provider value={{ labs, addLabs }}>
      {children}
    </LabContext.Provider>
  );
};

export { LabContext }; // Named export untuk context
export default LabProvider; // Default export untuk provider
