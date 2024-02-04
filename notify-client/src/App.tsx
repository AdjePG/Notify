import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation, Routes, Route, Navigate} from 'react-router-dom';
import Header from './layouts/Header/Header';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import NewNote from './pages/NewNote/NewNote';
import List from './pages/List/List';
import UserLog from './pages/UserLog/UserLogin';
import * as UserService from './services/userService';
import { GeneralProvider } from './config/generalContext';
import './App.scss'

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [render, isRender] = useState<Boolean>(false);

  useEffect(() => {
     getSession();
  }, [])

  const getSession = async () => {
    try {
      const token : string | null = localStorage.getItem("token")
      
      if (token !== null) {
        const res = await UserService.getSession(token);
        const data = await res.json();
      
        if (data.retcode !== 0) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          console.error(data.message);
          navigate("/user");
        } else {  
          if (location.pathname === "/user") {
            navigate("/");
          }
        }
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error(error);
      navigate("/user");
    }
    finally {
      isRender(true);
    }
  }

  if (!render) {
    return null
  }

  return (
    <GeneralProvider>
      <Routes>
        <Route path="/user" element={<UserLog />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newnote" element={<NewNote />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/list" element={<List />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </GeneralProvider>
  );
}

export default App;

