import React, {Fragment, Component} from 'react'
import ProductCard from "../../Components/ProductCard/ProductCard";
import {loadProducts} from "../../store/actions/product-list";
import {DELETE_SUCCESS, deleteProduct} from "../../store/actions/delete";
import {connect} from "react-redux";


class ProductList extends Component {
    componentDidMount() {
        this.props.loadProducts();
    }



    productDeleted = (productId) => {
        console.log(this.props.auth.is_admin);
        if(this.props.auth.is_admin) {
            this.props.deleteProduct(productId).then(result => {
                if(result.type === DELETE_SUCCESS) {
                    this.props.loadProducts()
                }
            })
        } else {
            this.props.history.push({
                pathname: "/login",
                state: {next: this.props.location}
            })
        }
    };

    render() {
        console.log(this.props.productList);
        return <Fragment>
            <div className='row'>
                {this.props.productList.products.map(product => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={product.id}>
                        <ProductCard product={product} onDelete={() => this.productDeleted(product.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => ({
    productList: state.productList,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    loadProducts: () => dispatch(loadProducts()),
    deleteProduct: (id) => dispatch(deleteProduct(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);