import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import HomePage from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Refresh from './components/refresh';
import Story from './components/read_story';
import Create from './components/write_story';
import { AuthProvider } from './authentication/auth-provider';

function App() {

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
