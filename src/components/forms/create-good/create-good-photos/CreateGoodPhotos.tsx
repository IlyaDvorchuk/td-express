import React, {ChangeEvent, useEffect, useState} from 'react';
import './create-good-photos.scss'
import {IProductCard} from "../../../../models/IProductCard";
import {API_URL} from "../../../../http";
import {ISelectedColor} from "../../../../models/IColor";

interface CreateGoodPhotosProps {
    generalImage: File | null;
    setGeneralImage: React.Dispatch<React.SetStateAction<File | null>>;
    additionalImages: (File | string)[];
    setAdditionalImages: React.Dispatch<React.SetStateAction<(File | string)[]>>;
    card: IProductCard | null,
    selectedColors: ISelectedColor[],
    setSelectedColors:  React.Dispatch<React.SetStateAction<ISelectedColor[]>>;
}


const CreateGoodPhotos = ({
                            generalImage,
                            setGeneralImage,
                            additionalImages,
                            setAdditionalImages,
                            card, selectedColors,
                            setSelectedColors

                          }: CreateGoodPhotosProps) => {

    const [generalImageUrl, setGeneralImageUrl] = useState(card ? card.mainPhoto : '')
    const [colorImage, setColorImage] = useState<(File | undefined)[]>([])


    useEffect(() => {
        if (card) {
            setGeneralImageUrl(card.mainPhoto)
            setAdditionalImages(card.additionalPhotos)
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
        setColorImage(prevState => {
            const newState = [...prevState]
            newState[index] = newImage
            return newState
        })
        if (e.target && newImage && newImage !== generalImage) {
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => { // Используем ProgressEvent<FileReader>
                if (!event.target) return
                const base64String = event.target.result as string;

                setSelectedColors((prevSelectedColors: ISelectedColor[]) => {
                    const updatedColors = [...prevSelectedColors]; // Создаем копию массива

                    // Обновляем элемент в массиве на позиции index, добавляя новое изображение
                    if (updatedColors[index]) {
                        updatedColors[index].image = base64String;
                    }

                    return updatedColors; // Возвращаем обновленный массив
                });
            };

            reader.readAsDataURL(newImage); // Преобразовываем файл в Base64
        }
    }
    const onDeleteColorFile = (index: number) => {
        selectedColors[index].image = undefined
        const newSelectedColors = [...selectedColors]; // Создаем копию массива
        newSelectedColors[index].image = undefined;
        console.log('newSelectedColors[index]', newSelectedColors[index])

        setSelectedColors(newSelectedColors); // Устанавливаем новый массив в состояние
        setColorImage(prevState => {
            const newState = [...prevState]
            newState[index] = undefined
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

    useEffect(() => {
        console.log('selectedColors', selectedColors)
    }, [selectedColors])


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
                                {!colorItem.image &&
                                    <label className={''} htmlFor={`color-photo=${index}`}>
                                        <img src="/images/svg/plus.svg" alt={''}/>
                                        <span>Добавить фото</span>
                                    </label>
                                }
                                {colorItem.image && colorImage[index] === undefined && (
                                    <div className={'loadPhoto'}>
                                        <img src={`${API_URL}${colorItem.image}`} alt="Фото"/>
                                        <div onClick={() => onDeleteColorFile(index)} className={'loadPhoto__close'}>
                                            <img src="/images/svg/close.svg" alt={''}/>
                                        </div>
                                    </div>
                                )}
                                {colorImage[index] !== undefined && (
                                    <div className={'loadPhoto'}>
                                        <img src={URL.createObjectURL(new Blob([colorImage[index] as Blob]))} alt="Фото"/>
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
