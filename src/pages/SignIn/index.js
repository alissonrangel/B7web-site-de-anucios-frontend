import React, { useState } from 'react';
// import  { Link } from 'react-router-dom';
import { PageArea } from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useAPI from '../../helpers/SiteAPI';
import { doLogin } from '../../helpers/AuthHandler';


const Page = () => {

  const api = useAPI();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    setError('');
    
    const json = await api.login(email, password);
    console.log(json);
    if ( json.error){
      if (json.error.password) {
        setError(json.error.password.msg);  
      }
      if (json.error.email) {
        setError(json.error.email.msg);  
      }
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = '/';
    }
    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea >
        {error &&
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        {/* <Link to="/" >Voltar para a HOME</Link> */}

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input 
                type="email" 
                disabled={disabled}
                required
                value={email}
                onChange={e=>setEmail(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input 
                type="password" 
                disabled={disabled}
                required
                value={password}
                onChange={e=>setPassword(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Lembrar Senha</div>
            <div className="area--input">
              <input 
                type="checkbox" 
                disabled={disabled}
                checked={rememberPassword}
                onChange={()=>setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>
          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer Login</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;