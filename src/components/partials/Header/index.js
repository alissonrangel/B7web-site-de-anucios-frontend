import React from 'react';
import { HeaderArea } from './styled';
import  {BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom';

const Header = () => {
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
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/">Cadastrar</Link>
            </li>
            <li>
              <Link to="/" className="button">Poste um anúncio</Link>
            </li>
          </ul>
        </nav>
      </div>
    </HeaderArea>
  );
}

export default Header;