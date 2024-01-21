import React, { createContext, useState, ReactNode} from "react";

interface GeneralContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const GeneralContext = createContext<GeneralContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface Props {
  children: ReactNode;
}

export const GeneralProvider = ({children} : Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GeneralContext.Provider value={{isDarkMode, toggleDarkMode }}>
      {children}
    </GeneralContext.Provider>
  );
};
