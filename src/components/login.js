import React, { useState } from 'react';
import './components.css';
import { navBar as NavBar } from './header';
import { useAuth } from "../authentication/auth-provider";
import axios from 'axios';


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

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++){
	const cookie = cookies[i].trim();
	if (cookie.substring(0, name.length + 1) === (name + '=')) {
	  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
     }
    }
    return cookieValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.email !== null && formData.password !== null) {
      const response = await axios.post('http://127.0.0.1:8000/login',
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
      if (response.status === 200) {
        login(formData.email.toString(), formData.password.toString());
      } else {
	alert("Invalid password or username");
      }
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
