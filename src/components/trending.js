import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import './components.css';


function Trendingtopics(props) {
  const stories = useSelector((state) => state.stories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateSharedState = (e) => {
    dispatch({ type: 'DELETE_FROM_SHARED_VALUE', payload: e.target.dataset.name });
  }

  function handleClick(e) {
    const clicked = e.target;
    const parentDiv = clicked.closest('.story');
    const id = parentDiv.dataset.id;
    navigate(`/story/${id}`);
  }

  console.log(stories);

  return (
    <div className="trending-stories">
        <div className="text-1">Trending stories</div>
        <Row className="stories">
	  {stories && stories.map(story =>
          <Col key={story.id} lg={4} md={6} sm={12} className="story" onClick={handleClick} data-id={story.id}>
            <div className="story-author">{story.author}</div>
            <div className="story-heading">{story.title}</div>
	    <div className="story-description">Description</div>
	    <div className="date-topic"><span className="date-posted">Oct 1</span><span className="story-topic">{story.topic}</span></div>
          </Col>
	  )}

        </Row>
    </div>
  );
};

export default Trendingtopics;
