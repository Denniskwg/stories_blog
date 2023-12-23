import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './components.css';
import { navBar as NavBar } from './header';
import { Col } from 'react-bootstrap';
import PostComment from './post_comment';

export default function Story(props) {

  const { id } = useParams();
  const [story, setStory] = useState(null);
  const stories = useSelector((state) => state.stories);
  const [comments, setComments] = useState([]);


  const updatedComments = useMemo(async () => {
    const list = await axios.get(`http://127.0.0.1:8000/api/comments/${id}`, {withCredentials: true});
    return list;
  }, [id])


  const getStory = useMemo(() => {
    const filtered = stories.filter(item=>item.id === id);
    return filtered[0];
  }, [id, stories])

  useEffect(() => {
    setStory(getStory);
    setComments(updatedComments);
  }, [getStory, updatedComments])

  return (
    <div>
      <NavBar />
      {story ?
      <Col lg={8} md={6} sm={12} className="page">
        <h1>{story.title}</h1>
	<div className="page-details">
	  <Col className="page-author"><span style = {{ fontWeight: 400 }}>Author : </span>{story.author.user_name}</Col>
	  <Col className="page-date">{`${new Date(story.date_posted).getMonth() + 1} / ${new Date(story.date_posted).getDate()} / ${new Date(story.date_posted).getFullYear()}`}</Col>
	  <div className="page-stats">
	    <div className="page-likes">
	      <div className="likes-image"></div>
	      <span>0</span>
	    </div>
	    <div className="page-comments">
	      <div className="comments-image"></div>
	      <div>0</div>
	    </div>
	  </div>
	</div>
	<div className="page-content">{story.content}</div>
	<PostComment/>
      </Col> : <div>Loading...</div>}
    </div>
  );
}
