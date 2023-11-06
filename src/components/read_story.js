import React, { useState } from 'react';
import './components.css';
import { navBar as NavBar } from './header';
import { Col } from 'react-bootstrap';

export default function Story(props) {
  return (
    <div>
      <NavBar />
      <Col lg={8} md={6} sm={12} className="page">
        <h1>Story Heading Might be long so accomodate for that.</h1>
	<div>Description</div>
	<div className="page-details">
	  <Col className="page-author">Author</Col>
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
	<div className="page-content">This is the story content. Might be long</div>
      </Col>
    </div>
  );
}
