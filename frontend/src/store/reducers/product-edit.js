import {PRODUCT_EDIT_ERROR, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LOAD_SUCCESS} from "../actions/product-edit";

const initialState = {
    product: null,
    errors: {}
};

const productEditReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LOAD_SUCCESS:
            const categories = action.product.categories.map(category => category);
            const product = {...action.product, categories};
            return {...state, product};
        case PRODUCT_EDIT_REQUEST:
            return {...state, errors: {}};
        case PRODUCT_EDIT_SUCCESS:
            return {...state, product: action.product};
        case PRODUCT_EDIT_ERROR:
            return {...state, errors: action.errors};
        default:
            return state
    }
};


export default productEditReducer;