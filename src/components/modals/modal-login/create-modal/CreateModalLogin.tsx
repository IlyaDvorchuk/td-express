import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import './create-modal-login.scss'
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {createNewPasswordUser, registrationUser} from "../../../../store/reducers/user/UserCreators";
import {TVisibility} from "../../../../models/types";
import {createNewPasswordShelter} from "../../../../store/reducers/shelter/ShelterCreator";

interface ICreateModalLogin {
    closeUserModal: () => void,
    isShelter?: boolean,
    forgotPassword?: boolean,
    setCurrentModal: Dispatch<SetStateAction<number>>,
}

const CreateModalLogin = ({closeUserModal, isShelter, forgotPassword = false, setCurrentModal} : ICreateModalLogin) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)
    const {email} = useAppSelector(state => state.shelterReducer.shelter)
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [visibilityPassword, setVisibilityPassword] = useState<TVisibility>('password')
    const [visibilityRepeat, setVisibilityRepeat] = useState<TVisibility>('password')
    const [error, setError] = useState(false)

    const onSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setError(false)
    }

    const onSetRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value)
        setError(false)
    }

    const onSwitchVisibility = (index: number) => {
        if (index === 0) {
            setVisibilityPassword(visibilityPassword === 'password' ? 'text' : 'password')
        } else if (index === 1) {
            setVisibilityRepeat(visibilityRepeat === 'password' ? 'text' : 'password')
        }
    }

    const onFinalRegistry = () => {
        if (password.trim() === repeatPassword.trim()) {
             dispatch(registrationUser(user, password))
            closeUserModal()
        } else {
            setError(true)
        }
    }

    const onNewPassword = () => {
        if (password.trim() === repeatPassword.trim()) {

            dispatch(isShelter ? createNewPasswordShelter(email, password) : createNewPasswordUser(user?.email, password))
            if (isShelter) {
                closeUserModal()
            } else {
                setCurrentModal(4)
            }
        } else {
            setError(true)
        }
    }

    return (
        <div className={'creatModal'}>
            <h3 className={'userAuthModal__title creatModal__title'}>Придумайте надёжный пароль</h3>
            <div className={'userAuthModal__form'}>
                <label className={'userAuthModal__label'} htmlFor={'passwordInput'}>Введите пароль</label>
                <input
                    value={password}
                    onChange={onSetPassword}
                    id={'passwordInput'}
                    type={visibilityPassword}
                    className={`modalInput creatModal__password`}
                />
                <img
                    src={'/images/svg/open-eye.svg'}
                    className={'img'}
                    alt={''}
                    onClick={() => onSwitchVisibility(0)}/>
            </div>
            <div className={'userAuthModal__form'}>
                <label className={'userAuthModal__label'} htmlFor={'repeatPasswordInput'}>Введите пароль еще раз</label>
                <input
                    value={repeatPassword}
                    onChange={onSetRepeatPassword}
                    id={'repeatPasswordInput'}
                    type={visibilityRepeat}
                    className={`modalInput creatModal__repeat-password`}
                />
                <img
                    src={'/images/svg/open-eye.svg'}
                    className={'img'}
                    onClick={() => onSwitchVisibility(1 )}
                    alt={''}
                />
                {error && <p className={'warning-input creatModal__warningLogin'}>Пароли не совпадают. Проверьте правильность ввода.</p>}
            </div>
            {!forgotPassword ?
                <button className={'button button_dark'} onClick={onFinalRegistry}>ЗАВЕРШИТЬ РЕГИСТРАЦИЮ</button>
                :
                <button className={'button button_dark'} onClick={onNewPassword}> Создать Новый пароль</button>
            }
        </div>
    );
};

export default CreateModalLogin;
