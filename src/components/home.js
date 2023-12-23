import React, {useState} from 'react';
import './components.css';
import { header as Header } from './header';
import Trendingtopics from './trending';



function HomePage() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Header show={show}/>
      <Trendingtopics/>
    </>
  );
}

export default HomePage;
