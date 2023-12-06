import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './components.css';
import { header as Header } from './header';
import Trendingtopics from './trending';
import axios from 'axios';



function HomePage() {
  const [show, setShow] = useState(true);
  const sharedValue = useSelector((state) => state.sharedValue);
  const dispatch = useDispatch();

  async function getPosts() {
    const promises = sharedValue.map(async item => {
      const list = await axios.get(`http://127.0.0.1:8000/api/filter/${item}`, {withCredentials: true});
      return list.data.stories;
    })

    const resolvedPosts = await Promise.all(promises);
    dispatch({ type: 'SET_STORIES', payload: resolvedPosts });
  }

  
  useEffect(() => {
    if (sharedValue.length > 0) {
      getPosts();
    }
  }, [sharedValue])

  return (
    <>
      <Header show={show}/>
      <Trendingtopics/>
    </>
  );
}

export default HomePage;
