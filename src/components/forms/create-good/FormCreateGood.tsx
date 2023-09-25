import React, {useEffect, useMemo, useState} from 'react';
import './form-create-good.scss'
import '../../../styles/elements/selects.scss'
import '../../../styles/elements/buttons.scss'
import CreateGoodSelects from "./create-good-selects/CreateGoodSelects";
import CreateGoodDescription from "./create-good-description/CreateGoodDescription";
import CreateGoodPhotos from "./create-good-photos/CreateGoodPhotos";
import CreateGoodAdditional from "./create-good-additional/CreateGoodAdditional";
import CreateGoodPrice from "./create-good-price/CreateGoodPrice";
import CreateGoodDimensions from "./create-good-dimensions/CreateGoodDimensions";
import CreateGoodPoints from "./create-good-points/CreateGoodPoints";
import {ICategory, ISection, ISubcategory} from "../../../models/ICategories";
import {useForm, FormProvider} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {IProductCard, IType} from "../../../models/IProductCard";
import {createProductCard} from "../../../store/reducers/shelter/ShelterCreator";
import {Link, useNavigate} from "react-router-dom";
import {SIZES_CLOTHES, SIZES_CLOTHES_ID, SIZES_ID, SIZES_SHOE} from "../../../constants";
import CreateGoodSizes from "./create-good-sizes/CreateGoodSizes";
import CreateGoodQuantity from "./create-good-quantity/CreateGoodQuantity";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import CreateGoodColors from "./create-good-colors/CreateGoodColors";
import {ISelectedColor} from "../../../models/IColor";

const FormCreateGood = ({card} : {card: IProductCard | null}) => {
    const navigation = useNavigate()
    const dispatch = useAppDispatch()
    const methods = useForm();
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const {isCreateGoodCard, isUpdateCard} = useAppSelector(state => state.shelterReducer)
    const {updateCardFalse} = shelterSlice.actions

    const [parentSelectedCategory, setParentSelectedCategory] = useState<ICategory | null>(null);
    const [parentSelectedSubCategory, setParentSelectedSubCategory] = useState<ISubcategory | null>(null);
    const [parentSelectedType, setParentSelectedType] = useState<ISection | null>(null);
    const [description, setDescription] = useState('')
    const [generalImage, setGeneralImage] = useState<File | null>(null)
    const [additionalImages, setAdditionalImages] = useState<(File | string)[]>([])
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<ISelectedColor[]>([]);
    const [quantitySizes, setQuantitySizes] = useState<IType[]>([]);
    const [submitButton, setSubmitButton] = useState('');

    useEffect(() => {
        if (card) {
            console.log('card', card)
            const points: { [key: string]: boolean } = {};
            card.deliveryPoints.forEach((point) => {
                const checkboxField = `checkbox-${point}`;
                points[checkboxField] = true;
            });


            methods.reset({
                name: card.information.name,
                material: card.additionalInformation.material,
                recommendations: card.additionalInformation.recommendations,
                price: card.pricesAndQuantity.price,
                priceDiscount: card.pricesAndQuantity.priceBeforeDiscount,
                length: card.dimensions.length,
                width: card.dimensions.width,
                height: card.dimensions.height,
                weight: card.dimensions.weight,
                quantityInStock: card.pricesAndQuantity.quantity,
                ...points
            })
        }
    }, [card, methods])

    useEffect(() => {
        if (isUpdateCard) {
            // navigation('/seller/goods');
            dispatch(updateCardFalse())
        }
    },  [dispatch, isUpdateCard, navigation, updateCardFalse])

    useEffect(() => {
        if (isCreateGoodCard) {
            // if (submitButton === 'saveButton') {
            //     navigation('/seller/goods');
            // } else if (submitButton === 'addGoodButton') {
            //     window.location.reload();
            // }
            dispatch(shelterSlice.actions.setCreateGoodCard(false))
        }
    },  [dispatch, isCreateGoodCard, navigation, submitButton])

    // useEffect(() => {
    //     console.log('quantitySizes', quantitySizes)
    // }, [quantitySizes])

    const onSubmit = async (data: any) => {
        console.log('(!generalImage && !card?.mainPhoto)', (!generalImage && !card?.mainPhoto))
        console.log('additionalImages.length === 0', additionalImages.length === 0)
        console.log('!parentSelectedCategory', !parentSelectedCategory)
        console.log('!parentSelectedSubCategory', !parentSelectedSubCategory)
        console.log('!parentSelectedType', !parentSelectedType)
        console.log(' quantitySizes.length === 0',  quantitySizes.length === 0)
        if ((!generalImage && !card?.mainPhoto)
            || additionalImages.length === 0
            || !parentSelectedCategory
            || !parentSelectedSubCategory
            || !parentSelectedType
            || quantitySizes.length === 0
        ) return;
        console.log('data', data)
        try {
            const points = Object.keys(data)
                .filter(key => key.startsWith("checkbox-") && data[key])
                .map(key => key.substring("checkbox-".length));

            const imageColors = selectedColors.filter(color => color.image).map(color => ({name: color.name, image: color.image}))
            const good = {
                categories: {
                    category: {
                        id: parentSelectedCategory._id,
                        name: parentSelectedCategory.name
                    },
                    subcategory: {
                        id: parentSelectedSubCategory._id,
                        name: parentSelectedSubCategory.name
                    },
                    section: {
                        id: parentSelectedType._id,
                        name: parentSelectedType.name
                    }
                },
                information: {
                    name: data.name,
                    description: description
                },
                additionalInformation: {
                    material: data.material,
                    recommendations: data.recommendations
                },
                pricesAndQuantity: {
                    price: Number(data.price),
                    priceBeforeDiscount: Number(data.priceDiscount),
                    quantity: Number(data.quantityInStock),
                },
                dimensions: {
                    length: Number(data.length),
                    height: Number(data.height),
                    width: Number(data.width),
                    weight: Number(data.weight)
                },
                deliveryPoints: points,
                typeQuantity: quantitySizes,
                nameShelter: shelter.name,
                colors: imageColors
            } as IProductCard
            if (card) {
                console.log('card 149', good)
                // dispatch(updateProductCard(good, card._id, generalImage || card.mainPhoto, additionalImages))
                return
            }
            // @ts-ignore
            dispatch(createProductCard(good, generalImage, additionalImages))

        } catch (error) {
            console.error('Error create good:', error);
        }
    };


    const isTypesClothes = useMemo(() => {
        return parentSelectedCategory && SIZES_ID.includes(parentSelectedCategory?._id)
    }, [parentSelectedCategory])

    return (
        <FormProvider {...methods}>
            <form className={'create'} onSubmit={methods.handleSubmit(onSubmit)}>
                <h3 className={'create__title'}>{card ? 'Изменение' : 'Создание'} карточки товара</h3>
                <CreateGoodSelects
                    selectedCategory={parentSelectedCategory}
                    setSelectedCategory={setParentSelectedCategory}
                    selectedSubCategory={parentSelectedSubCategory}
                    setSelectedSubCategory={setParentSelectedSubCategory}
                    selectedType={parentSelectedType}
                    setSelectedType={setParentSelectedType}
                    card={card}
                />
                <hr className={'create__divider'}/>
                <CreateGoodDescription description={description} setDescription={setDescription} card={card}/>
                {
                    parentSelectedCategory && isTypesClothes && (
                        <>
                            <hr className={'create__divider'}/>
                            <CreateGoodSizes
                                options={
                                SIZES_CLOTHES_ID.includes(parentSelectedCategory?._id) ?
                                    SIZES_CLOTHES
                                    : SIZES_SHOE
                                }
                                selectedOptions={selectedSizes}
                                setSelectedOptions={setSelectedSizes}
                                cardQuantity={card?.typeQuantity ? card.typeQuantity : null}
                            />
                            <hr className={'create__divider'}/>
                            <CreateGoodColors
                                selectedColors={selectedColors}
                                setSelectedColors={setSelectedColors}
                                typesCard={card?.typeQuantity}
                            />
                        </>
                    )
                }
                <hr className={'create__divider'}/>
                <CreateGoodPhotos
                    generalImage={generalImage}
                    setGeneralImage={setGeneralImage}
                    additionalImages={additionalImages}
                    setAdditionalImages={setAdditionalImages}
                    card={card}
                    selectedColors={selectedColors}
                    setSelectedColors={setSelectedColors}
                />
                <hr className={'create__divider'}/>
                <CreateGoodAdditional/>
                <hr className={'create__divider'}/>
                <CreateGoodPrice isClothes={isTypesClothes} card={card}/>
                {parentSelectedCategory && isTypesClothes && (
                    <>
                        <hr className={'create__divider'}/>
                        <CreateGoodQuantity
                            sizes={selectedSizes}
                            inputValues={quantitySizes}
                            setInputValues={setQuantitySizes}
                            cardQuantity={card?.typeQuantity ? card.typeQuantity : null}
                            selectedColors={selectedColors}
                        />
                    </>
                )}
                <hr className={'create__divider'}/>
                <CreateGoodDimensions/>
                <hr className={'create__divider'}/>
                <CreateGoodPoints cardPoints={card ? card?.deliveryPoints : []}/>
                {!card && <div className={'create__buttons'}>
                    <button
                        type="submit"
                        name="saveButton"
                        className={'button button_dark create__save'}
                        onClick={() => setSubmitButton('saveButton')}
                    >
                        Сохранить
                    </button>
                    <button
                        type="submit"
                        name="addGoodButton"
                        className={'button button_light create__add-good'}
                        onClick={() => setSubmitButton('addGoodButton')}
                    >
                        Добавить ещё карточку товара
                    </button>
                </div>}
                {card && <div className={'create__buttons'}>
                    <button
                        type="submit"
                        name="saveButton"
                        className={'button button_dark create__save'}
                        onClick={() => setSubmitButton('saveButton')}
                    >
                        Изменить
                    </button>
                    <Link
                        to={'/seller/goods'}
                        className={'button button_light create__add-good'}
                    >
                        Выйти
                    </Link>
                </div>}
            </form>
        </FormProvider>
    );
};

export default FormCreateGood;
