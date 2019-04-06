import axios from "axios";
import {PRODUCTS_URL} from "../../api_urls";

export const PRODUCT_ADD_REQUEST = "PRODUCT_ADD_REQUEST";
export const PRODUCT_ADD_SUCCESS = "PRODUCT_ADD_SUCCESS";
export const PRODUCT_ADD_ERROR = "PRODUCT_ADD_ERROR";

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
        const formData = gatherFormData(product);
        const options = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + authToken
            }
        };

        dispatch({type: PRODUCT_ADD_REQUEST});
        // не забываем возвращать результаты,
        // чтобы в ProductEdit после успешной загрузки сделать редирект
        return axios.post(PRODUCTS_URL, formData, options).then(response => {
            console.log(response);
            // и здесь
            return dispatch({type: PRODUCT_ADD_SUCCESS, product: response.data});
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            // и здесь
            return dispatch({type: PRODUCT_ADD_ERROR, errors: error.response.data});
        });
    }
};

// пока без загрузки категорий для формы ProductForm.
// export const loadCategories = () => {return dispatch => {...}}