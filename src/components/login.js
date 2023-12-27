import React, { useState } from 'react';
import './components.css';
import { navBar as NavBar } from './header';
import { useAuth } from "../authentication/auth-provider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  return (
    <div>
      <NavBar/>
      <LoginForm/>
    </div>
  );
}

function LoginForm() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.email !== null && formData.password !== null) {
      const response = axios.post('http://127.0.0.1:8000/login',
	{
	  email: formData.email,
          password: formData.password,
	},
	{
	  headers: {
	    "Content-Type": "application/json",
	    //"X-CSRFToken": csrf
	  },
	  withCredentials: true,
	}
      );
      response.then(res => {
        if (res.status !== 200) {
	  return Promise.reject(res);
        }
	return res;
      })
      .then(res => {
        login(formData.email.toString(), formData.password.toString());
      })
      .catch(err => {
        if (err.response.status === 401) {
	  navigate('/signup');
	}
	if (err.response.statue === 400) {
	  navigate('/login');
	}
      })
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="field">
	  <label htmlFor="email">Email</label>
	  <br/>
	  <input onChange={handleInputChange} autoFocus="autofocus" className="form-control" value={formData.email} type="text" name="email" id="email"/>
	</div>
        <div className="field">
	  <label htmlFor="password">Password</label>
	  <br/>
	  <input onChange={handleInputChange} className="form-control" value={formData.password} type="text" name="password" id="password"/>
	</div>
	<div className="actions">
	  <input type="submit" name="submit" value="Log in" className="btn btn-primary"/>
	</div>
      </form>
    </div>
  );

}

export default Login;
