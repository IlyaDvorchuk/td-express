import React from 'react';
import './box-not-found-category.scss'
import {Link} from "react-router-dom";

const BoxNotFoundCategory = () => {
    return (
        <div className={'not-found'}>
            <img src="/images/svg/categories/category-not-found.svg" alt="" className={'not-found__img'}/>
            <h3 className={'not-found__title'}>
                В этой категории пока нет товаров
            </h3>
            <div>
                <p className={'not-found__paragraph category-not-p'}>
                    В этой категории еще нет товаров. Станьте первым, кто будет продавать их на td-market! <Link to={'/registration'} className={'not-found__link'}>Узнать подробнее</Link>
                </p>
            </div>

        </div>
    );
};

export default BoxNotFoundCategory;