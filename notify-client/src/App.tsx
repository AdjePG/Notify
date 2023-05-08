import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import NewNote from './pages/NewNote/NewNote';
import List from './pages/List/List';
import { GeneralProvider } from './config/generalContext';
import './App.scss';

function App() {
  const user = "Adje" 

  return (
    <GeneralProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newnote" element={<NewNote />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/list" element={<List />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </GeneralProvider>
  );
}

export default App;

