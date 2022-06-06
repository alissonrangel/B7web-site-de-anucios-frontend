//Verifica se usuario esta logado
//vai logar o usuario
//vai deslogar o usuario

import Cookies from 'js-cookie';

export const isLogged = () => {
  let token = Cookies.get('token');
  //console.log(typeof token === "undefined");
  if (token === "undefined"){
    Cookies.remove('token');
    console.log('Aqui0');
    return false;
  }
  console.log('Aqui1');
  return (token) ? true : false;
}

export const doLogin = (token, rememberPassword = false) => {
  if ( rememberPassword ){
    Cookies.set('token', token, { expires:999 });
  } else {
    Cookies.set('token', token);
  }
}

export const doLogout = () => {
  Cookies.remove('token');
}