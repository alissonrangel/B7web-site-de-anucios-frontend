import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/SignIn';
// import Categoria from './pages/Categoria'; 
import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import  {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';

const isLogged = false;

const PrivateRoute = ({children, ...rest}) => {
  return (
    <Route {...rest} >
      { isLogged ? children : <Redirect to="/login" />}
    </Route>
  )
}

function App() {

  return (    
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>            
      {/* <Route path="/categoria/:cat">
        <Categoria />
      </Route> */}
      <Route path="*">
        <NotFound />        
      </Route>
    </Switch>
  );
}

export default App;
