import axios from "axios";

const API_ENDPOINT_URL = process.env.REACT_APP_API_ENDPOINT_URL;

function postSignIn(body) {
  const promise = axios.post(`${API_ENDPOINT_URL}/signIn`, body);
  return promise;
}

function postSignUp(body) {
  const promise = axios.post(`${API_ENDPOINT_URL}/user`, body);
  return promise;
}

function getProducts(header) {
  const promise = axios.get(`${API_ENDPOINT_URL}/products`, header);
  return promise;
}

function getProductsById(header) {
  const promise = axios.get(`${API_ENDPOINT_URL}/product`, header);
  return promise;
}

function getProductsByCategory(category) {
  const promise = axios.get(
    `${API_ENDPOINT_URL}/products/category/${category}`
  );
  return promise;
}

function getProductsInPromotion(config) {
  const promise = axios.get(
    `${API_ENDPOINT_URL}/products/category/Promocao`,
    config
  );
  return promise;
}

function getUser(config) {
  const promise = axios.get(`${API_ENDPOINT_URL}/user`, config);
  return promise;
}

function putUser(data, config) {
  const promise = axios.put(`${API_ENDPOINT_URL}/user`, data, config);
  return promise;
}

function postProduct(data, config) {
  const promise = axios.post(`${API_ENDPOINT_URL}/product`, data, config);
  return promise;
}

function deleteCart(config) {
  const promise = axios.delete(`${API_ENDPOINT_URL}/cart`,  config);
  return promise;
}

function getCart(config) {
  const promise = axios.get(`${API_ENDPOINT_URL}/cart`,  config);
  return promise;
}

function postCart(config) {
  const promise = axios.post(`${API_ENDPOINT_URL}/cart`,  config);
  return promise;
}

export {
  postSignIn,
  postSignUp,
  getProducts,
  getProductsInPromotion,
  getUser,
  putUser,
  getProductsByCategory,
  getProductsById,
  postProduct,
  getCart,
  deleteCart,
  postCart,
};
