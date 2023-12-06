import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './components.css';
import { navBar as NavBar } from './header';
import { Col } from 'react-bootstrap';

export default function Story(props) {

  const { id } = useParams();
  const [story, setStory] = useState(null);
  const stories = useSelector((state) => state.stories);

  useEffect(() => {
    const filtered = stories.filter(item=>item.id === id);
    setStory(filtered[0]);
  }, [story])

  return (
    <div>
      <NavBar />
      {story ?
      <Col lg={8} md={6} sm={12} className="page">
        <h1>{story.title}</h1>
	<div>Description</div>
	<div className="page-details">
	  <Col className="page-author">{story.author}</Col>
	  <Col className="page-date">Date posted</Col>
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
      </Col> : <div>Loading...</div>}
    </div>
  );
}
