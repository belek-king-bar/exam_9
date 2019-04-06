import {PRODUCT_ADD_BASKET} from "../actions/addToBasket";
import {PRODUCT_ADD_STATE} from "../actions/addToBasket";


const initialState = {};

const productAddBasketReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_ADD_BASKET:
            if (state[action.product.id]){
                const newState = {...state};
                const product = newState[action.product.id];
                product.count = product.count + 1;
                newState[action.product.id] = product;
                return newState;
            }
            else {
                const product = {id:action.product.id, name: action.product.name, price: action.product.price, count: 1};
                const newState = {...state};
                newState[action.product.id] = product;
                return newState;
            }
        case PRODUCT_ADD_STATE:
            return {...state, product:  action.product};
        default:
            return state
    }
};


export default productAddBasketReducer;