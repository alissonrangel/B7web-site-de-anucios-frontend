import React, { useState , useEffect} from 'react';
import  { Link, useLocation, useHistory } from 'react-router-dom';
import { PageArea } from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useAPI from '../../helpers/SiteAPI';
import AdItem from '../../components/partials/AdItem';
import { async } from 'q';

let timer; //criado uma vez, quando fora do componente

const Page = () => {

  const api = useAPI();
  const history = useHistory();  

  const useQueryString = ()=>{
    return new URLSearchParams( useLocation().search);
  }

  const query = useQueryString();

  //alert( query.get('cat') );

  const [q, setQ] = useState(query.get('q')!= null? query.get('q'):'');
  const [cat, setCat] = useState(query.get('cat')!= null? query.get('cat'):'');
  const [state, setState] = useState(query.get('state')!= null? query.get('state'):'');

  const [adsTotal, setAdsTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

  const [resultOpacity, setResultOpacity] = useState(0.3);

  const [loading, setLoading] = useState(true);

  const getAdsList =  async() => {

    setLoading(true);

    let offset = 0;
    let qtdPorPagina = 2;
    offset = (currentPage-1) * qtdPorPagina;

    const json = await api.getAds({
      sort:'desc',
      limit:qtdPorPagina,
      q,
      cat,
      state,
      offset
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  }

  useEffect(()=>{
    if ( adList.length > 0){
      setPageCount( Math.ceil( adsTotal / adList.length) )
    } else {
      setPageCount(0);
    }
  },[adsTotal]);

  useEffect(()=>{

    let queryString = [];
    if(q){
      queryString.push(`q=${q}`);
    }
    if(cat){
      queryString.push(`cat=${cat}`);
    }
    if(state){
      queryString.push(`state=${state}`);
    }

    history.replace({
      search:`?${queryString.join('&')}`
    })

    if(timer){
      clearTimeout(timer);
    }

    timer = setTimeout(getAdsList, 2000);
    setResultOpacity(0.3);
    setCurrentPage(1);
  }, [q, cat, state]);

  useEffect(()=>{
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
  }, []);

  useEffect(()=>{
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  }, []);

  let pagination = [];

  useEffect(()=>{
    setResultOpacity(0.3);
    getAdsList();
  },[currentPage])

  for (let i = 1; i <= pageCount; i++) {
    pagination.push(i);
  }
  // useEffect(()=>{
  //   const getRecentAds = async () => {
  //     const json = await api.getAds({
  //       sort:'desc',
  //       limit:16
  //     });
  //     setAdList(json.ads);
  //   }
  //   getRecentAds();
  // }, []);

  const clique = ()=>{
    console.log(adList);
  }

  const handleCategory = (isActive, slug, element) => {

    if(isActive){
      setCat('')
      // let lis = document.getElementsByClassName('category');
      // for (const item of lis) {
      //   item.classList.remove('active');
      // }
      element.classList.remove('active');
    }else {
      setCat(slug);      
    }
  }

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="GET">
            <input 
              type='text' 
              name='q' 
              placeholder="O que voc?? procura?" 
              value={q}
              onChange={e=>setQ(e.target.value)}
            />

            <div className="filterName">Estado:</div>
            <select name='state' value={state} onChange={e=>setState(e.target.value)}>
              <option></option>
              { stateList.map((i,k)=>
                <option key={k} value={i.name}>{i.name}</option>
              )}
            </select>
            <div className="filterName">Categoria:</div>
            <ul>
              { categories.map((i,k)=>
                  <li 
                    key={k} 
                    className={`${(cat == i.slug) ? 'categoryItem active':'categoryItem'}`}
                    // onClick={()=>setCat(i.slug)}
                    onClick={(e) => handleCategory(cat === i.slug, i.slug, e.target)}
                  >
                    <img src={i.img} alt=''/>
                    <span>{i.name}</span>
                  </li>
                )}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          <h2>Resultados</h2>
          {loading && adList.length === 0 &&
            <div className="listWarning">Carregando...</div>
          }          
          { !loading && adList.length === 0 &&
            <div className="listWarning">N??o encontramos resultados.</div>
          }
          <div className="list" style={{opacity: resultOpacity}}>
            {adList.map((i,k)=>
                <AdItem key={k} data={i} />
              )}
          </div>
          <div className='pagination'>
            {pagination && pagination.map((i,k)=>
                <div key={`pag${k}`} onClick={()=>setCurrentPage(i)} className={ i === currentPage ? 'pagItem active': 'pagItem'}>{i}</div>
              )}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
}

export default Page;