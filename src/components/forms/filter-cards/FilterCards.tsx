import React, {useState} from 'react';
import './filter-cards.scss'
import TwoWayRange from "../../inputs/two-range/TwoRange";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const FilterCards = () => {
    const [range, setRange] = useState([0, 100]);

    const handleRangeChange = (newRange: number) => {
        // setRange(newRange);
    };

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
            <div>
                <Slider
                    range
                />
                <div>
                    <span>Min: {range[0]}</span>
                    <span>Max: {range[1]}</span>
                </div>
            </div>
            {/*<input className={'filter__range'} type="range"/>*/}
            <button className={'button button_light filter__button'}>Очистить всё</button>
        </aside>
    );
};

export default FilterCards;