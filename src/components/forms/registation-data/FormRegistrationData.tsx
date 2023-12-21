import React, {ChangeEvent, useEffect, useState} from 'react';
import './forn-registration-data.scss'
import '../../../styles/elements/inputs.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {IPersonalData, IShelterData, } from "../../../models/response/IShelter";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import {useNavigate} from "react-router-dom";
import {ShelterService} from "../../../services/ShelterService";

interface IProps {
    shelterData: IShelterData | null,
    id: string | null
}

const FormRegistrationData = ({shelterData, id}: IProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {isRegistry} = useAppSelector(state => state.shelterReducer)
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const {setIsRegistry} = shelterSlice.actions
    // const [image, setImage] = useState<File | null>(null)
    const [isCompletedInputs, setIsCompletedInputs] = useState(false)
    const [closePerson, setClosePerson] = useState({
        name: '',
        family: '',
        patronymic: '',
        phoneClose: '',
    })
    const [personalData, setPersonalData] = useState<IPersonalData>({
        name: '',
        family: '',
        patronymic: '',
        birthday: '',
    })
    const [entityData, setEntityData] = useState({
        isIndividual: 'individual',
        code: '',
        // photo: null,
        bic: '',
        check: ''
    })

    useEffect(() => {
        if (shelterData) {
            const {personalData, closePerson, entity} = shelterData
            setPersonalData({
                name: personalData.name,
                birthday: personalData.birthday,
                family: personalData.family,
                patronymic: personalData.patronymic
            })
            setClosePerson({
                family: closePerson.family,
                name: closePerson.name,
                patronymic: closePerson.patronymic,
                phoneClose: closePerson.phoneClose
            })
            setEntityData({
                bic: entity.bic,
                check: entity.check,
                code: entity.code,
                isIndividual: entity.isIndividual
            })
        }
    },[shelterData])

    useEffect(() => {
        console.log('isRegistry', isRegistry)
    }, [isRegistry])

    useEffect(() => {
        const updateShelterData = async () => {
            if (isRegistry) {
                console.log('isRegisrty')
                let isCompletedFields = true;

                if (!personalData.name || !personalData.family) {
                    isCompletedFields = false;
                }
                if (!entityData.check) {
                    isCompletedFields = false;
                }

                // if (!image) {
                //     isCompletedFields = false
                // }

                if (!isCompletedFields) {
                    setIsCompletedInputs(true);
                    return;
                }

                if (id) {
                    try {
                        const response = await ShelterService.updateDataShelter(id, {
                            closePerson,
                            personalData,
                            entity: entityData,
                        });
                        dispatch(setIsRegistry(false))
                        if (response.data) {
                            console.log('response.data', response.data)
                            dispatch(shelterSlice.actions.setShelter(response.data))
                            navigate('/seller/main')
                        }
                        return
                    } catch (error) {
                        console.error('Ошибка при обновлении данных приюта:', error);
                        return
                    }
                }

                localStorage.setItem(
                    'shelter-data',
                    JSON.stringify({
                        closePerson,
                        personalData,
                        entity: entityData,
                    })
                );
                const reader = new FileReader();

                // reader.readAsDataURL(image)
                reader.onload = () => {
                    if (reader.result !== null) {
                        const base64String = reader.result.toString();
                        localStorage.setItem('image-shelter-data', base64String);
                    } else {
                        console.error('Не удалось прочитать файл');
                    }
                };
                dispatch(setIsRegistry(false));
                navigate('/shop-data');
            }
        };

        updateShelterData();
    }, [isRegistry, isCompletedInputs, shelter, dispatch, closePerson, personalData, entityData, setIsRegistry, navigate, id]);


    const onSetName = (e: ChangeEvent<HTMLInputElement>) => {
        setPersonalData({...personalData, name: e.target.value})
    }

    const onSetFamily = (e: ChangeEvent<HTMLInputElement>) => {
        setPersonalData({...personalData, family: e.target.value})
    }

    const onSetPatronymic = (e: ChangeEvent<HTMLInputElement>) => {
        setPersonalData({...personalData, patronymic: e.target.value})
    }

    const onSetBirthDay = (e: ChangeEvent<HTMLInputElement>) => {
        if (/[a-zа-яё!?&^%$#@*()'"]/i.test(e.target.value)) return
        if (e.target.value.length > 10) return
        setPersonalData({...personalData, birthday: e.target.value})
    }

    const onSetNamePerson = (e: ChangeEvent<HTMLInputElement>) => {
        setClosePerson({...closePerson, name: e.target.value})
    }

    const onSetFamilyPerson = (e: ChangeEvent<HTMLInputElement>) => {
        setClosePerson({...closePerson, family: e.target.value})
    }

    const onSetPatronymicPerson = (e: ChangeEvent<HTMLInputElement>) => {
        setClosePerson({...closePerson, patronymic: e.target.value})
    }

    const onSetPhone = (e: ChangeEvent<HTMLInputElement>) => {
        setClosePerson({...closePerson, phoneClose: e.target.value})
    }

    const onSetCode = (e: ChangeEvent<HTMLInputElement>) => {
        setEntityData({...entityData, code: e.target.value})
    }

    const onSetBic = (e: ChangeEvent<HTMLInputElement>) => {
        setEntityData({...entityData, bic: e.target.value})
    }

    const onSetCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setEntityData({...entityData, check: e.target.value})
    }

    return (
        <div className={'form-data'}>
                <p className={'form-data__description'}>
                    Для получения доступа к личному кабинету td-market, заполните, пожалуйста, ваши личные и юридические
                    данные и нажмите кнопку “Сохранить”.
                </p>

            <div className={`mark ${!isCompletedInputs ? 'error' : 'error'}`}>
                <img src="/images/svg/mark-error.svg" alt="Пометка"/>
                <span className={'label'}>
                            Обратите внимание, что поля помеченные звёздочкой "*" обязательны для заполнения.
                        </span>
            </div>
            <fieldset>
                <legend className={'legend'}>Личные данные</legend>
                <div className={'form-data__inputs'}>
                    <div className={'reg-field'}>
                        <label htmlFor="Name" className={'label'}>Имя<span className={'red-span'}>*</span></label>
                        <input id={'Name'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите Ваше имя'}
                               value={personalData.name}
                               onChange={onSetName}
                        />
                    </div>
                    <div className={'reg-field'}>
                        <label htmlFor="Family" className={'label'}>Фамилия<span className={'red-span'}>*</span></label>
                        <input id={'Family'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите Вашу фамилию'}
                               value={personalData.family}
                               onChange={onSetFamily}
                        />
                    </div>
                    <div className={'reg-field'}>
                        <label htmlFor="Patronymic" className={'label'}>Отчество</label>
                        <input id={'Patronymic'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите Ваше отчество'}
                               value={personalData.patronymic}
                               onChange={onSetPatronymic}
                        />
                    </div>
                    <div className={'reg-field'}>
                        <label htmlFor="Birthday" className={'label'}>Дата рождения</label>
                        <input id={'Birthday'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'ДД/ММ/ГГГГ'}
                               value={personalData.birthday}
                               onChange={onSetBirthDay}
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className={'form-data__nearly'}>
                    <legend className={'legend'}>Данные близкого человека</legend>
                    <div className={'mark'}>
                        <img src="/images/svg/mark.svg" alt="Пометка"/>
                        <span className={'label'}>
                            Эти данные будут необходимы, если мы в течение долгого времени не сможем связаться с Вами
                        </span>
                    </div>
                </div>
                <div className={'form-data__inputs'}>
                    <div className={'reg-field'}>
                        <label htmlFor="Name-man" className={'label'}>Имя</label>
                        <input id={'Name-man'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите имя'}
                               value={closePerson.name}
                               onChange={onSetNamePerson}
                        />
                    </div>
                    <div className={'reg-field'}>
                        <label htmlFor="Family-man" className={'label'}>Фамилия</label>
                        <input id={'Family-man'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите фамилию'}
                               value={closePerson.family}
                               onChange={onSetFamilyPerson}
                        />
                    </div>
                    <div className={'reg-field'}>
                        <label htmlFor="Patronymic-man" className={'label'}>Отчество</label>
                        <input id={'Patronymic-man'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите отчество'}
                               value={closePerson.patronymic}
                               onChange={onSetPatronymicPerson}
                        />
                    </div>
                    <div className={'reg-field'}>
                        <label htmlFor="Phone" className={'label'}>Номер телефона</label>
                        <input id={'Phone'} className={`modalInput modalInput_light`}
                               type="tel"
                               placeholder={'+373'}
                               value={closePerson.phoneClose}
                               onChange={onSetPhone}
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className={'form-data__nearly'}>
                    <legend className={'legend'}>Данные юридического лица</legend>

                    <div className={'mark'}>
                        <input
                            type="radio"
                            id="radio-individual"
                            name="legalType"
                            value="individual"
                            className="radio-input"
                            onChange={() => setEntityData({...entityData, isIndividual: 'individual'})}
                            defaultChecked={true}
                        />
                        <label className={'label'} htmlFor="radio-individual">Я - физ.лицо</label>
                    </div>
                    <div className={'mark'}>
                        <input
                            type="radio"
                            id="radio-IE"
                            name="legalType"
                            value="IE"
                            className="radio-input"
                            onChange={() => setEntityData({...entityData, isIndividual: 'IE'})}
                        />
                        <label className={'label'} htmlFor="radio-IE">Я - ИП</label>
                    </div>
                    <div className={'mark'}>
                        <input
                            type="radio"
                            id="radio-company"
                            name="legalType"
                            value="company"
                            className="radio-input"
                            onChange={() => setEntityData({...entityData, isIndividual: 'company'})}
                        />
                        <label className={'label'} htmlFor="radio-company">Я - юр.лицо</label>
                    </div>
                </div>

                <div className={'form-data__inputs'}>
                    <div className={'form-data__block'}>
                        {entityData.isIndividual !== 'individual' && <div className={'reg-field'}>
                            <label htmlFor="Naming" className={'label'}>
                                {entityData.isIndividual ? 'Регистрационный номер' : 'Фискальный код'}
                            </label>
                            <input id={'Naming'} className={`modalInput modalInput_light`}
                                   type="text"
                                   placeholder={`Введите ${entityData.isIndividual === 'IE' ? 'регистрационный номер' : 'фискальный код'}`}
                                   value={entityData.code}
                                   onChange={onSetCode}
                            />

                        </div>}
                        {/*<InputFile image={image} setImage={setImage} position={'right'}/>*/}
                    </div>

                    {entityData.isIndividual !== 'individual' && <div className={'reg-field'}>
                        <label htmlFor="Bank" className={'label'}>БИК банка</label>
                        <input id={'Bank'} className={`modalInput modalInput_light`}
                               type="text"
                               placeholder={'Введите БИК банка'}
                               value={entityData.bic}
                               onChange={onSetBic}
                        />
                        <div className={'mark mark_absolute'}>
                            <img src="/images/svg/mark.svg" alt="Пометка"/>
                            <span className={'label'}>
                                БИК – уникальный номер, который выступает в роли идентификационного кода банковского учреждения
                            </span>
                        </div>
                    </div>}
                    <div className={'reg-field'}>
                        <label htmlFor="Check" className={'label'}>{entityData.isIndividual === 'individual' ? 'Номер банковской карты' : 'Номер расчётного счёта'}<span className={'red-span'}>*</span></label>
                        <input id={'Check'} className={`modalInput modalInput_light reg-field__check`}
                               type="text"
                               placeholder={entityData.isIndividual === 'individual' ? 'Введите номер банковской карты' : 'Введите номер вашего расчетного счета'}
                               value={entityData.check}
                               onChange={onSetCheck}
                        />
                        {entityData.isIndividual === 'individual' && <div className={'mark mark_absolute'}>
                            <img src="/images/svg/mark.svg" alt="Пометка"/>
                            <span className={'label'}>
                                Номер банковской карты необходим для перевода денег продавцу после покупки товара.
                            </span>
                        </div>}
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default FormRegistrationData;
