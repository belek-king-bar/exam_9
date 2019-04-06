import React, {Component, Fragment} from 'react';
import { ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from "react-redux";

class Basket extends Component {


    render() {
        console.log(this.props.product);
        return this.props.basket.product.map(product => {
            return <Fragment>
                <ListGroup>
                    <ListGroupItem className='bg-dark text-warning mb-2'>
                        <span>{product.name}</span>
                        <span> {product.price} сом</span>
                    </ListGroupItem>
                </ListGroup>
            </Fragment>
        })
    }
}

const mapStateToProps = (state) => state.basket;


const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Basket);