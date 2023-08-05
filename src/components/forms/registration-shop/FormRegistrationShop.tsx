import React, {useEffect, useState} from 'react';
import './form-registration-shop.scss'
import '../../../styles/elements/titles.scss'
import '../../../styles/elements/buttons.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import InputFile from "../../inputs/input-file/InputFile";
import DeliveryPointsForm from "./DeliveryPointsForm";
import {IDeliveryPoint} from "../../../models/IDeliveryPoint";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {registrationShelter, updateShopShelter} from "../../../store/reducers/shelter/ShelterCreator";
import {IShelterRes, IShelterShop} from "../../../models/response/IShelter";
import {useNavigate} from "react-router-dom";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";

const FormRegistrationShop = ({shelter}: {shelter: IShelterRes | null}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {isRegistered, isUpdateShopShelter} = useAppSelector(state => state.shelterReducer)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IShelterShop>();
    const [imageShop, setImage] = useState<File | null>(null)
    const [deliveryPoints, setDeliveryPoints] = useState<IDeliveryPoint[]>([
        {
            city: '',
            address: '',
            shopName: '',
            notes: ''
        }
    ]);

    useEffect(() => {
        if (shelter) {
            reset({
                nameMarket: shelter.shop.nameMarket,
                description: shelter.shop.description
            })
            setDeliveryPoints(shelter.deliveryPoints)
        }
    }, [reset, shelter])

    useEffect(() => {
        if (isRegistered) {
            dispatch(shelterSlice.actions.setIsRegistered(false))
            navigate('/shelter')
        }
    }, [dispatch, isRegistered, navigate])

    useEffect(() => {
        if (isUpdateShopShelter) {
            dispatch(shelterSlice.actions.updateShopShelter(false))
            navigate('/shelter')
        }
    }, [dispatch, isUpdateShopShelter, navigate])
    
    const onUpdate: SubmitHandler<IShelterShop> = async (data) => {
        if (shelter) {
            dispatch(
                updateShopShelter(
                    shelter._id,
                    data,
                    deliveryPoints,
                    imageShop || shelter?.imageShop
                )
            )
        }

    }

    const onSubmit: SubmitHandler<IShelterShop> = (data) => {
        const shelter = localStorage.getItem('shelter');
        const shelterData = localStorage.getItem('shelter-data');
        const shelterDataImage = localStorage.getItem('image-shelter-data');
        const imgScan = new Image();
        const loadImage = (url: string): Promise<HTMLImageElement> => {

            return new Promise((resolve, reject) => {
                imgScan.onload = () => {
                    resolve(imgScan);
                };
                imgScan.onerror = () => {
                    reject(new Error(`Could not load image at ${url}`));
                };
                imgScan.src = url;
            });
        };
        if (shelterDataImage) {

            loadImage(shelterDataImage)
                .then((img) => {

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (ctx) {

                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob((blob) => {
                            if (blob) {

                                const fileScan = new File([blob], 'filename.png', { type: 'image/png' });
                                if (shelter && shelterData && imageShop && deliveryPoints.length) {
                                    dispatch(
                                        registrationShelter(
                                            {
                                                ...JSON.parse(shelter),
                                                shelterData: JSON.parse(shelterData),
                                                shop: data,
                                                deliveryPoints
                                            },
                                            fileScan,
                                            imageShop
                                        )
                                    );
                                }
                            }
                        }, 'image/png');
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div className={'form-shop'}>
            {!shelter && <p className={'form-shop__inf'}>
                Для успешной работы на td-market заполните, пожалуйста, данные вашего магазина и нажмите кнопку
                “Сохранить”.
                Вы сможете сделать это позже в Личном кабинете, однако мы не рекомендуем пропускать этот шаг.
            </p>}
            <form className={'form-shop__block'} onSubmit={handleSubmit(onSubmit)}>
                <legend className={'legend'}>Основные данные</legend>
                <div className={'input-box'}>
                    <label className={'label required'} htmlFor="name-shop">Название</label>
                    <input
                        type="text"
                        id={'name-shop'}
                        placeholder={'Введите название магазина'}
                        className={'modalInput form-shop__short'}
                        {...register('nameMarket')}
                    />
                </div>
                <div className={'input-box'}>
                    <label className={'label'} htmlFor="name-placeholder">Описание</label>
                    <textarea
                        id={'name-placeholder'}
                        placeholder={'Добавьте описание магазина'}
                        className={'modalInput textarea'}
                        {...register('description')}
                    />
                </div>
            </form>
            <fieldset className={'form-shop__block'}>
                <legend className={'legend required'}>Добавление фото</legend>
                <p className={'form-shop__p'}>Загрузите фото, которое будет отображаться на странице вашего магазина.</p>
                <InputFile
                    image={imageShop}
                    setImage={setImage}
                    position={'bottom'}
                    shopImage={shelter?.imageShop ? shelter.imageShop : null}/>
            </fieldset>
            <DeliveryPointsForm deliveryPoints={deliveryPoints} setDeliveryPoints={setDeliveryPoints}/>
            <button
                className={'button button_dark form-shop__save'}
                type={'submit'}
                onClick={handleSubmit(shelter ? onUpdate : onSubmit)}>
                Сохранить и приступить к работе
            </button>
        </div>
    );
};

export default FormRegistrationShop;
