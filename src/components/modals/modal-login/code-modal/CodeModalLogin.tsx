import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import './code-modal-login.scss'
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {sendCode} from "../../../../store/reducers/user/UserCreators";
import {sendCodeShelter} from "../../../../store/reducers/shelter/ShelterCreator";
import {useNavigate} from "react-router-dom";
import {shelterSlice} from "../../../../store/reducers/shelter/ShelterSlice";

interface ICodeModalLogin {
    setCurrentModal: Dispatch<SetStateAction<number>>,
    isShelter?: boolean,
    forgotPassword?: boolean
}

const CodeModalLogin = ({setCurrentModal, isShelter, forgotPassword}: ICodeModalLogin) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {email} = useAppSelector(state => state.userReducer.user)
    const emailShelter = useAppSelector(state => state.shelterReducer.shelter.email)
    const {activationCode} = useAppSelector(state => state.userReducer)
    const activationCodeShelter = useAppSelector(state => state.shelterReducer.activationCode)
    const {setIsRegistered} = shelterSlice.actions
    const [code, setCode] = useState('')
    const [isError, setIsError] = useState(false)

    const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        // пустая строка или только цифры
        if (e.target.value === '' || /^\d+$/i.test(e.target.value)) {
            setCode(e.target.value)
            setIsError(false)
        }
    }

    const onCompareCode = (e: any) => {
        e.preventDefault()
        if (!isShelter && forgotPassword) {
            const stringCode = activationCode.toString()
            if (stringCode === code) {
                setCurrentModal(3)
                return
            } else setIsError(true)
        }
        if (!isShelter && !forgotPassword) {
            const stringCode = activationCode.toString()
            if (stringCode === code) {

                setCurrentModal(2)
            } else setIsError(true)
        }

        if (isShelter && !forgotPassword) {
            const stringCode = activationCodeShelter.toString()
            if (stringCode === code) {
                navigate('/personal-data')
                setIsRegistered(true)

            } else setIsError(true)
            return;
        }

        if (isShelter && forgotPassword) {
            const stringCode = activationCodeShelter.toString()
            if (stringCode === code) {
                setCurrentModal(3)
            } else setIsError(true)
            return
        }
    }

    const onRepeatCode = (e: any) => {
        e.preventDefault()
        !isShelter ? dispatch(sendCode(email)) : dispatch(sendCodeShelter(emailShelter))
    }

    useEffect(() => {
        console.log('forgotPassword')
    }, [])

    return (
        <div className={'modalCode'}>
            {!forgotPassword ?
                <p className={'modalCode__text'}>
                    Мы отправили письмо с кодом на почту <strong>{isShelter ? emailShelter: email}</strong>. Введите код для завершения регистрации.
                </p>
                :
                <p className={'modalCode__text'}>
                    Мы отправили письмо с кодом на почту <strong>{isShelter ? emailShelter: email}</strong>. Введите код для создания нового пароля.
                </p>
            }

            <div className={'inputCode'}>
                <input
                    type="text"
                    className={`modalInput ${isError && 'error'}`}
                    placeholder={'Ввести полученный код'}
                    value={code}
                    onChange={onChangeCode}
                />
                {isError && <p className={'warning-input'}>
                    Вы ввели неверный код авторизации. Попробуйте ввести полученный код еще раз.
                </p>}
            </div>
            <button className={'button button_dark modalCode__button'} onClick={onCompareCode}>ПРОДОЛЖИТЬ</button>
            <button className={'button button_light'} onClick={onRepeatCode}>ВЫСЛАТЬ КОД ЕЩЁ РАЗ-</button>
        </div>
    );
};

export default CodeModalLogin;
