import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function blinkingEffect() {
    return keyframes`
        50% {
          opacity: 0;
        }
      `;
  }

export default function BannerAddProduct() {
  return (
    <Wrapper>
      <Link to="/product/new">
        <AddProduct>{"Venha vender conosco!"}</AddProduct>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #c6ae82;
  border-radius: 5px;
  height: 30px;
  width: 80%;
  margin-top: 20px;
  cursor: pointer;
  animation: ${blinkingEffect} 1.5s linear infinite;
  a {
    text-decoration: none;
  }
`;

const AddProduct = styled.span`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-family: "Raleway";
  font-size: 25px;
  font-weight: 700;
  color: white;
`;
