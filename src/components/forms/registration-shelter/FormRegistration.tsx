import React, {ChangeEvent, useState} from 'react';
import InputPassword from "../../inputs/input-password/InputPassword";
import './form-registration.scss'
import validator from "validator";
import {useAppDispatch} from "../../../hooks/redux";
import ModalLogin from "../../modals/modal-login/ModalLogin";
import {checkShelter, sendCodeShelter} from "../../../store/reducers/shelter/ShelterCreator";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";

const FormRegistration = () => {
    const dispatch = useAppDispatch()
    const {setFirstData} = shelterSlice.actions
    // const [name, setName] = useState('')
    // const [isErrorName, setIsErrorName] = useState(false)
    const [password, setPassword] = useState('')
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const [phone, setPhone] = useState('')
    const [errorPhone, setErrorPhone] = useState('')
    const [mail, setMail] = useState('')
    const [errorMail, setErrorMail] = useState('')
    const [isCover, setIsCover] = useState(false)

    const onSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const onSetNumber = (e: ChangeEvent<HTMLInputElement>) => {
        if (/[a-zа-яё]/i.test(e.target.value)) return
        setPhone(e.target.value)
        setErrorPhone('')
    }

    const onSetMail = (e: ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value)
        setErrorMail('')
    }

    const onContinueRegistry = async (e: any) => {
        e.preventDefault()
        const errorPhone = !validator.isMobilePhone(phone)
        const errorMail = !validator.isEmail(mail)
        if (errorPhone) {
         setErrorPhone('Вы ввели некорректный номер телефона')
        }
        if (errorMail) {
            setErrorMail('Вы ввели некорректный email')
        }
        // if (!name) {
        //     setIsErrorName(true)
        // }
        if (!password) {
            setIsErrorPassword(true)
        }
        if (errorPhone || errorMail || !password) return
        const isExistShelter = await dispatch(checkShelter(mail, phone))
        if (isExistShelter?.email) {
            setErrorMail('Аккаунт с таким email уже существует')
            return
        } else if (isExistShelter?.phone) {
            setErrorPhone('Аккаунт с таким номер телефона уже существует')
            return
        }
        setErrorPhone('')
        setErrorMail('')
        setIsCover(true)
        dispatch(setFirstData({
            password,
            email: mail,
            phone
        }))
        localStorage.setItem('shelter', JSON.stringify({
            password,
            email: mail,
            phone
        }))
        dispatch(sendCodeShelter(mail))
    }


    return (
        <>
            <form className={'reg'}>
                <h2 className={'reg__title'}>
                    Начните продавать на td-market.md
                </h2>
                {/*<div className={'reg-field'}>*/}
                {/*    <label htmlFor="Name" className={'label'}>Имя/Наименование</label>*/}
                {/*    <input id={'Name'} className={`modalInput modalInput_light ${isErrorName && 'error'}`}*/}
                {/*           type="text"*/}
                {/*           placeholder={'Введите Ваше имя или наименование'}*/}
                {/*           value={name}*/}
                {/*           onChange={(e) => setName(e.target.value)}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className={'reg-field'}>
                    <label htmlFor="Phone" className={`label ${errorPhone && 'error'}`}>Номер телефона</label>
                    <input id={'Phone'} className={`modalInput modalInput_light ${errorPhone && 'error'}`}
                           type="tel"
                           placeholder={'+373(__)_-___-__'}
                           value={phone}
                           onChange={onSetNumber}
                    />
                    <p className={'warning-input warning-input_bottom'}>{errorPhone}</p>
                </div>
                <div className={'reg-field'}>
                    <label htmlFor="Mail" className={`label ${errorMail && 'error'}`}>E-mail</label>
                    <input id={'Mail'} className={`modalInput modalInput_light ${errorMail && 'error'}`}
                           type="email"
                           placeholder={'E-mail'}
                           value={mail}
                           onChange={onSetMail}
                    />
                    <p className={'warning-input warning-input_bottom'}>{errorMail}</p>
                </div>
                <div className={'reg-field'}>
                    <InputPassword password={password} onSetPassword={onSetPassword} placeholder={'Придумайте пароль'} error={isErrorPassword}/>
                </div>
                <button onClick={onContinueRegistry} className={'button button_dark reg__button'}>ПРОДОЛЖИТЬ</button>
                <p className={'contract'}>
                    Нажимая на кнопку “Продолжить”,
                    вы соглашаетесь c <a href={'/documents/oferta_td_market.pdf'} target={'_blank'} rel="noopener noreferrer">Договором Оферты</a> и <a href={'/'} target={'_blank'} rel="noreferrer">Политикой Конфиденциальности</a>.
                </p>
            </form>
            {isCover && <ModalLogin observableModal={1} isShelter={true}/>}
        </>

    );
};

export default FormRegistration;
