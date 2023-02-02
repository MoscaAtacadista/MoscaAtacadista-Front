import styled from "styled-components";
import {
  ContentStyle,
  ContentBoxStyle,
  MainInfoStyle,
} from "../stylesheet/models.js";
import EmblaCarousel from "./EmblaCarouselProduct.js";
import Menu from "./components/shared/Menu.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postCart, getProductsById } from "../services/services.js";

function ProductPage() {
  const { productid } = useParams();
  const navigate = useNavigate();
  const auth = localStorage.getItem('auth');
  const config = { headers: {'Authorization': 'Bearer '+ auth}, params: { 'productId': productid}};
  let SLIDE_COUNT = 6;
  let slides = Array.from(Array(SLIDE_COUNT).keys());
  const [ media, setMedia ] = useState([[], [], [], [], [], []])
  const [ product, setProduct ] = useState([]);
  let mediaByIndex = index => media[index % media.length];

  const addCart = () => {
      postCart(config).then(
          (response) => {
              if (response.data) {
                  navigate('/cart')
              }
          }
      )
  };

  useEffect(() => {
      getProductsById(config).then(
          (response) => {
              if (response.data) {
                  setProduct(response.data);
                  setMedia([response.data.pictures, response.data.promotion]);
                  mediaByIndex = index => media[index % media.length];
                  SLIDE_COUNT = response.data.length;
                  slides = Array.from(Array(SLIDE_COUNT).keys());
              }
          })
  }, []);

  return (
      <Content>
          <Menu />

         <ContentBox>
              <EmblaCarousel slides={[slides, mediaByIndex]} />

              <MainInfo>
                  <h2>{product.name}</h2>
                  <h3>{product.price -((product.price * product.promotion)/100)} </h3>
              </MainInfo>

              <div>
                  <p>Descrição:</p>
                  <p>{product.description}</p>
              </div>

              <div>
                  <button onClick={addCart}>
                      Adicionar ao carrinho
                  </button>
              </div>
          </ContentBox>
      </Content>
  );
}

export { ProductPage };

const Content = styled(ContentStyle)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentBox = styled(ContentBoxStyle)`
  .embla {
    max-width: 100%;
    padding: 0;
  }

  .embla__slide {
    min-width: 100%;
  }

  .embla__slide__inner {
    height: 80vw;
    border-radius: 15px 15px 0 0;
  }

  .embla__slide__img {
    position: absolute;
    ${(props) => {
      return `background: url(${props.picture}) center center no-repeat;`;
    }}
    background-size: cover;
  }

  & > div {
    padding: 3%;

    p {
      margin-top: 10px;
      font-family: "Raleway";
    }
  }

  & :nth-child(4)  button {
            height: 90px;
            width: 100%;
            border: none;
            border-radius: 15px;
            background-color:  #6a8e7f;
            color: white;
            font-family: 'Raleway';
            font-size: 32px;
        }
`;

const MainInfo = styled(MainInfoStyle)``;
