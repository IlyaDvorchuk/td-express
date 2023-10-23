import React, {ChangeEvent, useEffect, useState} from 'react';
import './create-good-photos.scss'
import {IProductCardRes} from "../../../../models/IProductCard";
import {API_URL} from "../../../../http";
import {ColorImage, IColor} from "../../../../models/IColor";

interface CreateGoodPhotosProps {
    generalImage: File | null;
    setGeneralImage: React.Dispatch<React.SetStateAction<File | null>>;
    additionalImages: (File | string)[];
    setAdditionalImages: React.Dispatch<React.SetStateAction<(File | string)[]>>;
    card: IProductCardRes | null,
    selectedColors: IColor[],
    colorImages: (ColorImage)[],
    setColorImages:  React.Dispatch<React.SetStateAction<ColorImage[]>>
}


const CreateGoodPhotos = ({
                            generalImage,
                            setGeneralImage,
                            additionalImages,
                            setAdditionalImages,
                            card, selectedColors,
                            colorImages, setColorImages
                          }: CreateGoodPhotosProps) => {

    const [generalImageUrl, setGeneralImageUrl] = useState(card ? card.mainPhoto : '')
    const [isFirstLoading, setIsFirstLoading] = useState(true)

    useEffect(() => {
        if (card && card?.colors && isFirstLoading && selectedColors.length > 0) {
            // Создаем отсортированный массив
            const sortedColors: ColorImage[] = [];

            // Проходим по selectedColors и добавляем элементы из card?.colors в порядке, соответствующем selectedColors
            selectedColors.forEach((selectedColor) => {
                if (!card.colors) return []
                const matchingColor = card.colors.find((color) => color.name === selectedColor.name);
                if (matchingColor) {
                    sortedColors.push(matchingColor);
                } else {
                    sortedColors.push({
                        name: selectedColor.name,
                        color: selectedColor.color,
                        image: undefined
                    }); // Если нет совпадения, добавляем undefined
                }
            });
            // Обновляем состояние с отсортированным массивом
            setIsFirstLoading(false);
            setColorImages(sortedColors);
        }
    }, [card, setColorImages, selectedColors, isFirstLoading]);

    useEffect(() => {
        if (card) {
            setGeneralImageUrl(card.mainPhoto)
            // setAdditionalImages(card.additionalPhotos)
        }
    }, [card, setAdditionalImages])

    function onSubmitFile(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.target;
        const selectedFiles = files as FileList;
        const newImage = selectedFiles?.[0];
        if (newImage && newImage !== generalImage) {
            setGeneralImage(newImage);
        }
    }

    const onDeleteFile = () => {
        setGeneralImageUrl('')
        setGeneralImage(null)
    }

    function onColorSubmitFile(e: ChangeEvent<HTMLInputElement>, index: number) {
        const { files } = e.target;
        const selectedFiles = files as FileList;
        const newImage = selectedFiles?.[0];
        setColorImages(prevState => {
            const newState = [...prevState]
            newState[index] = {
                image: newImage,
                name: selectedColors[index].name,
                color: selectedColors[index].color
            }
            return newState
        })
    }
    const onDeleteColorFile = (index: number) => {

        setColorImages(prevState => {
            const newState = [...prevState]
            newState[index] = {
                name: selectedColors[index].name,
                color: selectedColors[index].color,
                image: undefined
            }
            return newState
        })
    };

    function onAdditionalSubmitFile(e: ChangeEvent<HTMLInputElement>) {
        const { files } = e.target;
        const selectedFiles = files as FileList;
        const newImage = selectedFiles?.[0];
        if (newImage && newImage !== generalImage) {

            setAdditionalImages([...additionalImages, newImage]);
        }
    }

    const onDeleteAdditionalFile = (index: number) => {
        if (additionalImages.length > 10) return
        const newImages = [...additionalImages]; // создаем копию массива
        newImages.splice(index, 1); // удаляем элемент по индексу
        setAdditionalImages(newImages); // обновляем состояние массива
    };

    return (
        <div>
            <h3 className={'subtitle'}>
                Загрузка фото
            </h3>
            <ol className={'add-photos'}>
                <li>
                    <h4 className={'add-photos__title'}>
                       Главное фото
                    </h4>
                    <p className={'annotation'}>
                        Загрузите фото, которое будет отображаться в каталоге.<br/>
                        Формат: PNG,JPEG,JPG. Рекомендуемое разрешение - 1080х1440

                    </p>
                    <div className={`image-good`}>
                        {!generalImage && !generalImageUrl &&
                            <label className={''} htmlFor={'good-photo'}>
                                <img src="/images/svg/plus.svg" alt={''}/>
                                <span>Добавить фото</span>
                            </label>
                        }
                        {generalImage && !generalImageUrl &&
                            <div className={'loadPhoto'}>
                                <img src={URL.createObjectURL(generalImage)} alt="Фото"/>
                                <div onClick={onDeleteFile} className={'loadPhoto__close'}>
                                    <img src="/images/svg/close.svg" alt={''}/>
                                </div>
                            </div>
                        }
                        {generalImageUrl &&
                            <div className={'loadPhoto'}>
                                <img src={`${API_URL}${generalImageUrl}`} alt="Фото"/>
                                <div onClick={onDeleteFile} className={'loadPhoto__close'}>
                                    <img src="/images/svg/close.svg" alt={''}/>
                                </div>
                            </div>
                        }
                        <input
                            type="file"
                            id={'good-photo'}
                            onChange={onSubmitFile}
                            value={''}
                        />

                    </div>
                </li>
                {selectedColors.length > 0 && <li>
                    <h4 className={'add-photos__title'}>
                        Образцы цветов
                    </h4>
                    <p className={'annotation'}>
                        Для каждого выбранного вами цвета можете добавить фото-образец
                    </p>
                    {selectedColors.map((colorItem, index) => (
                        <div className={'color-photo'} key={colorItem._id}>
                            <div key={colorItem._id} className={'select-color'}>
                                <div className={'color-example'} style={{backgroundColor: colorItem.color}}/>
                                <div className={'color-text'}>
                                    {colorItem.name}
                                </div>
                            </div>
                            <div className={`image-good`}>
                                {colorImages[index]?.image === undefined &&
                                    <label className={''} htmlFor={`color-photo=${index}`}>
                                        <img src="/images/svg/plus.svg" alt={''}/>
                                        <span>Добавить фото</span>
                                    </label>
                                }
                                {typeof colorImages[index]?.image === 'string' && (
                                    <div className={'loadPhoto'}>
                                        <img src={`${API_URL}${colorImages[index]?.image}`} alt="Фото"/>
                                        <div onClick={() => onDeleteColorFile(index)} className={'loadPhoto__close'}>
                                            <img src="/images/svg/close.svg" alt={''}/>
                                        </div>
                                    </div>
                                )}
                                {colorImages[index]?.image && typeof colorImages[index]?.image !== 'string' && (
                                    <div className={'loadPhoto'}>
                                        <img src={URL.createObjectURL(new Blob([colorImages[index]?.image as Blob]))} alt="Фото"/>
                                        <div onClick={() => onDeleteColorFile(index)} className={'loadPhoto__close'}>
                                            <img src="/images/svg/close.svg" alt={''}/>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id={`color-photo=${index}`}
                                    onChange={(e) => onColorSubmitFile(e, index)}
                                    value={''}
                                />

                            </div>
                        </div>
                    ))}
                </li>}
                <li>
                    <h4 className={'add-photos__title'}>
                        Дополнительные фото
                    </h4>
                    <p className={'annotation'}>
                        Можете добавить дополнительные фото товара
                    </p>
                    <div className={'additional-photos'}>
                        <div className={`image-good`}>
                            <label className={''} htmlFor={'good-photo-add'}>
                                <img src="/images/svg/plus.svg" alt={''}/>
                                <span>Добавить фото</span>
                            </label>
                            <input
                                type="file"
                                id={'good-photo-add'}
                                onChange={onAdditionalSubmitFile}
                                value={''}
                            />

                        </div>
                        {
                            additionalImages.map((image, index) => (
                                <div className={'loadPhoto'} key={index}>
                                    {(typeof image == 'string') ?
                                        <img src={`${API_URL}${image}`} alt="Фото"/>
                                        : <img src={URL.createObjectURL(image)} alt="Фото"/>
                                    }

                                    <div onClick={() => onDeleteAdditionalFile(index)} className={'loadPhoto__close'}>
                                        <img src="/images/svg/close.svg" alt={''}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </li>
            </ol>
        </div>
    );
};

export default CreateGoodPhotos;
