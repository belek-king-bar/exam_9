import React from 'react';
import Card from "../UI/Card/Card";


const ProductCard = props => {
    const {product, onDelete} = props;

    // достаём данные из movie
    const {name, id, images} = product;

    // создаём объект с данными (текстом и url) для ссылки
    const link = {
        text: 'Read more',
        url: '/products/' + id
    };

    // возвращаем (рисуем) карточку с данными из movie и ссылкой.
    return <Card header={name} image={images[0]} link={link} onDelete={onDelete} className='h-100 mb-4'/>;
};


export default ProductCard;