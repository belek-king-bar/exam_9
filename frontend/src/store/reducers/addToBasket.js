import {PRODUCT_ADD_BASKET} from "../actions/addToBasket";
import {PRODUCT_ADD_STATE} from "../actions/addToBasket";


const initialState = {
    product: {}
};

const productAddBasketReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_ADD_BASKET:
            return {...state, product: state.product + action.product};
        case PRODUCT_ADD_STATE:
            return {...state, product: action.product};
        default:
            return state
    }
};


export default productAddBasketReducer;