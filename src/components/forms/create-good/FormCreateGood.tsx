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
import {IProductCard, IProductCardRes, IType} from "../../../models/IProductCard";
import {createProductCard, updateProductCard} from "../../../store/reducers/shelter/ShelterCreator";
import {Link, useNavigate} from "react-router-dom";
import {
    SIZES_CLOTHES,
    SIZES_CLOTHES_ID, SIZES_CLOTHES_KIND,
    SIZES_ID,
    SIZES_SHOE,
    SIZES_SHOE_ID, SIZES_SHOE_KIND,
    SIZES_SHOE_KIND_ID
} from "../../../constants";
import CreateGoodSizes from "./create-good-sizes/CreateGoodSizes";
import CreateGoodQuantity from "./create-good-quantity/CreateGoodQuantity";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import CreateGoodColors from "./create-good-colors/CreateGoodColors";
import {ColorImage, IColor} from "../../../models/IColor";
import {fileToBase64} from "../../../utils/fileToBase64";

const FormCreateGood = ({card} : {card: IProductCardRes | null}) => {
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
    const [selectedColors, setSelectedColors] = useState<IColor[]>([]);
    const [quantitySizes, setQuantitySizes] = useState<IType[]>([]);
    const [seasons, setSeasons] = useState<string[]>([])
    const [colorImages, setColorImages] = useState<(ColorImage)[]>([])
    const [submitButton, setSubmitButton] = useState('');
    const [categoriesErrors, setCategoriesErrors] = useState({
        category: false,
        subcategory: false,
        type: false
    })
    const [descriptionError, setDescriptionError] = useState(false)
    const [photosErrors, setPhotosErrors] = useState({
        main: false,
        additional: false
    })

    useEffect(() => {
        if (card) {
            const points: { [key: string]: boolean } = {};
            card.deliveryPoints.forEach((point) => {
                const checkboxField = `checkbox-${point}`;
                points[checkboxField] = true;
            });
            setAdditionalImages(card.additionalPhotos)
            if (card?.additionalInformation?.seasons) {
                setSeasons(card?.additionalInformation?.seasons)
            }

            methods.reset({
                name: card.information.name,
                material: card?.additionalInformation?.material,
                recommendations: card?.additionalInformation?.recommendations,
                seasons: card?.additionalInformation?.seasons,
                price: card.pricesAndQuantity.price.toString(),
                priceDiscount: card.pricesAndQuantity.priceBeforeDiscount.toString(),
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
            navigation('/seller/goods');
            dispatch(updateCardFalse())
            window.location.reload();
        }
    },  [dispatch, isUpdateCard, navigation, updateCardFalse])

    useEffect(() => {
        if (isCreateGoodCard) {
            if (submitButton === 'saveButton') {
                navigation('/seller/goods');
            } else if (submitButton === 'addGoodButton') {
                window.location.reload();
            }
            dispatch(shelterSlice.actions.setCreateGoodCard(false))
        }
    },  [dispatch, isCreateGoodCard, navigation, submitButton])

    const onClickSubmit = (button: string) => {
        if (!parentSelectedCategory) {
            setCategoriesErrors(prevState => ({...prevState, category: true}))
        }
        if (!parentSelectedSubCategory) {
            setCategoriesErrors(prevState => ({...prevState, subcategory: true}))
        }
        if (!parentSelectedType) {
            setCategoriesErrors(prevState => ({...prevState, type: true}))
        }
        if (!description) {
            setDescriptionError(true)
        }
        if (!generalImage) {
            setPhotosErrors(prevState => ({...prevState, main: true}))
        }
        if (additionalImages.length === 0) {
            console.log('hey add')
            setPhotosErrors(prevState => ({...prevState, additional: true}))
        }
        setSubmitButton(button)
    }

    const onSubmit = async (data: any) => {

        if ((!generalImage && !card?.mainPhoto)
            || additionalImages.length === 0
            || !parentSelectedCategory
            || !parentSelectedSubCategory
            || !parentSelectedType
            || quantitySizes.length === 0
            || !description
        ) return;
        try {
            const points = Object.keys(data)
                .filter(key => key.startsWith("checkbox-") && data[key])
                .map(key => key.substring("checkbox-".length));

            const imageColorsWithBase64 = await Promise.all(
                colorImages.map(async (item) => {
                    if (item && item.image instanceof File) {
                        try {
                            const base64String = await fileToBase64(item.image);
                            return { ...item, image: base64String };
                        } catch (error) {
                            console.error('Ошибка при преобразовании файла:', error);
                            return item;
                        }
                    } else {
                        return item;
                    }
                })
            );

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
                    recommendations: data.recommendations,
                    seasons: seasons,
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
                colors: imageColorsWithBase64
            } as IProductCard
            if (card) {
                dispatch(updateProductCard(good, card._id, generalImage || card.mainPhoto, additionalImages ? additionalImages : []))
                return
            }
            // @ts-ignore
            dispatch(createProductCard(good, generalImage, additionalImages ? additionalImages : [], imageColorsWithBase64))

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
                    categoryErrors={categoriesErrors}
                />
                <hr className={'create__divider'}/>
                <CreateGoodDescription
                    description={description}
                    setDescription={setDescription}
                    card={card}
                    descriptionError={descriptionError}
                />
                {
                    parentSelectedCategory && isTypesClothes && (
                        <>
                            <hr className={'create__divider'}/>
                            <CreateGoodSizes
                                options={
                                SIZES_CLOTHES_ID.includes(parentSelectedCategory?._id) ?
                                    SIZES_CLOTHES
                                    : SIZES_SHOE_ID.includes(parentSelectedCategory?._id) ?
                                        SIZES_SHOE
                                        : SIZES_SHOE_KIND_ID === parentSelectedCategory?._id ?
                                        SIZES_SHOE_KIND : SIZES_CLOTHES_KIND
                                }
                                selectedOptions={selectedSizes}
                                setSelectedOptions={setSelectedSizes}
                                cardQuantity={card?.typeQuantity ? card.typeQuantity : null}
                                seasons={seasons}
                                setSeasons={setSeasons}
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
                    colorImages={colorImages}
                    setColorImages={setColorImages}
                    photosErrors={photosErrors}

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
                        onClick={() => onClickSubmit('saveButton')}
                    >
                        Сохранить
                    </button>
                    <button
                        type="submit"
                        name="addGoodButton"
                        className={'button button_light create__add-good'}
                        onClick={() => onClickSubmit('addGoodButton')}
                    >
                        Добавить ещё карточку товара
                    </button>
                </div>}
                {card && <div className={'create__buttons'}>
                    <button
                        type="submit"
                        name="saveButton"
                        className={'button button_dark create__save'}
                        onClick={() => onClickSubmit('saveButton')}
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
