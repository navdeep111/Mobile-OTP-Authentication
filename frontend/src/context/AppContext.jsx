

import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext({});
export default Context;

export function AppContext({ children }) {
  const [flag, setFlag] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(() => {
    return localStorage.getItem('mobileNumber') || '';
  });
  useEffect(() => {
    localStorage.setItem('mobileNumber', mobileNumber);
  }, [mobileNumber]);

  return (
    <Context.Provider value={
      {
        flag, setFlag,
        mobileNumber, setMobileNumber
      }
    }>
      {children}
    </Context.Provider>
  );
}