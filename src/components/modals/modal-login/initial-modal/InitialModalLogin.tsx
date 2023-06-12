import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import './initial-modal-login.scss';
import validator from 'validator';
import {useAppDispatch} from "../../../../hooks/redux";
import {userSlice} from "../../../../store/reducers/user/UserSlice";
import {checkEmail, sendCode} from "../../../../store/reducers/user/UserCreators";

const InitialModalLogin = ({setCurrentModal}: {setCurrentModal: Dispatch<SetStateAction<number>>}) => {
    const dispatch = useAppDispatch()
    const {setEmailUser} = userSlice.actions
    const [isAgree, setIsAgree] = useState(false)
    const [email, setEmail] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [warningAgree, setWarningAgree] = useState(false)

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setIsEmailError(false)
        setEmail(e.target.value);
    }

    const onLogin = async () => {
        if (!isAgree) setWarningAgree(true)
        if (!isAgree || !validator.isEmail(email)) return
        const isExistEmail = await dispatch(checkEmail(email))
        if (isExistEmail) {
            dispatch(setEmailUser(email))
            setCurrentModal(4)
        } else {
            setIsEmailError(true)
        }
    }

    const onRegistry = () => {
        if (!isAgree) setWarningAgree(true)
        if (!isAgree || !validator.isEmail(email)) return
        dispatch(setEmailUser(email))
        dispatch(sendCode(email))
        setCurrentModal(1)
    }

    const onAgreeRules = () => {
        setIsAgree(!isAgree)
        setWarningAgree(false)
    }

    return (
        <div className={'modalLogin'}>
            <h3 className={'userAuthModal__title'}>Войти или создать аккаунт</h3>
            <div className={'modalLogin__email'}>
                {isEmailError &&
                    <p className={'warningLogin'}>Вы ввели несуществующий E-mail</p>}
                <input value={email} onChange={changeEmail} type="email" className={'modalInput'} placeholder={'E-mail...'} autoComplete={'on'}/>
            </div>
            <button className={'button button_dark'} onClick={onLogin}>ВОЙТИ</button>
            <button className={'button button_light'} onClick={onRegistry}>ЗАРЕГИСТРИРОВАТЬСЯ</button>
            <div className={'modalLogin__rules'}>
                {warningAgree && <p className={'warningLogin'}>Вам необходимо согласиться с условиями</p>}
                <div className={'modalLogin__row'}>
                    <input type={'checkbox'} className={'modalLogin__checkBox'} onChange={onAgreeRules}/>
                    <p className={'modalLogin__conditions'}>
                        Согласен с условиями, <a href={'/'} className={'modalLogin__link'}>правилами возврата</a> и
                        <a href="/" className={'modalLogin__link'}> правилами пользования торговой площадкой</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InitialModalLogin;
