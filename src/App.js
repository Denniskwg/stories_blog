import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import HomePage from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Refresh from './components/refresh';
import Story from './components/read_story';
import Create from './components/write_story';
import { AuthProvider } from './authentication/auth-provider';
import axios from 'axios';



function App() {
  const sharedValue = useSelector((state) => state.sharedValue);
  const dispatch = useDispatch();


  const getPosts = useCallback(async () => {
    if (sharedValue.length > 0) {
      const promises = sharedValue.map(async item => {
        const list = await axios.get(`http://127.0.0.1:8000/api/filter/${item}`, {withCredentials: true});
        return list.data.stories;
      });

      const resolvedPosts = await Promise.all(promises);
      dispatch({ type: 'SET_STORIES', payload: resolvedPosts });
    }
  }, [sharedValue])

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Refresh/>} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
