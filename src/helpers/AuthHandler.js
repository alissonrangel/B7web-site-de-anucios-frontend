//Verifica se usuario esta logado
//vai logar o usuario
//vai deslogar o usuario

import Cookies from 'js-cookie';

export const isLogged = () => {
  let token = Cookies.get('token');
  return (token) ? true : false;
}