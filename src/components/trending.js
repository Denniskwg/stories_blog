import React from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import './components.css';
import { useSelector } from 'react-redux';


function Trendingtopics() {
  const navigate = useNavigate();
  const stories = useSelector(state => state.stories);

  function handleClick(e) {
    const clicked = e.target;
    const parentDiv = clicked.closest('.story');
    const id = parentDiv.dataset.id;
    navigate(`/story/${id}`);
  }

  return (
    <div className="trending-stories">
        <div className="text-1">Trending stories</div>
        <Row className="stories">
	  {stories && stories.map(story =>
          <Col key={story.id} lg={4} md={6} sm={12} className="story" onClick={handleClick} data-id={story.id}>
            <div className="story-heading">{story.title}</div>
	    <div className="date-topic"><span className="date-posted">{`${new Date(story.date_posted).getMonth() + 1} / ${new Date(story.date_posted).getDate()} / ${new Date(story.date_posted).getFullYear()}`}</span><span className="story-topic">{story.topic}</span></div>
          </Col>
	  )}

        </Row>
    </div>
  );
};

export default Trendingtopics;
