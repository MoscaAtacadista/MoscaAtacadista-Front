import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reset from "../stylesheet/reset.js";
import { SignIn } from "./SignInPage.js";
import { HomePage } from "./HomePage.js";
import { SignUp } from "./SignUpPage.js";
import PrivatePage from "./PrivatePage.js";
import { ProductPage } from "./ProductPage.js";
import { CartPage } from "./CartPage.js";
import { ProfilePage } from "./ProfilePage.js";
import { AddProductPage } from "./NewProductPage.js";
import { Confirm } from "./ConfirmPage.js";
import SearchByCategory from "./SearchByCategory.js";

function App() {
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products">
            <Route path=":category" element={<SearchByCategory />} />
          </Route>
          <Route path="/product">
            <Route path=":productid" element={<ProductPage />} />
          </Route>
          <Route
            path="/cart"
            element={
              <PrivatePage>
                <CartPage />
              </PrivatePage>
            }
          />
          <Route path="/product/new" element={<AddProductPage />} />
          <Route
            path="/user"
            element={
              <PrivatePage>
                <ProfilePage />
              </PrivatePage>
            }
          />
           <Route
            path="/confirm/:productId"
            element={
              <PrivatePage>
                <Confirm />
              </PrivatePage>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
