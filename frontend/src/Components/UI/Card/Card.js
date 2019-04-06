import React from 'react';
import {NavLink} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";


// компонент, который представляет собой карточку, основанную на стилях Bootstrap,
// и рисует карточку с указанным хедером, картинкой и ссылкой.
// проверки нужны на тот случай, чтобы в разметке не появлялись лишние отступы,
// если данные для какой-то части карточки не переданы и она выводится пустая.
// props.className позволяет принимать дополнительные классы для карточки по нуждам использующего компонента.
const Card = props => {
    const {is_admin} = props.auth;

    return <div className={"card mt-3 text-center text-sm-left " + (props.className ? props.className : "")}>
        {props.image ? <img className="card-img-top" src={props.image}/> : null}
        {props.header || props.text || props.link ? <div className="card-body">
            {props.header ? <h5 className="card-title">{props.header}</h5> : null}
            {props.text ? <p className="card-text">{props.text}</p> : null}
            {/* ссылка NavLink (из роутера) для навигации между "страницами" */}
            {/* принимает два параметра в одном "флаконе": link = {url, text}.  */}
            {props.link ? <NavLink to={props.link.url} className="btn btn-primary">
                {props.link.text}
            </NavLink> : null}
            {is_admin ? <button type="button" className="ml-2 btn btn-warning" onClick={props.onDelete}>Delete</button>
                : null}
        </div> : null}
    </div>
};

const mapStateToProps = state => ({auth: state.auth});
// никаких дополнительных действий здесь не нужно
const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Card);