import React from 'react';
import './header-admin.scss'
import {ADMIN_SCREEN} from "../../../models/enums";
import {UserService} from "../../../services/UserService";

interface IProps {
    currentScreen: ADMIN_SCREEN,
    setCurrentScreen : React.Dispatch<React.SetStateAction<ADMIN_SCREEN>>,
}
const HeaderAdmin = ({currentScreen , setCurrentScreen}: IProps) => {
    // const [bankPageContent, setBankPageContent] = useState<string | null>(null);

    const onTestBank = async () => {
        const response = await UserService.setBank();
        // const responseText = await response.text();
        // setBankPageContent(responseText); // Сохраняем HTML-код в состояние
        if (response?.url) {
            // window.location.href = response?.url;
        }
        console.log('response formData', response);
    };

    const onTestBankPost = async () => {
        const response = await UserService.setBankFetch();
        // const responseText = await response.text();
        // setBankPageContent(responseText); // Сохраняем HTML-код в состояние
        // if (response?.url) {
            // window.location.href = response?.url;
        // }
        console.log('response formData', response);
    };


    const onTestBankGet = async () => {
        const response = await UserService.setBankGet();
        // const responseText = await response.text();
        // setBankPageContent(responseText); // Сохраняем HTML-код в состояние
        // if (response?.url) {
        // window.location.href = response?.url;
        // }
        console.log('response formData', response);
    };


    return (
        <div className={'header-admin'}>
            <p className={'header-admin__logo'}>
                Панель администратора
            </p>
            <button onClick={onTestBank}>Тест банка</button>
            <button onClick={onTestBankPost}>Тест банка post</button>
            <button onClick={onTestBankGet}>Тест банка post</button>
            <div className={'header-admin__links'}>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.GENERAL)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.GENERAL ? 800 : 400}}>
                    Главная
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.MODERATION_AD)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.MODERATION_AD ? 800 : 400}}>
                    Модерация объявлений
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.MODERATION_SELLERS)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.MODERATION_SELLERS ? 800 : 400}}>
                    Модерация регистрируемых продавцов
                </div>
                <div
                    onClick={() => setCurrentScreen(ADMIN_SCREEN.PRODUCT_LIST)}
                    style={{fontWeight: currentScreen === ADMIN_SCREEN.PRODUCT_LIST ? 800 : 400}}>
                    Список товаров доставляемых товаров
                </div>
            </div>
            {/*{bankPageContent && <div dangerouslySetInnerHTML={{ __html: bankPageContent }} />}*/}
        </div>
    );
};

export default HeaderAdmin;
