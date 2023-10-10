import React from 'react';
import './filter-cards.scss'

const FilterCards = () => {
    return (
        <aside className={'filter'}>
            <h3>Цена, руб</h3>
            <div className={'filter__inputs'}>
                <div>
                    <label htmlFor="min-price" className={'label'}>От</label>
                    <input className={'modalInput modalInput_light'} type="text" id="min-price"/>
                </div>
                <div>
                    <label htmlFor="max-price" className={'label'}>От</label>
                    <input className={'modalInput modalInput_light'} type="text" id="max-price"/>
                </div>
            </div>
            <button className={'button button_light filter__button'}>Очистить всё</button>
        </aside>
    );
};

export default FilterCards;