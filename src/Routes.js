import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
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
      <Route exact path="/about">
        <About />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/ad/:id">
        <AdPage />
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
