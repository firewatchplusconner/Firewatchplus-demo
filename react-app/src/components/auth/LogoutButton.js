import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className='btndark w100p br10px mar10l mar10r pad10 pad20r pad20l flar btnlights'>Logout</button>;
};

export default LogoutButton;
