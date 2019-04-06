import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import ProductList from "./Containers/ProductList/ProductList";
import ProductDetail from "./Containers/ProductDetail/ProductDetail";
import ProductAdd from "./Containers/ProductAdd/ProductAdd";
import ProductEdit from "./Containers/ProductEdit/ProductEdit";
import Layout from "./Components/Layout/Layout";
import Login from './Containers/Login/Login';
import Logout from './Containers/Logout/Logout';
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import Register from "./Containers/Register/Register";
import RegisterActivate from "./Containers/Register/RegisterActivate/RegisterActivate";
import UserDetail from './Containers/User/User';
import {tokenLogin} from "./store/actions/token-login";
import {connect} from "react-redux";
import Basket from './Containers/Basket/Basket';
import {addToState} from "./store/actions/addToBasket";


class App extends Component {
    componentDidMount() {
        this.props.tokenLogin();
        this.props.addToState()
    }


    render() {
        return (
                <BrowserRouter>
                    <Layout>
                        <div className="container">
                            <Switch>
                                <Route path="/login" component={Login}/>
                                <Route path="/logout" component={Logout}/>
                                <Route path="/register" component={Register} exact/>
                                <Route path="/register/activate" component={RegisterActivate}/>
                                <Route path="/register" component={Register}/>
                                <AuthRoute path="/users/:id" component={UserDetail}/>
                                <AuthRoute path="/basket" component={Basket}/>
                                <AuthRoute path="/products/add" component={ProductAdd}/>
                                <AuthRoute path="/products/:id/edit" component={ProductEdit}/>
                                {/* :id обозначает переменную id */}
                                <Route path="/products/:id" component={ProductDetail}/>
                                <Route path="/" component={ProductList} exact/>
                            </Switch>
                        </div>
                    </Layout>
                </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app,
});
const mapDispatchToProps = dispatch => ({
    tokenLogin: () => dispatch(tokenLogin()),
    addToState: () => dispatch(addToState())
});



export default connect(mapStateToProps, mapDispatchToProps)(App);