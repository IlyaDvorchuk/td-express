import React, {useEffect, useState} from 'react';
import './menu.scss'
import {useAppSelector} from "../../../hooks/redux";
import {ISection, ISubcategory} from "../../../models/ICategories";
import {Link} from "react-router-dom";
import ButtonBurger from "../../buttons/button-burger/ButtonBurger";
import {API_URL} from "../../../http";

const Menu = () => {

    const [isPressed, setIsPressed] = useState(false)
    const {categories} = useAppSelector(state => state.categoriesReducer)
    const [activeCategory, setActiveCategory] = useState(0)
    const [activeSubCategory, setActiveSubCategory] = useState(0)
    const [selectCategory, setSelectCategory] = useState<ISubcategory[] | null>(null);
    const [selectSubCategory, setSelectSubCategory] = useState<ISection[] | null>(null);
    const [parentName, setParentName] = useState('')

    useEffect(() => {
        if (isPressed) {
            // Установите стиль overflow: hidden для элемента body при активации меню
            document.documentElement.style.overflow = 'hidden';
        } else {
            // Восстановите стиль overflow: auto для элемента body при деактивации меню
            document.documentElement.style.overflow = 'auto';
        }
    }, [isPressed]);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectCategory(categories[activeCategory].children)
        }
    }, [categories, activeCategory])

    const onSelectCategory = (index: number) => {
        setActiveCategory(index)
        setSelectSubCategory(null)
    }

    const onSelectSubCategory = (subcat: ISubcategory, index: number) => {
        setActiveSubCategory(index)
        setSelectSubCategory(subcat.children)
        if (subcat.children.length > 0) {
            setParentName(subcat.alternateName)
        } else setParentName('')

    }

    return (
        <div>
            <div className={'header-burger'}>
                <ButtonBurger isPressed={isPressed} setIsPressed={setIsPressed}/>
            </div>
            <div className={`menu ${isPressed && 'active'}`}>
                <div className={'main-categories'}>
                    {
                        categories.map((categ, index) => (
                            <Link
                                to={`/category/${categ._id}`}
                                onMouseEnter={() => onSelectCategory(index)}
                                onClick={() => setIsPressed(false)}
                                className={`main-categories__item ${index === activeCategory && 'active'}`}
                                key={index}
                            >
                                <img className={'icon'} src={`${API_URL}${categ.icon}`} alt=""/>
                                <div>
                                    {categ.name}
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className={'subcategories'}>
                    {selectCategory && selectCategory.map((subcat, index) => (
                        <div
                            className={`subcategory-wrapper ${index === activeSubCategory && 'active'}`}
                            key={index}
                            onMouseEnter={() => onSelectSubCategory(subcat ,index)}
                        >
                            <Link to={`/category/${subcat._id}`}
                                  className={'subcategory'}
                                  onClick={() => setIsPressed(false)}
                            >
                                {subcat.name}
                            </Link>
                            {subcat.children.length > 0 &&
                                <img src={ index === activeSubCategory ? '/images/svg/arrow-right.svg' : '/images/svg/arrow-right-noactive.svg'}
                                     alt={'Посмотреть подкатегории'}/>}
                        </div>
                    ))}
                </div>
                <div className={'sections'}>
                    <Link to={'/'} className={'sections__parent-name'}>{parentName}</Link>
                    {selectSubCategory && selectSubCategory?.map((section, index) => (
                        <Link to={`/category/${section._id}`}
                              key={index}
                              className={'sections__item'}
                              onClick={() => setIsPressed(false)}
                        >
                            {section.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
