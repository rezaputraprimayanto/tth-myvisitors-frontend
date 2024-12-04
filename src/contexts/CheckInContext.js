import React, { createContext, useState } from 'react';

// Membuat konteks untuk menyimpan data check-in
export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [visitHistory, setVisitHistory] = useState([]); // State utama untuk menyimpan riwayat check-in

  // Fungsi untuk menambahkan check-in baru ke history
  const addCheckIn = (checkIn) => {
    setVisitHistory((prevHistory) => [
      ...prevHistory,
      {
        ...checkIn,
        timestamp: new Date().toISOString(), // Tambahkan timestamp secara otomatis
      },
    ]);
  };

  // Fungsi untuk menghapus check-in berdasarkan indeks tertentu
  const removeCheckIn = (index) => {
    setVisitHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  // Fungsi untuk memperbarui data check-in
  const updateCheckIn = (index, updatedData) => {
    setVisitHistory((prevHistory) =>
      prevHistory.map((item, i) => (i === index ? { ...item, ...updatedData } : item))
    );
  };

  return (
    <CheckInContext.Provider value={{ visitHistory, addCheckIn, removeCheckIn, updateCheckIn }}>
      {children}
    </CheckInContext.Provider>
  );
};
