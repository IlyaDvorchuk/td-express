import React, {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';
import './name-modal-login.scss'
import {useAppDispatch} from "../../../../hooks/redux";
import {userSlice} from "../../../../store/reducers/user/UserSlice";

const NameModalLogin = ({setCurrentModal}: {setCurrentModal: Dispatch<SetStateAction<number>>}) => {
    const dispatch = useAppDispatch()
    const {setNameUser} = userSlice.actions
    const [name, setName] = useState('')
    const [family, setFamily] = useState('')

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onChangeFamily = (e: ChangeEvent<HTMLInputElement>) => {
        setFamily(e.target.value)
    }

    const onContinue = () => {
        dispatch(setNameUser({name, family}))
        setCurrentModal(3)
    }

    return (
        <div className={'modalName'}>
            <h3 className={'userAuthModal__title modalName__title'}>Введите имя и фамилию</h3>
            <input value={name} onChange={onChangeName} type="text" className={`modalInput modalName__name`} placeholder={'Имя'}/>
            <input value={family} onChange={onChangeFamily} type="text" className={`modalInput modalName__family`} placeholder={'Фамилия'}/>
            <button className={'button button_dark'} onClick={onContinue}>ПРОДОЛЖИТЬ</button>
        </div>
    );
};

export default NameModalLogin;
