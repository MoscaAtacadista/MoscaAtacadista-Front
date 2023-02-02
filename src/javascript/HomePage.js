import styled from "styled-components";
import { ContentStyle } from "../stylesheet/models.js";
import { Link } from "react-router-dom";
import EmblaCarousel from "./EmblaCarousel.js";
import { getProducts, getProductsInPromotion } from "../services/services.js";
import { useEffect, useState } from "react";
import Menu from "./components/shared/Menu.js";

function HomePage() {
  const auth = localStorage.getItem("auth");
  const config = { headers: { Authorization: "Bearer " + auth } };
  const [products, setProducts] = useState([]);
  let SLIDE_COUNT = 6;
  let slides = Array.from(Array(SLIDE_COUNT).keys());
  const [media, setMedia] = useState([[], [], [], [], [], []]);
  let mediaByIndex = (index) => media[index % media.length];

  useEffect(() => {
    getProducts(config).then(function (response) {
      if (response) {
        setProducts(response.data);
      }
    });
    getProductsInPromotion(config).then(function (response) {
      if (response.data) {
        let arr = [];
        response.data.map((promotionProduct) => {
          arr.push([
            promotionProduct.pictures,
            promotionProduct.promotion,
            promotionProduct._id,
          ]);
        });
        setMedia(arr);
        mediaByIndex = (index) => media[index % media.length];
      }
    });
  }, []);

  return (
    <Content>
      <Menu />

      {products.length === 0 ? (
          <>
            <p>
              Nenhum produto a venda.
            </p>
          </>
        ) : (
        <>
          <EmblaCarousel slides={[slides, mediaByIndex]} />
          <Selling>
            {products ? (
              products.map((product) => {
                return (
                  <Link
                    to={"/product/" + product._id}
                    key={product._id}
                  >
                    <img src={product.pictures[0]} />
                    <h2>{product.name}</h2>
                    <h3>{product.price}</h3>
                  </Link>
                );
              })
            ) : (
              <></>
            )}
          </Selling>
      </>
      )}
    </Content>
  );
}

export { HomePage };

const Content = styled(ContentStyle)`
  display: flex;
  align-items: center;
  flex-direction: column;
  .embla {
    width: 100%;
  }

  p {
    color: white;
    margin-top: 45%;
    font-size: 24px;
    text-align: center;
    font-family: "Raleway";
  }
`;

const Selling = styled.div`
  display: table;
  margin-top: 20px;
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
      ${(props) => {
        return `background: url(${props.picture}) center center no-repeat;`;
        }}
      background-size: cover;
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
