import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setItemStorageOverwrite } from '../services/localStorage';
import './Login.css';
// import PropTypes from 'prop-types'

const SIX = 6;
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const loginValidation = () => {
    if (email
      && password.length >= SIX
      && email.includes('@')
      && email.includes('.com')
    ) return setIsDisabled(false);
    return setIsDisabled(true);
  };

  const setStorage = () => {
    const saveEmail = { email };
    setItemStorageOverwrite('user', saveEmail);
    setItemStorageOverwrite('mealsToken', 1);
    setItemStorageOverwrite('cocktailsToken', 1);
  };

  const handleChange = () => {
    loginValidation();
  };

  const handleSubmit = () => {
    setStorage();
  };

  return (
    <div>
      <form className="login">
        <input
          type="email"
          data-testid="email-input"
          placeholder="Type your email..."
          name="email"
          value={ email }
          onChange={ (e) => {
            setEmail(e.target.value);
            handleChange();
          } }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Type your password..."
          name="password"
          value={ password }
          onChange={ (e) => {
            setPassword(e.target.value);
            handleChange();
          } }
        />
        <Link to="/foods">
          <button
            className="btn-submit"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ handleSubmit }
          >
            Enter
          </button>
        </Link>
      </form>
    </div>
  );
}

// Login.propTypes = {}

export default Login;
