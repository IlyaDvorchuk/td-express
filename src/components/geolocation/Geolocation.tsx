import React from 'react';
import GeolocationSvg from "../svg/GeolocationSvg";
import './geolocation.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {locationSlice} from "../../store/reducers/LocationSlice";
import Cover from "../cover/Cover";

const Geolocation = ({mobile = false}: {mobile?: boolean}) => {
    const {cities, city, isActive} = useAppSelector(state => state.locationReducer)
    const {changeCity, changeActive} = locationSlice.actions
    const dispatch = useAppDispatch()


    const onActive = () => {
        dispatch(changeActive(!isActive))
    }


    const onSelectCity = (index: number): void => {
        dispatch(changeCity(cities[index]))
    }

    return (
        <>
            <div className={`geolocation ${mobile && 'geolocation_mobile'}`} onClick={onActive}>
                <GeolocationSvg/>
                <div className={'geolocation__city'}>
                    {city}
                </div>

            </div>
            {isActive &&
                <>
                    <Cover callback={onActive}/>
                    <div className="geolocation__select">
                        <h3 className="geolocation__title">Выберите город доставки</h3>
                        {cities.map((item, index) => (
                            <div className={`geolocation__select-item ${item === city && 'active'}`}
                                 key={index}
                                 onClick={() => onSelectCity(index)}>{item}
                            </div>
                        ))}
                    </div>
                </>

            }
        </>
    );
};

export default Geolocation;