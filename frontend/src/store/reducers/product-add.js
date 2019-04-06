import {PRODUCT_ADD_ERROR, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS} from "../actions/product-add";

const initialState = {
    product: null,
    errors: {}
};

const productAddReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_ADD_REQUEST:
            return {...state, errors: {}};
        case PRODUCT_ADD_SUCCESS:
            return {...state, product: action.product};
        case PRODUCT_ADD_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default productAddReducer;