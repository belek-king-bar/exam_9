import React from 'react';
import './ProductCategories.css';


// Компонент, который выводит кнопки категорий для фильма.
const ProductCategories = (props) => {
    const {categories} = props;
    return <p>{categories.map(
        category => <span key={category.id} className="badge badge-info category-badge">
            {category.name}
        </span>
    )}</p>;
};


export default ProductCategories;