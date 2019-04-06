import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {loadProduct} from "../../store/actions/product-edit";
import {connect} from "react-redux";
import ProductCategories from '../../Components/ProductCategories/ProductCategories.js'
import {Button} from 'reactstrap'
import {addToBasket} from "../../store/actions/addToBasket";
import {Row} from "reactstrap"


class ProductDetail extends Component {
    componentDidMount() {
        this.props.loadProduct(this.props.match.params.id);
    }

    render() {


        if (!this.props.productDetail.product) return null;

        const {name, description, arrival_date, categories, id, images} = this.props.productDetail.product;
        console.log(arrival_date);
        const {is_admin, username} = this.props.auth;

        return <div className="mb-4">
                <Row>
                    {images ? images.map(image =>
                        <div className="mr-5 mb-3 text-center">
                            <img className="img-fluid rounded" src={image.images} style={{width: 300, height: 200}}/>
                        </div>
                    ) : null}
                </Row>

            <h1>{name}</h1>

            {categories ? <ProductCategories categories={categories}/> : null}

            <p className="text-secondary">Дата создание: {arrival_date}</p>
            {description ? <p>{description}</p> : null}

            {is_admin ? <NavLink to={'/products/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
                : null}

            {username ? <Button className="btn btn-warning mr-3" onClick={() => this.props.addToBasket(this.props.productDetail.product)}>Добавить в корзину</Button>
                : null}

            {/* назад */}
            <NavLink to='' className="btn btn-primary">Products</NavLink>

        </div>;
    }
}
const mapStateToProps = state => {
    return {
        productDetail: state.productDetail,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadProduct: (id) => dispatch(loadProduct(id)),
        addToBasket: (data) => dispatch(addToBasket(data))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(ProductDetail);