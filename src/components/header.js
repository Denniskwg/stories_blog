import {React, useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux';
import './components.css';
import api from '../api/axios';
import { useNavigate } from "react-router-dom";


function Header(props) {
  return (
    <div className="header">
      <NavBar show={props.show}/>
      <About/>
      <Optionsbox/>
    </div>
  );
}

function About() {
  return (
    <div className="about">
      <div className="about-text">
        <div className="text-1">Discover stories about your favourite topics</div>
      </div>
    </div>
  );
}

function Optionsbox() {
  const dispatch = useDispatch();


  const updateSharedState = (e) => {
    dispatch({ type: 'SET_SHARED_VALUE', payload: e.target.dataset.name });
  }
  return ( 
    <div className="options">
      <div className="option" data-name="Technology" onClick={updateSharedState}>Technology</div>
      <div className="option" data-name="HomeDecor" onClick={updateSharedState}>Home Decor</div>
      <div className="option" data-name="Programming" onClick={updateSharedState}>Programming</div>
      <div className="option" data-name="Lifestyle" onClick={updateSharedState}>Lifestyle</div>
      <div className="option" data-name="Fashion" onClick={updateSharedState}>Fashion</div>
      <div className="option" data-name="Architecture" onClick={updateSharedState}>Architecture</div>
      <div className="option" data-name="Business" onClick={updateSharedState}>Business</div>
      <div className="option" data-name="Climatechange" onClick={updateSharedState}>Climate change</div>
    </div>
  );
}

function NavBar(props) {
  const navigate = useNavigate();

  function createNew (e) {
    const token = localStorage.getItem('TOKEN');
    if (token === null) {
      navigate('/login');
    } else {
      const expires_at = localStorage.getItem('EXPIRES_AT');
      const now = new Date();
      const expire_time = new Date(parseInt(expires_at, 10));
      const diff = (expire_time.getTime() - now.getTime()) / 1000;
      console.log(diff);
      if (diff < 1) {
        navigate('/auth/login');
      } else {
        navigate('/create');
      }
    }
  }

  return (
    <div className="navigation navbar-expand-lg navbar-light bg-light .navbar-expand{-sm|-md|-lg|-xl}" bg="light">
      <div className="site-name">World Stories</div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto header-navigation">
	  {props.show && <Button onClick={createNew}>Write</Button>}
          <Nav.Link className="nav-element" href="/">Home</Nav.Link>
	  <Nav.Link className="nav-element" href="/signup">Signup</Nav.Link>
	</Nav>
      </Navbar.Collapse>
    </div>
  );
}

export const header = Header;
export const navBar = NavBar;
