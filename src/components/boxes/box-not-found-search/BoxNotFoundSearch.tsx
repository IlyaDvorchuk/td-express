import React from 'react';
import './box-not-found-search.scss'
import {Link} from "react-router-dom";

const BoxNotFoundSearch = () => {
    return (
        <div className={'not-found'}>
            <img src="/images/svg/search/search-not-found.svg" alt="" className={'not-found__img'}/>
            <h3 className={'not-found__title'}>
                Мы не нашли ничего по вашему запросу
            </h3>
            <div>
                <p className={'not-found__paragraph'}>
                    Проверьте, нет ли опечатки в названии товара
                </p>
                <p className={'not-found__paragraph'}>
                    Попробуйте упростить или сократить ваш запрос
                </p>
                <p className={'not-found__paragraph'}>
                    Возможно, у нас еще нет интересующего вас товара. Станьте первым, кто будет продавать его на td-market! <Link to={'/registration'} className={'not-found__link'}>Узнать подробнее</Link>
                </p>
            </div>

        </div>
    );
};

export default BoxNotFoundSearch;