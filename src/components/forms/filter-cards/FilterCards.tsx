import React, {ChangeEvent, useEffect, useState} from 'react';
import './filter-cards.scss'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {filterSlice} from "../../../store/reducers/filter/FilterSlice";
import {IColor} from "../../../models/IColor";
import ColorCheckboxes from "../../inputs/color-checkboxes/ColorCheckboxes";
import {ValidateNumberInput} from "../../../utils/validateNumberInput";


const trackStyle = {
    backgroundColor: '#643ABE', // Задайте желаемый цвет для слайдера
};

const FilterCards = () => {
    const dispatch = useAppDispatch()
    const {
        maxPrice, minPrice, isReset
    } = useAppSelector(state => state.filterReducer)
    const {setCurrentMinPrice, setCurrentMaxPrice, setIsChangeTrue, setColors} = filterSlice.actions
    const [valuesPrice, setValuesPrice] = useState({
        min: '',
        max: ''
    })
    const [debouncedValues, setDebouncedValues] = useState([minPrice, maxPrice]);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [minDebounceTimer, setMinDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [maxDebounceTimer, setMaxDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [selectedColors, setSelectedColors] = useState<IColor[]>([]);

    useEffect(() => {
        setDebouncedValues([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    useEffect(() => {
        if (minPrice !== -Infinity) {
            setValuesPrice({
                min: minPrice?.toString(),
                max: maxPrice?.toString(),
            })
        }
    }, [minPrice, maxPrice])

    useEffect(() => {
        if (isReset) setSelectedColors([])
    }, [isReset])

    useEffect(() => {
        dispatch(setColors(selectedColors.map(color => color.name)))
    }, [dispatch, selectedColors, setColors])

    const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        ValidateNumberInput.getValidInput(e.target.value)
        const validInput = ValidateNumberInput.getValidInput(e.target.value)

        setValuesPrice({
            ...valuesPrice,
            min: validInput
        });

        const numberPrice = +validInput.replace(/,/g, '.');

        setDebouncedValues([
            numberPrice,
            debouncedValues[1],
        ]);

        if (!isNaN(numberPrice)) {
            // Отменяем предыдущий таймер задержки, если он существует
            if (minDebounceTimer) {
                clearTimeout(minDebounceTimer);
            }

            // Устанавливаем новый таймер задержки
            const newMinDebounceTimer = setTimeout(() => {
                dispatch(setCurrentMinPrice(numberPrice));
                dispatch(setIsChangeTrue());
            }, 500); // Задержка в миллисекундах (в данном случае 500 мс)

            // Устанавливаем новый таймер задержки
            setMinDebounceTimer(newMinDebounceTimer);
        }

        if (validInput === '') {
            dispatch(setCurrentMinPrice(minPrice));
            dispatch(setIsChangeTrue());
        }
    };

    const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        const validInput = e.target.value.replace(/[^0-9.,\s]/g, '');

        setValuesPrice({
            ...valuesPrice,
            max: validInput
        });

        const numberPrice = +validInput.replace(/,/g, '.');

        setDebouncedValues([
            debouncedValues[0],
            numberPrice
        ]);

        if (!isNaN(numberPrice)) {
            // Отменяем предыдущий таймер задержки, если он существует
            if (maxDebounceTimer) {
                clearTimeout(maxDebounceTimer);
            }

            // Устанавливаем новый таймер задержки
            const newMaxDebounceTimer = setTimeout(() => {
                dispatch(setCurrentMaxPrice(numberPrice));
                dispatch(setIsChangeTrue());
            }, 500); // Задержка в миллисекундах (в данном случае 500 мс)

            // Устанавливаем новый таймер задержки
            setMaxDebounceTimer(newMaxDebounceTimer);
        }

        if (validInput === '') {
            dispatch(setCurrentMaxPrice(maxPrice));
            dispatch(setIsChangeTrue());
        }
    };

    const handleDebouncedChange = (valuesRange: number | number[]) => {

        if (Array.isArray(valuesRange) && valuesRange.length === 2) {
            setDebouncedValues(valuesRange)
            // Отменяем предыдущий таймер задержки, если он существует
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            // Устанавливаем новый таймер задержки
            const newDebounceTimer = setTimeout(() => {
                dispatch(setCurrentMinPrice(valuesRange[0]));
                dispatch(setCurrentMaxPrice(valuesRange[1]));
                dispatch(setIsChangeTrue());
                setValuesPrice({
                    min: valuesRange[0].toString(),
                    max: valuesRange[1].toString(),
                });
            }, 500); // Задержка в миллисекундах (в данном случае 500 мс)

            // Устанавливаем новый таймер задержки
            setDebounceTimer(newDebounceTimer);
        }
    };

    const onCleanFilter = (e: any) => {
        e.preventDefault()

        dispatch(filterSlice.actions.setCurrentMaxPrice(maxPrice))
        dispatch(filterSlice.actions.setCurrentMinPrice(minPrice))
        dispatch(filterSlice.actions.setColors([]))

        setValuesPrice({
            min: minPrice.toString(),
            max: maxPrice.toString()
        })
        setDebouncedValues([minPrice, maxPrice])
        setSelectedColors([])
    }

    return (
        <aside className={'filter'}>
            <h3>Цена, руб</h3>
            <div className={'filter__inputs'}>
                <div>
                    <label htmlFor="min-price" className={'label'}>От</label>
                    <input
                        className={'modalInput modalInput_light'}
                        type="number"
                        id="min-price"
                        value={valuesPrice.min}
                        placeholder={minPrice?.toString()}
                        onInput={onChangeMin}
                    />
                </div>
                <div>
                    <label htmlFor="max-price" className={'label'}>От</label>
                    <input
                        className={'modalInput modalInput_light'}
                        type="number"
                        id="max-price"
                        value={valuesPrice.max}
                        onInput={onChangeMax}
                        placeholder={maxPrice?.toString()}
                    />
                </div>
            </div>
            <div className={'filter__range'}>
                <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    trackStyle={[trackStyle]}
                    handleStyle={trackStyle}
                    defaultValue={[minPrice, maxPrice]}
                    value={debouncedValues}
                    onChange={handleDebouncedChange}
                />
            </div>
            <div className={'filter__colors'}>
                <h3>Цвет</h3>
                <ColorCheckboxes
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                    isPagination={true}
                />
            </div>
            <button className={'button button_light filter__button'} onClick={onCleanFilter}>
                Очистить всё
            </button>
        </aside>
    );
};

export default FilterCards;
