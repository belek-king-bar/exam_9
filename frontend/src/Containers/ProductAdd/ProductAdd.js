import React, {Component, Fragment} from 'react';
import ProductForm from "../../Components/ProductForm/ProductForm.js";
import {PRODUCT_ADD_SUCCESS, saveProduct} from "../../store/actions/product-add";
import {connect} from "react-redux";


class ProductAdd extends Component {

    // обработчик отправки формы
    formSubmitted = (product) => {
        const {auth} = this.props;
        return this.props.saveProduct(product, auth.token).then(result => {
            if(result.type === PRODUCT_ADD_SUCCESS) {
                this.props.history.push('/products/' + result.product.id);
            }
        });
    };

    render() {
        const {errors} = this.props.productAdd;
        return <Fragment>
            <ProductForm onSubmit={this.formSubmitted} errors={errors}/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        productAdd: state.productAdd,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        saveProduct: (product, token) => dispatch(saveProduct(product, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(ProductAdd);