import React, { useState } from 'react';
import './components.css';
import { useAuth } from "../authentication/auth-provider";

export default function Refresh(props) {
  const { refreshToken } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await refreshToken(formData.email, formData.password)
  }


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
  )
}
