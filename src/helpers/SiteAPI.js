import React, { useState , useEffect} from 'react';
import Cookies from 'js-cookie';
import qs from 'qs';
import { async } from 'q';

// const BASEAPI = 'http://alunos.b7web.com.br:501';
const BASEAPI = 'http://127.0.0.1:3000';
const apiFetchFile = async (endpoint, body) => {
  
  //let token = Cookies.get('token');
  
  //if (!body.token){
  let token = Cookies.get('token');
  if(token){
    body.append('token', token);
  }
  //}
  console.log("BODY>TOKEN");
  
  console.log(token);
  
  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',    
    headers:{
      'Authorization': token      
    },
    body
  });
  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchPost = async (endpoint, body) => {

  if (!body.token){
    let token = Cookies.get('token');
    if(token){
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
  });

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchPut = async (endpoint, body) => {

  if (!body.token){
    let token = Cookies.get('token');
    if(token){
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'PUT',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
  });

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchGet = async (endpoint, body = []) => {

  if (!body.token){
    let token = Cookies.get('token');
    if(token){
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`); 

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchGet1 = async (endpoint, body = []) => {

  if (!body.token){
    let token = Cookies.get('token');
    if(token){
      body.token = token;
    }
  }

  console.log(`XXXXXXXXXX - ${endpoint}`);
  

  const res = await fetch(`${BASEAPI+endpoint}`); 

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }
  console.log(json);

  return json;
}

const SiteAPI = {
  login: async (email, password) =>{
    // fazer consulta ao WS
    const json = await apiFetchPost(
      '/user/signin',
      {email, password}
    );
    return json 
    // { error: 'Funcionalidade Imcompleta'};
  },

  register: async (name, email, password, stateLoc)=>{
    const json = await apiFetchPost(
      '/user/signup',
      {name, email, password, state:stateLoc}
    );
    return json;
  },

  userInfo: async () =>{
    // fazer consulta ao WS
    const json = await apiFetchGet(
      '/user/me'
    );
    return json 
    // { error: 'Funcionalidade Imcompleta'};
  },

  userUpdate: async (name, email, password, stateLoc)=>{
    const json = await apiFetchPut(
      '/user/me',
      {name, email, password, state:stateLoc}
    );
    return json;
  },

  getStates: async () => {
    const json = await apiFetchGet(
      '/states'
    );
    return json.states;
  },

  getCategories: async () => {
    const json = await apiFetchGet(
      '/categories'
    );
    return json.categories;
  },

  getAds: async (options) => {
    const json = await apiFetchGet(
      '/ad/list',
      options
    );
    return json;
  },

  getAd: async (id, other = false) => {
    const json = await apiFetchGet(
      '/ad/item',
      {id, other}
    );
    return json;
  },

  addAd: async (fData) => {
    
    // let token = Cookies.get('token');
    
    // console.log(token);
    
    // if(token){
    //   console.log("Entrou aqui");
      
    //   fData.append('Authorization', token);
    // } else {
    //   console.log("Sem token");
    //   return;
    // }

    const json = await apiFetchFile(
      '/ad/add',
      fData
    );
    return json;
  }

};

export default () => SiteAPI;