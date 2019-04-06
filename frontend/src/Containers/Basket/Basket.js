import React, {Component, Fragment} from 'react';
import { ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from "react-redux";

class Basket extends Component {


    render() {
        console.log(this.props.basket.product);
        return <Fragment>
                <ListGroup>
                    {this.props.basket.product.map(product => {
                    return <ListGroupItem className='bg-dark text-warning mb-2'>
                            <span>{product.name}</span>
                            <span> {product.price} сом</span>
                        </ListGroupItem>
                        })}
            </ListGroup>
        </Fragment>
    }
}


const mapStateToProps = (state) => ({
    basket: state.basket,
});

const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Basket);