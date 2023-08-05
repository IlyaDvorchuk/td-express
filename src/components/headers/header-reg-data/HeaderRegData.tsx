import React from 'react';
import Container from "../../container/Container";
import '../header-req-shelter/header-reg-shelter.scss'
import './header-reg-data.scss'
import {useAppDispatch} from "../../../hooks/redux";
import {shelterSlice} from "../../../store/reducers/shelter/ShelterSlice";
import ButtonBack from "../../buttons/button-back/ButtonBack";

// interface IProps {
//     isData: boolean,
//     isShop: boolean,
//     id?: string | null
// }

const HeaderRegData = ({isData = true, isShop = false}) => {
    const dispatch = useAppDispatch()
    const {setIsRegistry} = shelterSlice.actions

    const onSaveShelter = async () => {

        dispatch(setIsRegistry(true))
    }

    return (
        <header className={`header-reg`}>
            <Container>
                <div className={`header-reg-_data ${isShop && 'shop'}`}>
                    <ButtonBack/>
                    {
                        isData ?
                            <h2>Личные данные</h2>
                            :
                            <h2>Данные магазина</h2>
                    }

                    {isData && <button className={'button button_light header-reg__button'} onClick={onSaveShelter}>
                        СОХРАНИТЬ
                    </button>}
                </div>
            </Container>
        </header>
    );
};

export default HeaderRegData;
