import './App.css';
import React, {useCallback} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Refresh from './components/refresh';
import Story from './components/read_story';
import Create from './components/write_story';
import { AuthProvider } from './authentication/auth-provider';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';



function App() {
  const dispatch = useDispatch();
  const sharedValue = useSelector((state) => state.sharedValue);


  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++){
	const cookie = cookies[i].trim();
	if (cookie.substring(0, name.length + 1) === (name + '=')) {
	  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	  break;
	}
      }
    }
    return cookieValue;
  }


  const getPosts = useCallback(async () => {
    const promises = sharedValue.map(async item => {
      const list = await axios.get(`http://127.0.0.1:8000/api/filter/${item}`, {withCredentials: true});
      return list.data.stories;
    });

    const resolvedPosts = await Promise.all(promises);
    dispatch({ type: 'SET_STORIES', payload: resolvedPosts });
  }, [sharedValue])

  const verifyLogin = () => {
    const sessionId = getCookie('sessionid');
    if (sessionId === null) {
      return true;
    }
    return false;
  }

  console.log('App component');

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage verify={verifyLogin} getPosts={getPosts}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Refresh/>} />
          <Route path="/story/:id" element={<Story getPosts={getPosts}/>} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
