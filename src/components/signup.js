import React, { useState } from 'react';
import './components.css';
import { navBar as NavBar } from './header';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Signup() {
  return (
    <div>
      <NavBar/>
      <SignupForm/>
    </div>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await axios.post(
      'http://127.0.0.1:8000/register',
      {
        user_name: formData.username,
	password: formData.password,
	first_name: formData.firstname,
	last_name: formData.lastname,
	email: formData.email
      },
      {
	headers: {
	  "Content-Type": "application/json",
	},
	withCredentials: true,
      }
    );

    console.log(response);

    if (response.status === 200) {
      navigate('/login');
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="field">
	  <label htmlFor="firstname">First Name</label>
	  <br/>
	  <input onChange={handleInputChange} autoFocus="autofocus" className="form-control" value={formData.firstname} type="text" name="firstname" id="firstname"/>
	</div>
        <div className="field">
	  <label htmlFor="lastname">Last Name</label>
	  <br/>
	  <input className="form-control" onChange={handleInputChange} type="text" name="lastname" value={formData.lastname} id="lastname"/>
	</div>
        <div className="field">
	  <label htmlFor="email">Email</label>
	  <br/>
	  <input className="form-control" onChange={handleInputChange} type="text" name="email" id="email" value={formData.email}/>
	</div>
        <div className="field">
	  <label htmlFor="username">User Name</label>
	  <br/>
	  <input className="form-control" type="text" onChange={handleInputChange} value={formData.username} name="username" id="username"/>
	</div>
        <div className="field">
	  <label htmlFor="password">Password</label>
	  <br/>
	  <input className="form-control" type="text" value={formData.password} onChange={handleInputChange} name="password" id="password"/>
	</div>
	<div className="actions">
	  <input type="submit" name="submit" value="Sign up" className="btn btn-primary"/>
	</div>
      </form>
    </div>
  );
}

export default Signup;
