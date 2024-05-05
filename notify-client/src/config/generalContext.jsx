import React, { createContext, useState} from "react";

export const GeneralContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const GeneralProvider = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState((localStorage.getItem("dkmode") === '1') ? true : false);

  const toggleDarkMode = () => {
    localStorage.setItem("dkmode", (localStorage.getItem("dkmode") === '1') ? '0' : '1')
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GeneralContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </GeneralContext.Provider>
  );
};
