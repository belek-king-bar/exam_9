import axios from "axios";
import {PRODUCTS_URL} from "../../api_urls";

export const DELETE_SUCCESS = 'DELETE_SUCCESS';


export const deleteProduct = (id) => {
    return dispatch => {
        return axios.delete(PRODUCTS_URL + id + '/', {
                headers: {
                    Authorization: "Token " + localStorage.getItem('auth-token')
                }
            }).then(response => {
            console.log(response);
            return dispatch({type: DELETE_SUCCESS})
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    }
};