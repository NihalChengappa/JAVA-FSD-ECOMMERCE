import React, { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    console.log("Logged out successfully!");
    window.location.href = '/login';
  }, []);

  return (
    <>
    </>
  );
}

export default Logout;
