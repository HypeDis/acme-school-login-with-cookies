import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from './store';
import { withRouter } from 'react-router-dom';

export default withRouter(function LoginPage({ history }) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.user);
  const errorMessage = useSelector(state => state.errorMessage);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  const changeHanlders = {
    email: setEmail,
    password: setPassword,
  };
  function onChangeHandler(evt) {
    const key = evt.target.name;
    changeHanlders[key](evt.target.value);
  }
  function generateErrorMessage() {
    if (errorMessage) {
      return (
        <div className="errors">
          <p>{errorMessage}</p>
        </div>
      );
    } else return null;
  }
  function formOnSubmit(evt) {
    evt.preventDefault();
    dispatch(loginThunk(email, password));
    setEmail('');
    setPassword('');
  }

  return (
    <div className="login__container">
      <h2>Login</h2>
      {generateErrorMessage()}
      <form className="login__form" onSubmit={formOnSubmit}>
        <label htmlFor="email" className="login__label">
          Email&nbsp;
          <input
            name="email"
            value={email}
            type="email"
            className="login__input"
            placeholder="email"
            onChange={onChangeHandler}
          />
        </label>
        <label htmlFor="password" className="login__label">
          Password&nbsp;
          <input
            name="password"
            value={password}
            type="password"
            className="login__input"
            placeholder="password"
            onChange={onChangeHandler}
          />
        </label>
        <p style={{ fontSize: '10px' }}>
          Hint &rarr; email:moe@gmail.com password:123
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
});
