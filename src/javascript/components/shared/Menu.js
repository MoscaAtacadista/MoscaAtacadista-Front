import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.js";
import { CATEGORIES } from "../../../enums/productEnums.js";
import { removeAccent } from "../../modules/removeAccent.js";

export default function Menu() {
  const navigate = useNavigate();
  const selectCategory = (event) => {
    const category = event.target.value;
    navigate("/products/" + category);
  };

  return (
    <Wrapper>
      <Link to={"/"}>
        <Logo />
      </Link>
      <div>
        <Selection>
          <select onChange={selectCategory}>
            <option value="" defaultValue hidden>
              ▲
            </option>
            {CATEGORIES.map((category, index) => {
              return (
                <option key={index} value={removeAccent(category)}>
                  {category}
                </option>
              );
            })}
          </select>
        </Selection>
        <Link to="/cart">
          <ion-icon name="cart"></ion-icon>
        </Link>
        <Link to="/user">
          <ion-icon name="person"></ion-icon>
        </Link>
      </div>
    </Wrapper>
  );
}

const MenuStyle = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to top, #75927d, #6a8e7f);
  -moz-box-shadow: 0 10px 10px #75927d;
  -webkit-box-shadow: 0 10px 10px #75927d;
  box-shadow: 0 10px 10px #75927d;
  z-index: 4;

  div {
    margin-right: 20px;
  }

  ion-icon {
    margin-right: 10px;
    font-size: 32px;
    color: #3d5248;
  }
`;

const Selection = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  select {
    appearance: none;
    position: absolute;
    left: -46px;
    bottom: -42px;
    font-size: 38px;
    color: #3d5248;
    appearance: none;
    border: none;
    width: 38px;
    transform: rotate(180deg);
    background-color: transparent;
    height: 38px;
    font-family: "Raleway";
    outline: 0;

    option {
      font-size: 24px;
      background-color: #6a8e7f;
    }
  }
`;

const Wrapper = styled(MenuStyle)`
  margin-bottom: 10px;
  a {
    text-decoration: none;
  }
`;
