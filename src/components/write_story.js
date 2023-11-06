import React, { useState } from 'react';
import './components.css';
import { navBar as NavBar } from './header';
import { Col } from 'react-bootstrap';
import api from '../api/axios';
import axios from 'axios';


export default function Create(props) {

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    content: '',
    topic: '',
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData( {...formData, [name]: value });
  }


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
    const local = localStorage.getItem('TOKEN');
    const token = JSON.parse(local).access_token;
    const csrf = getCookie('csrftoken');
    console.log(token);
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
	'X-CSRFToken': csrf
      },
      withCredentials: true
    }
    const response = await axios.post('http://127.0.0.1:8000/api/post_story',
      {},
      config
    );
    console.log(response.data);
  }

  return (
    <div>
      <NavBar show={show}/>
      <Col lg={8} md={6} sm={12} className="create-page">
	<form onSubmit={handleSubmit}>
	  <div className="field field-create">
            <label>Heading</label>
	    <br/>
	    <input type="text" name="heading"/>
	  </div>
	  <div className="field field-create">
	    <label>Description</label>
            <br/>
	    <textarea type="text" name="description" className="description"></textarea>
	  </div>
	  <div className="field field-create">
	    <textarea name="content"></textarea>
	  </div>
	  <div className="actions field-create">
	    <input type="submit" name="create" value="create" className="btn btn-primary"/>
	  </div>
	</form>
      </Col>
    </div>
  );
}
