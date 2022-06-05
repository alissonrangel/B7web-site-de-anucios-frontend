import styled from 'styled-components';

export const SearchArea = styled.div`
  background-color: #ddd;
  border-bottom: 1px solid #ccc;
  padding: 20px 0;

  .searchBox{
    background-color: #9bb83c;
    padding: 20px 15px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0.3px rgba(0,0,0,0.2);
    display: flex;

    form{
      flex: 1;
      display: flex;

      input, select{
        height: 40px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        font-size: 15px;
        color: #000;
        margin-right: 20px;
      }

      input{
        flex: 1;
      }
      select{
        width: 100px;
      }
      button{
        height: 40px;
        background-color: #49aeef;
        font-size: 15px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        color: #fff;
        padding: 0 20px;
        cursor: pointer;
        &:hover{
          background-color: #399ecf;
        }
      }

    }
  }

  .categoryList{
    display: flex;
    flex-wrap:wrap;
    margin-top: 20px;

    .categoryItem{
      width: 25%;
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;
      height: 60px;
      margin-bottom:20px;
      flex-direction: column;

      &:hover{
        color:#999;
      }

      img{
        width: 45px;
        height: 45px;
        // margin-right: 10px;
      }
    }
  }

  @media (max-width: 600px){
    .searchBox form{
      flex-direction: column;

      input{
        padding: 10px;
        margin: 0 0 10px 0;
      }
      select{
        width: 100%;
        margin: 0 0 10px 0;
      }      
    }
    .categoryList{       
      .categoryItem{
        width: 50%;
      }
    }
  }
`;

export const PageArea = styled.div`
  h2{
    font-size: 20px;
  }

  .list{
    display: flex;
    flex-wrap: wrap;

    .adItem{
      width: 25%;
    }
  }
  .seeAllLink{
    color: #000;
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
  }

  @media (max-width: 600px){

    &{
      margin: 10px;
    }
    .list .adItem{
      width: 50%;
    }
  }
`;