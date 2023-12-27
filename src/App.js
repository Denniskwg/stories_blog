import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Refresh from './components/refresh';
import Story from './components/read_story';
import Create from './components/write_story';
import { AuthProvider } from './authentication/auth-provider';



function App() {


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

  const verifyLogin = () => {
    const sessionId = getCookie('sessionid');
    if (sessionId === null) {
      return true;
    }
    return false;
  }


  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage verify={verifyLogin}/>} />
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
