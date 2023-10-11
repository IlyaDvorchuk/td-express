import React, {ChangeEvent, useEffect, useState} from 'react';
import './filter-cards.scss'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {filterSlice} from "../../../store/reducers/filter/FilterSlice";


const trackStyle = {
    backgroundColor: '#643ABE', // Задайте желаемый цвет для слайдера
};

const FilterCards = () => {
    const dispatch = useAppDispatch()
    const {
        maxPrice, minPrice
    } = useAppSelector(state => state.filterReducer)
    const {setCurrentMinPrice, setCurrentMaxPrice} = filterSlice.actions
    const [valuesPrice, setValuesPrice] = useState({
        min: '',
        max: ''
    })

    useEffect(() => {
        if (minPrice !== -Infinity) {
            setValuesPrice({
                min: minPrice.toString(),
                max: maxPrice.toString(),
            })
        }
    }, [minPrice, maxPrice])

    const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        const validInput = e.target.value.replace(/[^0-9.,\s]/g, '');

        setValuesPrice({
            ...valuesPrice,
            min: validInput
        });

        const numberPrice = +validInput.replace(/,/g, '.')
        if (!isNaN(numberPrice)) {
            dispatch(setCurrentMinPrice(numberPrice))
        }

        if (validInput === '') {
            dispatch(setCurrentMinPrice(minPrice))
        }

    };

    const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        const validInput = e.target.value.replace(/[^0-9.,\s]/g, '');

        setValuesPrice({
            ...valuesPrice,
            max: validInput
        });

        const numberPrice = +validInput.replace(/,/g, '.')
        if (!isNaN(numberPrice)) {
            dispatch(setCurrentMaxPrice(numberPrice))
        }

        if (validInput === '') {
            dispatch(setCurrentMinPrice(maxPrice))
        }
    };

    return (
        <aside className={'filter'}>
            <h3>Цена, руб</h3>
            <div className={'filter__inputs'}>
                <div>
                    <label htmlFor="min-price" className={'label'}>От</label>
                    <input
                        className={'modalInput modalInput_light'}
                        type="text"
                        id="min-price"
                        value={valuesPrice.min}
                        placeholder={minPrice.toString()}
                        onChange={onChangeMin}
                    />
                </div>
                <div>
                    <label htmlFor="max-price" className={'label'}>От</label>
                    <input
                        className={'modalInput modalInput_light'}
                        type="text"
                        id="max-price"
                        value={valuesPrice.max}
                        onChange={onChangeMax}
                        placeholder={maxPrice.toString()}
                    />
                </div>
            </div>
            <div>
                <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    trackStyle={[trackStyle]}
                    handleStyle={trackStyle}
                />
            </div>
            {/*<input className={'filter__range'} type="range"/>*/}
            <button className={'button button_light filter__button'}>Очистить всё</button>
        </aside>
    );
};

export default FilterCards;
