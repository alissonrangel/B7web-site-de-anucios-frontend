import React, { useState , useEffect, useRef} from 'react';
import  { Link, useHistory } from 'react-router-dom';
import { PageArea } from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useAPI from '../../helpers/SiteAPI';
import { doLogin } from '../../helpers/AuthHandler';


const Page = () => {

  const api = useAPI();

  const fileField = useRef();

  const history = useHistory();

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [desc, setDesc] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{
    const getCategories = async ()=>{
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisabled(true);

    setError('');
    
    let errors = [];

    if(!title.trim()){
      errors.push('Sem título');
    }
    if(!category){
      errors.push('Sem categoria');
    }

    if ( errors.length === 0){
      const fData = new FormData();
      fData.append('title', title);
      fData.append('price', price);      
      fData.append('priceneg', priceNegotiable);
      //fData.append('priceNegotiable', priceNegotiable);
      fData.append('desc', desc);
      fData.append('image', 'default.png');
      fData.append('cat', category);

      if ( fileField.current.files.length > 0){
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append('img', fileField.current.files[i]);          
        }
      }

      const json = await api.addAd(fData);

      if (!json.error){
        history.push(`/ad/${json.id._id}`);
        return;
      } else {
        setError(json.error);
      }

    } else{
      setError(errors.join('\n'));
    }


    
    setDisabled(false);
  }

  return (
    <PageContainer>
      <PageTitle>Postar um anúncio</PageTitle>
      <PageArea >
        {error &&
          <ErrorMessage>
            {error}
          </ErrorMessage>
        }
        <Link to="/" >Voltar para a HOME</Link>

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input 
                type="text" 
                disabled={disabled}
                // required
                value={title}
                onChange={e=>setTitle(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select
                disabled={disabled}
                onChange={e=>setCategory(e.target.value)}
                // required
              >
                <option></option>
                { categories && categories.map((i, k)=>
                    <option key={i._id} value={i._id}>{i.name}</option>
                  )}
              </select>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço: R$</div>
            <div className="area--input">
            <input 
                type="number"
                step="0.01"                 
                disabled={disabled || priceNegotiable}
                required
                value={price}
                onChange={e=>setPrice(e.target.value)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Preço Negociável</div>
            <div className="area--input">
              <input 
                type="checkbox" 
                disabled={disabled}                
                value={priceNegotiable}
                onChange={e=>setPriceNegotiable(!priceNegotiable)} 
              />
            </div>
          </label>
          <label className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea                 
                disabled={disabled}
                required
                value={desc}
                onChange={e=>setDesc(e.target.value)} 
              ></textarea>
            </div>
          </label>
          <label className="area">
            <div className="area--title">Imagem</div>
            <div className="area--input">
              <input
                type="file"
                disabled={disabled}
                // required
                accept="image/*"
                multiple
                ref={fileField}
                // onChange={(e)=>setFeaturedImage(e.target.files[0])}                                
              />
            </div>
          </label>
          <div className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Adicionar Anúncio</button>
            </div>
          </div>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Page;