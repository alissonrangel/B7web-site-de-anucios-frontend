import React, { useState , useEffect} from 'react';
import  { Link } from 'react-router-dom';
const Page = () => {
  return (
    <>
      <h1>Página Inicial</h1>
      <Link to="/about" >About</Link>
    </>
  );
}

export default Page;