import React, {ReactNode, useEffect, useState} from 'react';
import './box-category.scss'
import {Link, useParams} from "react-router-dom";
import Select from "react-select";
import {GoodsService} from "../../../services/GoodsService";
import {ICategory, ISection, ISubcategory} from "../../../models/ICategories";
import FilterCards from "../../forms/filter-cards/FilterCards";

interface IProps {
    children: ReactNode,

}

const BoxCategory = ({children}: IProps) => {
    const { id } = useParams();
    const [category, setCategory] = useState<ICategory | ISubcategory | ISection | null>(null)
    const [isFilterMobile, setIsFilterMobile] = useState(false)

    const getCategory = async (id: string) => {
        const response = await GoodsService.getCategory(id)
        setCategory(response.data)
    }

    useEffect(() => {
        if (id) getCategory(id)
    }, [id])

    return (
        <div className={'category'}>
            <div className={'category__header'}>
                {category?.type === 'category' && <div className={'category__categories'}>
                    <Link to={'/'}>Главная</Link> / <span>{category.name}</span>
                </div>}
                {category?.type === 'subcategory' && <div className={'category__categories'}>
                    <Link to={'/'}>Главная</Link> / <Link to={`/category/${category.parent}`}>{category?.parentName}</Link> / <span>{category.name}</span>
                </div>}
                <h3 className={'category__name'}>
                    {category?.name}
                </h3>
                <div className={'select'}>
                    <span className={'select__label category__label'}>Показать товары:</span>
                    <Select
                        // options={goodsOptions}
                        // defaultValue={goodsOptions[0]}
                        className={'select-input favorites__select-input category__select'}
                        classNamePrefix={'select'}
                        isSearchable={false}
                    />
                </div>
                <div className={'category__filter'} onClick={() => setIsFilterMobile(true)}>
                    <p>
                        Фильтры
                    </p>
                    <img src="/images/svg/filter/filters.svg" alt="Фильтры"/>
                </div>
            </div>
            <div className={'category__main'}>
                <FilterCards isFilterMobile={isFilterMobile} setIsFilterMobile={setIsFilterMobile}
                />
                <div className={'category__container'}>
                    {children}
                </div>
            </div>

        </div>
    );
};

export default BoxCategory;
