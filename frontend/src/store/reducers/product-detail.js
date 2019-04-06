import {PRODUCT_LOAD_SUCCESS} from "../actions/product-edit";

const initialState = {
    product: null
};

const productDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LOAD_SUCCESS:
            const categories = action.product.categories.map(category => category);
            const product = {...action.product, categories};
            return {...state, product};
        default:
            return state
    }
};


export default productDetailReducer;