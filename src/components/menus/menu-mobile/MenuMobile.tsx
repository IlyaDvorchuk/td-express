import React, {useState} from 'react';
import './menu-mobile.scss'
// import Search from "../../search/Search";
import {useAppSelector} from "../../../hooks/redux";
import {API_URL} from "../../../http";
import {ICategory, ISubcategory} from "../../../models/ICategories";
import {useNavigate} from "react-router-dom";

interface IProps {
    isPressed: boolean,
    setIsPressed: (bool: boolean) => void
}

const MenuMobile = ({isPressed, setIsPressed}: IProps) => {
    const navigate = useNavigate()
    const {categories} = useAppSelector(state => state.categoriesReducer)
    const [activeCategory, setActiveCategory] = useState<ICategory | null>(null)
    const [activeSubCategory, setActiveSubCategory] = useState<ISubcategory | null>(null)

    const onSelectCategory = (categ: ICategory) => {
        setActiveCategory(categ)
        // setSelectSubCategory(null)
    }

    const onBack = (type: 'category' | 'subcategory') => {
        if (type === 'category') {
            setActiveCategory(null)
        } else if (type === 'subcategory') {
            setActiveSubCategory(null)
        }
    }

    const onNavigation = (to: string) => {
        navigate(to)
        setIsPressed(false)
    }

    const onSelectSubcategory = (subcategory: ISubcategory) => {
        if (subcategory.children.length === 0) {
            onNavigation(`/category/${subcategory._id}`)
        } else {
            setActiveSubCategory(subcategory)
        }
    }

    return (
        <div className={`mobile-menu ${isPressed && 'active'}`}>
            <div>
                <div className={'mobile-menu__search'}>
                    {/*<Search mobile={true}/>*/}
                </div>
                { !activeCategory && !activeSubCategory &&
                    categories.map((categ, index) => (
                        <div
                            onMouseEnter={() => onSelectCategory(categ)}
                            className={`main-categories__item`}
                            key={categ._id + index}
                        >
                            <img className={'icon'} src={`${API_URL}${categ.icon}`} alt=""/>
                            <div>
                                {categ.name}
                            </div>
                            <img className={'arrow-right'} src={'/images/svg/arrow-right-noactive.svg'}
                                 alt={'Посмотреть подкатегории'}/>
                        </div>
                    ))
                }
                {
                    activeCategory && !activeSubCategory &&
                    <>
                        <div className={'mobile-menu__title'}>
                            <img
                                src="/images/svg/arrow-left-bold.svg"
                                alt="Вернуться назад"
                                onClick={() => onBack('category')}
                            />
                            <div
                                onClick={() => onNavigation(`/category/${activeCategory._id}`)}
                                className={'mobile-menu__link'}
                            >
                                {activeCategory.name}
                            </div>
                        </div>
                        {activeCategory.children.map((subcat, index) => (
                            <div
                                key={subcat._id + index}
                                className={'mobile-menu__subcategory'}
                                onClick={() => onSelectSubcategory(subcat)}
                            >
                                <div className={'mobile-menu__link_sub'}>
                                    {subcat.name}
                                </div>
                                {subcat.children.length > 0 &&
                                    <img className={'arrow-right'} src={'/images/svg/arrow-right-noactive.svg'}
                                         alt={'Посмотреть подкатегории'}/>
                                }
                            </div>
                        ))}
                    </>
                }
                {
                    activeSubCategory &&
                    <>
                        <div className={'mobile-menu__title'}>
                            <img
                                src="/images/svg/arrow-left-bold.svg"
                                alt="Вернуться назад"
                                onClick={() => onBack('subcategory')}
                            />
                            <div
                                onClick={() => onNavigation(`/category/${activeSubCategory._id}`)}
                                className={'mobile-menu__link'}
                            >
                                {activeSubCategory.name}
                            </div>
                        </div>
                        {activeSubCategory.children.map(section => (
                            <div
                                onClick={() => onNavigation(`/category/${section._id}`)}
                                key={section._id}
                                className={'mobile-menu__subcategory'}
                            >
                                <div className={'mobile-menu__link_sub'}>
                                    {section.name}
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>

        </div>
    );
};

export default MenuMobile;
