import React from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

const LogOut = () => {
  const navigate = useNavigate();
  const { logout } = useToken();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogOut;
