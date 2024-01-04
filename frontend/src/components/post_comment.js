import React, { useState } from 'react';
import './components.css';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


export default function PostComment(props) {

  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setContent(value);
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    //const csrf = getCookie('csrftoken');
    const local = localStorage.getItem('TOKEN');
    if (local === null) {
      navigate('/login');
    } else {
    const token = JSON.parse(local).access_token;
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
	'Authorization': `Bearer ${token}`,
	//'X-CSRFToken': csrf
      },
      withCredentials: true
    }

    const response = axios.post('http://127.0.0.1:8000/api/post_comment',
      {
        story: id,
	content: content
      },
      config
    );
    console.log(response);
    response.then(res => {
      console.log(res);
      console.log(res.status);
      if (res.status !== 200) {
        return Promise.reject(res);
      }
      return res;
    })
    .then(data => {
      console.log(data);
      alert(data.data.message);
    })
    .catch(err =>{
      console.log(err);
      if (err.message === "Network Error") {
        alert("Check your network connection and try again");
      } else {
        if (err.response.data.detail === "Invalid or expired token.") {
          navigate('/auth/login');
        } else {
          alert(err.response.data.message);
        }
      }
    })
    const commentText = document.querySelector('.input-comment');
    commentText.value = '';
    }
  }

  return (
    <div>
      <Col lg={12} md={6} sm={12} className="post-comment">
	<div>post a comment</div>
	<form onSubmit={handleSubmit}>
	  <div className="field field-create">
	    <textarea name="content" className="input-comment" onChange={handleInputChange} value={content}></textarea>
	  </div>
	  <div className="actions field-create">
	    <input type="submit" name="create" value="post" className="btn btn-primary"/>
	  </div>
	</form>
      </Col>
    </div>
  );
}
