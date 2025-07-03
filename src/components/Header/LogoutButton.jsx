import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/Auth';
import { logout } from '../../Features/authSlice';
import Button from '../Button';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout()
      .then(() => dispatch(logout()))
      .catch(() => console.log('Error in logging out'));
  };

  return (
    <Button
      onClick={handleLogout}
      textColor="text-white"
      bgColor="bg-red-500"
      hoverColor="hover:bg-red-600"
      className="ml-2"
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
