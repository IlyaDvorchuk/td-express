import React, {useEffect, useState} from 'react';
import './menu.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchCategories} from "../../store/reducers/categories/CategoriesCreators";
import {ISections, ISubcategories} from "../../models/ICategories";
import {Link} from "react-router-dom";

const Menu = () => {
    const [isPressed, setIsPressed] = useState(false)
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state => state.categoriesReducer)
    const [activeCategory, setActiveCategory] = useState(0)
    const [activeSubCategory, setActiveSubCategory] = useState(0)
    const [selectCategory, setSelectCategory] = useState<ISubcategories[] | null>(null);
    const [selectSubCategory, setSelectSubCategory] = useState<ISections[] | null>(null);
    const [parentName, setParentName] = useState('')

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    useEffect(() => {
        if (categories.length > 0) {
            setSelectCategory(categories[activeCategory].children)
        }
    }, [categories, activeCategory])

    const onSelectCategory = (index: number) => {
        setActiveCategory(index)
    }

    const onSelectSubCategory = (subcat: ISubcategories, index: number) => {
        setActiveSubCategory(index)
        setSelectSubCategory(subcat.children)
        console.log('subcat', subcat)
        if (subcat.children.length > 0) {
            setParentName(subcat.alternateName)
        } else {setParentName('')}

    }

    useEffect(() => {
        console.log('selectSubCategory', selectSubCategory)
    }, [selectSubCategory])

    return (
        <div>
            <div className={'hamburger-container'}>
                <div className={`hamburger ${isPressed && 'active'}`} onClick={() => setIsPressed(!isPressed)}>
                    <div className={`hamburger__item line-1 ${isPressed && 'active'}`}/>
                    <div className={'hamburger__item line-2'}/>
                    <div className={'hamburger__item line-3'}/>
                </div>
            </div>
            <div className={`menu ${isPressed && 'active'}`}>
                <div className={'main-categories'}>
                    {
                        categories.map((categ, index) => (
                            <div
                                onClick={() => onSelectCategory(index)}
                                className={`main-categories__item ${index === activeCategory && 'active'}`}
                                key={index}
                            >
                                <img className={'icon'} src={categ.icon} alt=""/>
                                <div>
                                    {categ.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={'subcategories'}>
                    {selectCategory && selectCategory.map((subcat, index) => (
                        <div
                            className={`subcategory-wrapper ${index === activeSubCategory && 'active'}`}
                            key={index} onClick={() => onSelectSubCategory(subcat ,index)}
                        >
                            <h3 className={'subcategory'}>{subcat.name}</h3>
                            {subcat.children.length > 0 &&
                                <img src={ index === activeSubCategory ? '/images/svg/arrow-right.svg' : '/images/svg/arrow-right-noactive.svg'}
                                     alt={'Посмотреть подкатегории'}/>}
                        </div>
                    ))}
                </div>
                <div className={'sections'}>
                    <Link to={'/'} className={'sections__parent-name'}>{parentName}</Link>
                    {selectSubCategory && selectSubCategory?.map((section, index) => (
                        <Link to={'/'} key={index} className={'sections__item'}>
                            {section.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
