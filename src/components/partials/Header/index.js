import React from 'react';
import { HeaderArea } from './styled';
import  {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';

import { isLogged, doLogout } from '../../../helpers/AuthHandler';

const Header = () => {

  let logged = isLogged(); 

  const handleLogout = () => {
    doLogout();
    window.location.href = '/';
  }

  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">S</span>
            <span className="logo-2">I</span>
            <span className="logo-3">T</span>
            <span className="logo-4">E</span>
          </Link>
        </div>
        <nav>
          <ul>
            { logged &&
              <>
                <li>
                  <Link to="/my-account" >Minha conta</Link>
                </li>                                
                <li>
                  <Link to="/about">Sobre</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to="/post-an-ad" className="button">Poste um anúncio</Link>
                </li>
              </>
            }
            { !logged &&
              <>
                <li>
                  <Link to="/about">Sobre</Link>
                </li>
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>
                <li>
                  <Link to="/signin" className="button">Poste um anúncio</Link>
                </li>
              </>
            }
            
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
}

export default Header;