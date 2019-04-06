import axios from "axios";
import {PRODUCTS_URL} from "../../api_urls";

export const PRODUCT_EDIT_REQUEST = "PRODUCT_EDIT_REQUEST";
export const PRODUCT_EDIT_SUCCESS = "PRODUCT_EDIT_SUCCESS";
export const PRODUCT_EDIT_ERROR = "PRODUCT_EDIT_ERROR";

export const PRODUCT_LOAD_SUCCESS = "MOVIE_LOAD_SUCCESS";

export const loadProduct = (id) => {
    return dispatch => {
        axios.get(PRODUCTS_URL + id).then(response => {
            console.log(response.data);
            return dispatch({type: PRODUCT_LOAD_SUCCESS, product: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};


// этот метод не является экшеном,
// но его использует saveMovie, поэтому он здесь.
const gatherFormData = (product) => {
    let formData = new FormData();
    Object.keys(product).forEach(key => {
        const value = product[key];
        if (value) {
            if (Array.isArray(value)) {
                value.forEach(item => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        }
    });
    return formData;
};


export const saveProduct = (product, authToken) => {
    return dispatch => {
        const url = PRODUCTS_URL + product.id + '/';
        const formData = gatherFormData(product);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: PRODUCT_EDIT_REQUEST});

        return axios.put(url, formData, options).then(response => {
            console.log(response);
            // и здесь
            return dispatch({type: PRODUCT_EDIT_SUCCESS, product: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // и здесь
            return dispatch({type: PRODUCT_EDIT_ERROR, errors: error.response.data});
        });
    }
};
