import React, { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './components.css';
import { navBar as NavBar } from './header';
import { Col } from 'react-bootstrap';
import PostComment from './post_comment';
import Comments from './comments';

const useStories = (id) => {
  const stories = useSelector((state) => state.stories);
  const filtered = stories.filter(item=>item.id === id);
  return filtered[0];
}

export default function Story({getPosts}) {

  const { id } = useParams();
  const story = useStories(id);
  const [comments, setComments] = useState([]);
  const commentSection = useRef(null);


  const updateComments = useCallback(() => {
    const list = axios.get(`http://127.0.0.1:8000/api/comments/${id}`, {withCredentials: true});
    
    list.then(data => {
      setComments(data.data.comments);
    })
  }, [id])

  const scrollToComments = () => {
    commentSection.current.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    if (story === undefined) {
      (async () => {
        await getPosts();
      })();
    }
    updateComments();
  }, [getPosts, updateComments])

  return (
    <div>
      <NavBar />
        {story ?
        <Col lg={8} md={8} sm={12} className="page">
          <h1>{story.title}</h1>
	  <div className="page-details">
	    <Col className="page-author"><span style = {{ fontWeight: 400 }}>Author : </span>{story.author.user_name}</Col>
	    <Col className="page-date">{`${new Date(story.date_posted).getMonth() + 1} - ${new Date(story.date_posted).getDate()} - ${new Date(story.date_posted).getFullYear()}`}</Col>
	    <div className="page-stats">
	      <div className="page-likes">
	        <div className="likes-image"></div>
	        <span>0</span>
	      </div>
	      <div className="page-comments">
	        <div className="comments-image" onClick={scrollToComments}></div>
	        <div>{comments.length}</div>
	      </div>
	    </div>
	  </div>
	  <div className="page-content">{story.content}</div>
	  <div ref={commentSection}>
	    <PostComment/>
	    <Suspense fallback={<div>No comments</div>}>
	      <Comments comments={comments}/>
	    </Suspense>
          </div>
        </Col> : <div>Loading...</div>}
    </div>
  );
}
