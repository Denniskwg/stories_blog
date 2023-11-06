import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import './components.css';


function Trendingtopics() {
  const sharedValue = useSelector((state) => state.sharedValue);
  const dispatch = useDispatch();

  const updateSharedState = (e) => {
    dispatch({ type: 'DELETE_FROM_SHARED_VALUE', payload: e.target.dataset.name });
  }
  return (
    <div className="trending-stories">
        <div className="text-1">Trending stories</div>
	<div className="user-topics">
          {sharedValue.map(value => <div key={value} className="user-option">{value}<span data-name={value} className="remove" onClick={updateSharedState}>x</span></div>)}
	</div>
        <Row className="stories">
          <Col lg={4} md={6} sm={12} className="story">
            <div className="story-author">Author</div>
            <div className="story-heading">Story Name</div>
	    <div className="story-description"> select all the div elements inside a specific div using CSS, you can use descendant combinator (a space)your CSS selector. Heres the CSS selector to select all div</div>
	    <div className="date-topic"><span className="date-posted">Oct 1</span><span className="story-topic">Technology</span></div>
          </Col>
          <Col lg={4} md={6} sm={12} className="story">
            <div className="story-author">Author</div>
            <div className="story-heading">Story Name</div>
	    <div className="story-description">Description</div>
	    <div className="date-topic"><span className="date-posted">Oct 1</span><span className="story-topic">Technology</span></div>
          </Col>
          <Col lg={4} md={6} sm={12} className="story">
            <div className="story-author">Author</div>
            <div className="story-heading">Story Name</div>
	    <div className="story-description">Description</div>
	    <div className="date-topic"><span className="date-posted">Oct 1</span><span className="story-topic">Technology</span></div>
          </Col>
        </Row>
    </div>
  );
};

export default Trendingtopics;
