import React, { createContext, useState } from 'react';

export const CheckInContext = createContext();

export const CheckInProvider = ({ children }) => {
  const [checkIns, setCheckIns] = useState([]);

  const addCheckIn = (checkIn) => {
    setCheckIns([...checkIns, checkIn]);
  };

  const removeCheckIn = (index) => {
    const newCheckIns = checkIns.filter((_, i) => i !== index);
    setCheckIns(newCheckIns);
  };

  return (
    <CheckInContext.Provider value={{ checkIns, addCheckIn, removeCheckIn }}>
      {children}
    </CheckInContext.Provider>
  );
};
