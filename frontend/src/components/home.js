import React, { useState, useEffect } from 'react';
import './components.css';
import { header as Header } from './header';
import Trendingtopics from './trending';



function HomePage({verify, getPosts}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
    <>
      <Header show={show} verify={verify}/>
      <Trendingtopics/>
    </>
  );
}

export default HomePage;
