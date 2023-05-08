import React, { useContext } from 'react';
import { GeneralContext } from '../../config/generalContext';

export default function Home() {
  const { isDarkMode, toggleDarkMode } = useContext(GeneralContext);

  return (
    <div className={`page${isDarkMode ? ' dark-mode' : ''}`}>
      Home
    </div>
  )
}
