import React, { useState , useEffect} from 'react';
import  { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled'
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents'
import useAPI from '../../helpers/SiteAPI';
import AdItem from '../../components/partials/AdItem';



const Page = () => {

  const api = useAPI();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

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

  useEffect(()=>{
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort:'desc',
        limit:16
      });
      setAdList(json.ads);
    }
    getRecentAds();
  }, []);

  const clique = ()=>{
    console.log(adList);
  }

  return (
    <>
      <SearchArea>
        <PageContainer>          
          <div className="searchBox">
            <form method="GET" action="/ads"> 
              <input type="text" name="q" placeholder="O que você procura?"></input>
              <select name="state">
                <option></option>
                {stateList.map( (i, k) =>
                  <option value={i.name} key={k}>{i.name}</option>
                )}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map( (i, k) =>
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                <img src={i.img} alt=""/>
                <span>{i.name}</span>
              </Link>
            )}
          </div>
        </PageContainer>
      </SearchArea>
      <PageContainer>      
        <PageArea >
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {
              adList.map((i,k)=>
                <AdItem key={k} data={i} />
              )
            }
          </div>
          <Link to="/ads" className="seeAllLink">Ver Todos</Link>
          <hr/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel velit arcu. Quisque eu fringilla erat. Mauris nec ullamcorper diam, et condimentum neque.
        </PageArea>
      </PageContainer>
    </>
  );
}

export default Page;