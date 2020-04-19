import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, logoutThunk } from './store';
import { withRouter } from 'react-router-dom';

function NavLogin({ history }) {
  const { email, isLoggedIn } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // ** this is how you keep track of prevProps using hooks lmao
  const prevLoginStateRef = useRef();
  useEffect(() => {
    prevLoginStateRef.current = isLoggedIn;
  });
  const prevLoginState = prevLoginStateRef.current;
  //**

  useEffect(() => {
    // redirect to home page on logout
    if (prevLoginState === true && !isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  function generateLoginButton() {
    let buttonText = 'Login';
    let userText = '';
    if (isLoggedIn) {
      buttonText = `Logout`;
      userText = `${email}`;
    }
    return (
      <button onClick={buttonOnClick}>
        <div>{buttonText}</div> <div>{userText}</div>{' '}
      </button>
    );
  }

  function buttonOnClick() {
    if (isLoggedIn) {
      dispatch(logoutThunk());
    } else {
      history.push('/login');
    }
  }
  return <div>{generateLoginButton()}</div>;
}

export default withRouter(NavLogin);
