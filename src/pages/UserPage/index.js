import React, { useState , useEffect} from 'react';
import  { Link } from 'react-router-dom';
import { PageArea } from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useAPI from '../../helpers/SiteAPI';
import { doLogin } from '../../helpers/AuthHandler';


const Page = () => {

  const api = useAPI();

  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [stateLocId, setStateLocId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [stateList, setStateList] = useState([]);
  
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    
    const getUserInfo = async () => {
      const user = await api.userInfo();
      setName(user.name);
      setEmail(user.email);
      setStateLoc(user.state);
    }

    getUserInfo();
  }, []);

  useEffect(()=>{
    
    const getStates = async () => {
      const slist = await api.getStates();

      for (let i = 0; i < slist.length; i++) {
        if(slist[i].name === stateLoc){
          console.log('IDDDDD: '+slist[i]._id);          
          setStateLocId(slist[i]._id);
        }        
      }
      setStateList(slist);
    }

    getStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    setError('');

    // if ( password !== confirmPassword ){
    //   setError('Senhas não batem');
    //   setDisabled(false);
    //   return;
    // }

    const json = await api.userUpdate(name, email, password, stateLoc);

    if ( json.error){
      setError(json.error);
    } else {
      doLogin(json.token);
      window.location.href = '/';
    }
    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Informações do Usuário</PageTitle>
      <PageArea >
        {error &&
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        <Link to="/" >Voltar para a HOME</Link>

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input 
                type="text" 
                disabled={disabled}
                required
                value={name}
                onChange={e=>setName(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                className="select"                
                disabled={disabled}
                required
                value={stateLoc}
                onChange={e=>setStateLoc(e.target.value)}                 
              >
                <option></option>                
                {
                  stateList.map( (i, k) => 
                    <option  key={k} value={i.name} >{i.name}</option>
                  )
                }
              </select>
            </div>
          </label>
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
            <div className="area--title">Nova Senha</div>
            <div className="area--input">
              <input 
                type="password" 
                disabled={disabled}
                checked={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
          </label>
          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Alterar Dados</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;