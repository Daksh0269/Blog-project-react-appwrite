import './App.css'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/Auth'
import { login, logout } from './Features/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true); // ✅ true by default
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData})); // ✅ Don't wrap inside `{ userData }`
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false); // ✅ Done loading
      });
  }, [dispatch]);

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
