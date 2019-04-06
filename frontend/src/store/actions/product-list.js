import axios, {PRODUCTS_URL} from "../../api_urls";


export const PRODUCTS_LIST_SUCCESS = "PRODUCTS_LIST_SUCCESS";


export const loadProducts = () => {
    return dispatch => {
        axios.get(PRODUCTS_URL)
            .then(response => {
                console.log(response.data);
                return dispatch({type: PRODUCTS_LIST_SUCCESS, products: response.data});
            })
            .catch(error => console.log(error));
    }
};