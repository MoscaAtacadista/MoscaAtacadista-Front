import styled from "styled-components";
import { ContentStyle } from "../stylesheet/models.js";
import Menu from "./components/shared/Menu.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { deleteCart, getCart } from '../services/services.js';

function CartPage() {
  const auth = localStorage.getItem("auth");
  const config = { headers:{'Authorization': 'Bearer '+ auth}};
  const [ cartProducts, setCartProducts ] = useState([]);

  const deleteProduct = (productId) => {
    deleteCart({ headers:{'Authorization': 'Bearer '+ auth}, body: {'productId': productId}}).then(
      alert('produto deletado do carrinho com sucesso!')
    ) 
  }

  useEffect(() => {
    getCart(config).then(
        function (response) {
            if (response) {
                setCartProducts(response.data);
            }
        })
  }, []);

  return (
    <Content>
      <Menu />
      <SelectionLong>
        {cartProducts.length === 0 ? (
          <>
            <p>
              Nenhum produto adicionado ao carrinho ainda. Continue comprando!
            </p>
          </>
        ) : (
          cartProducts.map((product) => {
            return (
              <div key={product._id}>
                <Link to={"/product/" + product._id}>
                  <div>
                    <img src={product.pictures[0]} />
                    {product.promotion !== 0 ? (
                      <div className="promotion">{product.promotion + "%"}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <h2>{product.name}</h2>
                    <h3>
                      {product.promotion !== 0
                        ? product.price -
                          (product.price * product.promotion) / 100
                        : product.price}
                    </h3>
                  </div>
                  <div>
                    <span>
                      <Link to={"/confirm/" + product._id}>
                        <ion-icon name="checkmark-outline"></ion-icon>
                      </Link>
                    </span>
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProduct(product._id);
                      }}
                    >
                      <ion-icon name="close-outline"></ion-icon>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </SelectionLong>
    </Content>
  );
}

export { CartPage };

const Content = styled(ContentStyle)`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;

  p {
    position: absolute;
    top: 45%;
    padding: 0 30%;
    font-family: "Raleway";
    text-align: center;
    color: white;
  }
`;

const SelectionLong = styled.div`
  width: 100%;

  & div {
    background-color: white;
    width: 90%;
    height: 200px;
    border-radius: 15px;
    margin-left: 5%;
    margin-bottom: 40px;
  }

  a {
    text-decoration: none;
    color: black;

    div {
      float: left;
      width: 33.3%;
      margin: 0;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      border-radius: 15px 0 0 15px;

      img {
        border-radius: 15px 0 0 15px;
        height: 100%;
        width: 100%;
        ${(props) => {
        return `background: url(${props.picture}) center center no-repeat;`;
        }}
        background-size: cover;
      }

      .promotion {
        display: flex;
        position: absolute;
        bottom: -16px;
        right: -14px;
        font-family: "Lobster";
        overflow: hidden;
        padding: 12px;
        font-size: 48px;
        color: white;
        background-color: #d45c3e;
        border-radius: 50%;
        text-shadow: 2px 2px 4px black;
        transform: rotate(-15deg);
        height: 60px;
        width: 90px;
      }

      h2 {
        margin-left: 20px;
        margin-top: 10px;
        font-size: 34px;
      }

      h3 {
        margin-bottom: 12px;
        margin-left: 35.3%;
        font-size: 24px;
        text-align: end;
        color: #d45c3e;
      }
    }
  }

  span {
    color: white;

    a {
      color: white;
      stroke-width: 32px;
    }
  }

  a :nth-child(3) {
    width: 10%;
    display: flex;
    flex-direction: column;
    border-radius: 0 15px 15px 0;

    & :nth-child(1) {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #6a8e7f;
      border-radius: 0 15px 0 0;
    }

    & :nth-child(2) {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #d45c3e;
      border-radius: 0 0 15px 0;

      ion-icon {
        background-color: #d45c3e;
      }
    }
  }

  a :nth-child(2) {
    width: 56.6%;
  }
`;
