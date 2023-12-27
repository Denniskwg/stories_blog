import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './components.css';
import { header as Header } from './header';
import Trendingtopics from './trending';



function HomePage({verify}) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const sharedValue = useSelector((state) => state.sharedValue);

  const getPosts = useCallback(async () => {
    const promises = sharedValue.map(async item => {
      const list = await axios.get(`http://127.0.0.1:8000/api/filter/${item}`, {withCredentials: true});
      return list.data.stories;
    });

    const resolvedPosts = await Promise.all(promises);
    dispatch({ type: 'SET_STORIES', payload: resolvedPosts });
  }, [sharedValue])


  useEffect(() => {
    getPosts();
  }, [getPosts, sharedValue])

  return (
    <>
      <Header show={show} verify={verify}/>
      <Trendingtopics/>
    </>
  );
}

export default HomePage;
