import {combineReducers} from 'redux';
import loginReducer from "./login";
import authReducer from "./auth";
import tokenLoginReducer from "./app";
import productListReducer from "./product-list";
import productDetailReducer from "./product-detail"
import productEditReducer from "./product-edit"
import productAddReducer from "./product-add"
import registerReducer from "./register"
import userDetailReducer from "./userdetail"
import ProductAddBasketReducer from "./addToBasket"

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    auth: authReducer,
    app: tokenLoginReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    productEdit: productEditReducer,
    productAdd: productAddReducer,
    user: userDetailReducer,
    basket: ProductAddBasketReducer
});

export default rootReducer;
