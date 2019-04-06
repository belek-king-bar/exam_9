import {PRODUCTS_LIST_SUCCESS} from "../actions/product-list";

const initialState = {
    products: [],
};

const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LIST_SUCCESS:
            return {...state, products: action.products};
        default:
            return state;
    }
};

export default productListReducer;