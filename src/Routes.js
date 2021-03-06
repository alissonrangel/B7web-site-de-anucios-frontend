import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import UserPage from './pages/UserPage';

// import Categoria from './pages/Categoria'; 
import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import  {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';
import RouteHandler from './components/RouteHandler';

const isLogged = false;

const PrivateRoute = ({children, ...rest}) => {
  return (
    <Route {...rest} >
      { isLogged ? children : <Redirect to="/login" />}
    </Route>
  )
}

function Routes() {

  return (    
    <Switch>
      <RouteHandler exact path="/">
        <Home />
      </RouteHandler>
      <RouteHandler exact path="/about">
        <About />
      </RouteHandler>
      <RouteHandler exact path="/signin">
        <SignIn />
      </RouteHandler>
      <RouteHandler exact path="/signup">
        <SignUp />
      </RouteHandler>
      <RouteHandler exact path="/ad/:id">
        <AdPage />
      </RouteHandler> 
      <RouteHandler private exact path="/post-an-ad">
        <AddAd />
      </RouteHandler> 
      <RouteHandler exact path="/ads">
        <Ads />
      </RouteHandler>   
      <RouteHandler private exact path="/my-account">
        <UserPage />
      </RouteHandler>            
      {/* <RouteHandler path="/categoria/:cat">
        <Categoria />
      </RouteHandler> */}
      <RouteHandler path="*">
        <NotFound />        
      </RouteHandler>
    </Switch>
  );
}

export default Routes;
