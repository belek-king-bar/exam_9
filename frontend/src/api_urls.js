import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/v1';
const PRODUCTS_URL = '/products/';
const LOGIN_URL = '/login/';
const REGISTER_URL = '/register/';
const REGISTER_ACTIVATE_URL = '/register/activate/';
const USERS_URL = '/users/';
const TOKEN_LOGIN_URL = '/token-login/';
const CATEGORIES_URL = '/categories/';

const instance = axios.create({
    baseURL: BASE_URL
});



export {PRODUCTS_URL, BASE_URL, LOGIN_URL, REGISTER_URL,
    REGISTER_ACTIVATE_URL, USERS_URL, TOKEN_LOGIN_URL, CATEGORIES_URL}

export default instance;