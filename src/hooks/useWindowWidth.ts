import {useEffect, useState} from "react";

export function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Обработчик изменения размера окна браузера
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Добавляем обработчик при монтировании компонента
        window.addEventListener('resize', handleResize);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowWidth;
}
