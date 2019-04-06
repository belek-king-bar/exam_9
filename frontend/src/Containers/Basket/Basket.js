import React, {Component, Fragment} from 'react';
import { ListGroup, ListGroupItem} from 'reactstrap';
import {connect} from "react-redux";

class Basket extends Component {


    render() {
        const {name, price, count} = this.props.basket;
        console.log(this.props.basket.product);
        return <Fragment>
                <ListGroup>
                    <ListGroupItem className='bg-dark text-warning mb-2'>
                        <span>{name}</span>
                        <p>Цена: {price} сом</p>
                        <p>Количество: {count}</p>
                    </ListGroupItem>
                </ListGroup>
            </Fragment>
    }
}

const mapStateToProps = (state) => ({
    basket: state.basket
});


const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Basket);