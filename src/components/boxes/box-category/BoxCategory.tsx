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
                <div className={'select'}>
                    <span className={'select__label'}>Показать товары:</span>
                    <Select
                        // options={goodsOptions}
                        // defaultValue={goodsOptions[0]}
                        className={'select-input favorites__select-input'}
                        classNamePrefix={'select'}
                        isSearchable={false}
                    />
                </div>
            </div>
            <div className={'category__main'}>
                <FilterCards
                />
                <div className={'category__container'}>
                    {children}
                </div>
            </div>

        </div>
    );
};

export default BoxCategory;
