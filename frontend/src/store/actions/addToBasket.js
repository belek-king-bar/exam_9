export const PRODUCT_ADD_BASKET = "PRODUCT_ADD_BASKET";

export const addToBasket = (data) => {
    return dispatch => {
        localStorage.setItem('product', data);
        console.log(data);
        return dispatch({type: PRODUCT_ADD_BASKET, product: data});
    }
};

export const PRODUCT_ADD_STATE = "PRODUCT_ADD_STATE";

export const addToState = () => {
    return dispatch => {
        let product = localStorage.getItem('product');
        return dispatch({type: PRODUCT_ADD_STATE, product: product})
    }
};