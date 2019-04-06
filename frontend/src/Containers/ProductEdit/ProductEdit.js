import React, {Component, Fragment} from 'react'
import ProductForm from "../../Components/ProductForm/ProductForm.js";
import {loadProduct, PRODUCT_EDIT_SUCCESS, saveProduct} from "../../store/actions/product-edit";
import {connect} from "react-redux";


class ProductEdit extends Component {
    componentDidMount() {
        this.props.loadProduct(this.props.match.params.id);
    }

    // обработчик отправки формы
    formSubmitted = (movie) => {
        const {auth} = this.props;
        return this.props.saveProduct(movie, auth.token).then(result => {
            if(result.type === PRODUCT_EDIT_SUCCESS) {
                this.props.history.push('/products/' + result.product.id);
            }
        });
    };

    render() {
        const {product, errors} = this.props.productEdit;
        return <Fragment>
            {/* алёрт здесь больше не выводится, вместо него вывод ошибок внутри формы */}
            {product ? <ProductForm onSubmit={this.formSubmitted} product={product} errors={errors}/> : null}
        </Fragment>
    }
}


const mapStateToProps = state => {
    return {
        productEdit: state.productEdit,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadProduct: (id) => dispatch(loadProduct(id)),  // прокидываем id в экшен-крейтор loadMovie.
        saveProduct: (product, token) => dispatch(saveProduct(product, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(ProductEdit);