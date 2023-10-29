import React, {useEffect, useMemo, useState} from 'react';
import './сreate-good-selects.scss'
import Select from "react-select";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {ICategory, ISection, ISubcategory} from "../../../../models/ICategories";
import {fetchCategories} from "../../../../store/reducers/categories/CategoriesCreators";
import {IProductCard} from "../../../../models/IProductCard";

interface IProps {
    selectedCategory: ICategory | null;
    setSelectedCategory: (category: ICategory | null) => void;
    selectedSubCategory: ISubcategory | null;
    setSelectedSubCategory: (subcategory: ISubcategory | null) => void;
    selectedType: ISection | null;
    setSelectedType: (type: ISection | null) => void;
    card: IProductCard | null
}


const CreateGoodSelects = ({
                               selectedCategory,
                               setSelectedCategory,
                               selectedSubCategory,
                               setSelectedSubCategory,
                               selectedType,
                               setSelectedType,
                               card
                           }: IProps) => {
    const dispatch = useAppDispatch();
    const {categories} = useAppSelector(state => state.categoriesReducer);
    const [isSubcategoryDisabled, setIsSubcategoryDisabled] = useState(true);
    const [subcategories, setSubcategories] = useState<Array<ISubcategory>>([]);
    const [isTypeDisabled, setIsTypeDisabled] = useState(true);
    const [types, setTypes] = useState<Array<ISection>>([]);

    useEffect(() => {
        if (categories.length < 1) {
            dispatch(fetchCategories());
             if (card) {

             }
        }
    }, [categories, dispatch, card]);

    useEffect(() => {
        if (card && categories) {
            if (typeof card.categories.category === 'object') {
                const currentCategory = categories.find(category => category._id === card.categories.category.id)
                if (currentCategory) {
                    setSelectedCategory(currentCategory)
                    const currentSubCategory = currentCategory.children.find(category => category._id === card.categories.subcategory.id)
                    if (currentSubCategory) {
                        setSelectedSubCategory(currentSubCategory)
                            // @ts-ignore
                            const currentType = currentSubCategory.children.find(category => category._id === card.categories.section?.id)
                            if (currentType) {
                                setSelectedType(currentType)
                            } else {
                                console.log('hey brus')
                                setSelectedType({name: '', _id: 'missing'})
                            }
                    }
                }
            }
        }
    }, [card, categories])

    const subcategory = useMemo(() => {
        return (subcategories && subcategories.length > 0) ?
            subcategories.map((subcategory: { name: any; }) => ({ value: subcategory.name, label: subcategory.name }))
            : []
    }, [subcategories])

    const onChangeCategory = (e: any) => {
        const {value} = e
        const option = categories.find(
            (category) => category.name.toLowerCase() === value.toLowerCase()
        );
        if (option) {
            if (selectedCategory && selectedCategory.name !== value) {
                setSelectedSubCategory(null)
                setSelectedType(null)
            }
            setSelectedCategory(option);
            setSubcategories(option.children);
        }
    };

    const onChangeSubcategory = (e: any) => {
        const {value} = e
        const option = subcategories.find(
            (category) => category.name.toLowerCase() === value.toLowerCase()
        );
        if (option) {
            if (selectedSubCategory && selectedSubCategory.name !== value) {
                setSelectedType(null)
            }
            setSelectedSubCategory(option);
            if (option.children.length === 0) {
                setSelectedType({name: '', _id: 'missing'})
                setIsTypeDisabled(true)
            }
            setTypes(option.children)
        }
    };

    const onChangeType = (e: any) => {
        const {value} = e
        const option = types.find(
            (type) => type.name.toLowerCase() === value.toLowerCase()
        );
        if (option) {
            setSelectedType(option);
        }
    };

    useEffect(() => {
        if (selectedCategory) {
            setIsSubcategoryDisabled(false)
        }
    }, [selectedCategory, isSubcategoryDisabled])

    useEffect(() => {
        if (selectedSubCategory && selectedSubCategory.children.length) {
            setIsTypeDisabled(false)
        }
    }, [selectedSubCategory, isTypeDisabled])

    return (
        <>
            <div className={'form-select'}>
                <label className={'label'}>Категория</label>
                <Select
                    placeholder={'Выбрать категорию'}
                    className={'select-input form-select__select'}
                    classNamePrefix={'select'}
                    options={categories.map((category: { name: string; }) => ({ value: category.name, label: category.name }))}
                    value={selectedCategory ? { value: selectedCategory.name, label: selectedCategory.name } : null}
                    onChange={onChangeCategory}
                    isDisabled={categories.length < 1}
                    // defaultValue={card ? card.categories.category : ''}
                />
            </div>
            <div className={'form-select'}>
                <label className={'label'}>Подкатегория</label>
                <Select
                    placeholder={'Выбрать подкатегорию'}
                    className={'select-input form-select__select'}
                    classNamePrefix={'select'}
                    isDisabled={isSubcategoryDisabled}
                    options={subcategory}
                    value={selectedSubCategory ? { value: selectedSubCategory.name, label: selectedSubCategory.name } : null}
                    onChange={onChangeSubcategory}
                />
            </div>
            <div className={'form-select'}>
                <label className={'label'}>Тип</label>
                <Select
                    placeholder={'Выбрать тип'}
                    className={'select-input form-select__select'}
                    classNamePrefix={'select'}
                    isDisabled={isTypeDisabled}
                    options={types.map((type: { name: any; }) => ({ value: type.name, label: type.name }))}
                    value={selectedType ? { value: selectedType.name, label: selectedType.name } : null}
                    onChange={onChangeType}
                />
            </div>
        </>
    );
};

export default CreateGoodSelects;
