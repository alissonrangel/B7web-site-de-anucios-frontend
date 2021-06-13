import styled from 'styled-components';

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .leftSide{
    width: 250px;
    margin-right: 10px;

    .filterName{
      font-size: 15px;
      margin: 10px 0;
    }


    input, select{
      width: 100%;
      height: 40px;
      border: 2px solid #9bb83c;
      border-radius: 10px;
      outline:0;
      font-size: 15px;
      color: #000;
      padding: 10px;
    }

    ul,li{
      margin: 0;
      padding: 0;
      list-style:none;
    }

    .categoryItem{
      display: flex;
      align-items: center;
      padding: 10px;
      border-radius: 5px;
      color: #000;
      cursor: pointer;
      transition: all ease .4s;

      img{
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
      span{
        font-size: 13px;
      }
    }

    .categoryItem:hover, .categoryItem.active{
      background-color: #9bb83c;
      color: white;
    }
  }

  .rightSide{
    flex: 1;

    h2{
      margin-top:0;
      font-size: 18px;
    }

    .listWarning{
      padding: 30px;
      text-align: center;
    }
    
    .list{
      display: flex;
      flex-wrap: wrap;
      transition: all ease .5s;
      .adItem{
        width: 33%;
      }
    }

    .pagination{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;

      .pagItem{
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        display:flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
        border-radius: 5px;
        &:hover{
          border: 1px solid #999;
          box-shadow: 0 0 4px #999;
        }

        &.active{
          border: 1px solid #999;
          box-shadow: 0 0 4px #999;
          background-color: #ddd;
        }
      }
    }
    
  }

  @media(max-width: 600px){
    &{
      flex-direction: column;
    }
    .leftSide{
      width: auto;
      margin: 10px;

      ul{
        display: flex;
        flex-wrap: wrap;
        li {
          display: flex;
          flex-direction: column;
          width: 50%;          
        }
      }      
    }

    .rightSide{
      margin: 10px;

      .list .adItem{
        width: 50%;
      }
    }
  }
`;