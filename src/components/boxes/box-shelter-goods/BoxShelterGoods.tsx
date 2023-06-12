import React from 'react';
import './box-shelter-goods.scss'
import '../../../styles/elements/buttons.scss'
import '../../../styles/elements/selects.scss'
import Select from "react-select";
import {useNavigate} from "react-router-dom";

const goodsOptions = [
    {
        value: 'все',
        label: 'все'
    },
    {
        value: 'в продаже',
        label: 'в продаже'
    },
    {
        value: 'нет в наличии',
        label: 'нет в наличии'
    },
    {
        value: 'отклонённые',
        label: 'отклонённые'
    },
    {
        value: 'в модерации',
        label: 'в модерации'
    },
]

const filterOptions = [
    {
        value: 'сначала с высоким рейнтингом',
        label: 'сначала с высоким рейнтингом'
    },
    {
        value: 'сначала с низким рейтингом',
        label: 'сначала с низким рейтингом'
    },
    {
        value: 'по дате: сначала старые',
        label: 'по дате: сначала старые'
    },
    {
        value: 'по дате: сначала новые',
        label: 'по дате: сначала новые'
    },
]

const BoxShelterGoods = () => {
    const navigate = useNavigate()

    const onCreateGood = (e: any) => {
        e.preventDefault()
        console.log('hey bro')
        navigate('create')
    }

    return (
        <div className={'goods'}>
            <div className={'goods__selects'}>
                <div className={'select'}>
                    <span className={'select__label'}>Показать товары:</span>
                    <Select options={goodsOptions} defaultValue={goodsOptions[0]} className={'select-input select-input_goods'} classNamePrefix={'select'}/>
                </div>
                <div className={'select'}>
                    <span className={'select__label'}>Отсортировать:</span>
                    <Select options={filterOptions} defaultValue={filterOptions[0]} className={'select-input select-input_filter'} classNamePrefix={'select'}/>
                </div>
                <button className={'button button_dark goods__button'} onClick={onCreateGood}>Добавить товар</button>
            </div>
        </div>
    );
};

export default BoxShelterGoods;
