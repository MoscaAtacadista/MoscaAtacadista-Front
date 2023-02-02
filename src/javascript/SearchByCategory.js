import { useNavigate, useParams } from "react-router-dom";
import Menu from "./components/shared/Menu.js";
import { ContentStyle } from "../stylesheet/models.js";
import styled from "styled-components";
import { getProductsByCategory } from "../services/services.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

export default function SearchByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProductsByCategory(category)
      .then(function (response) {
        if (response) {
          setProducts(response.data);
        }
      })
      .catch(() => {
        alert("Ocorreu um erro ao buscar essa categoria");
        setProducts(null);
        navigate("/")
      });
  }, [category]);

  return (
    <Content>
      <Menu />
      <Selling>
        {products === null ? (
          <Oval
            height="60"
            width="240"
            color="white"
            secondaryColor="#AEA972"
            visible={true}
          />
        ) : products.length === 0 ? (
          <NothingToShow>
            <ion-icon name="sad-outline"></ion-icon>
            <span>Nenhum produto dessa categoria foi encontrado.</span>
          </NothingToShow>
        ) : (
          products.map((product) => {
            return (
              <>
                <Link
                  to={"/product/" + product._id}
                  key={product._id}
                >
                  <img alt="product" src={product.pictures[0]} />
                  <h2>{product.name}</h2>
                  <h3>{product.price}</h3>
                </Link>
              </>
            );
          })
        )}
      </Selling>
    </Content>
  );
}

export { SearchByCategory };

const Content = styled(ContentStyle)`
  display: flex;
  align-items: center;
  flex-direction: column;
  .embla {
    width: 100%;
  }
`;

const Selling = styled.div`
  display: table;
  margin-top: 20px;
  width: 90%;

  a {
    float: left;
    text-decoration: none;
    background-color: white;
    max-width: 42.5%;
    width: 42.5%;
    height: 210px;
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 15px;
    font-family: "Raleway";
    color: black;
    margin-left: 5%;
    position: relative;
    img {
      border-radius: 15px 15px 0 0;
      width: 100%;
      height: 70%;
    }
    h2 {
      margin-left: 10px;
    }
    h3 {
      position: absolute;
      right: 10px;
      bottom: 5px;
      text-align: right;
    }
  }
`;

const NothingToShow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Raleway";
  font-size: 20px;
  span {
    text-align: center;
    margin-top: 15px;
    width: 50%;
  }

  ion-icon {
    height: 50px;
    width: 50px;
  }
`;
