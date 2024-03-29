export function formatDate(inputDate: string) {
    const date = new Date(inputDate);

    // Получаем компоненты даты и времени
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Собираем строку в нужном формате
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function formatDateDay(dateString: string): string {
    const months: string[] = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();

    return `${day} ${months[month]}`;
}

export function formatDateOnRussian(inputDateStr: string) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
    } as Intl.DateTimeFormatOptions;

    const inputDate = new Date(inputDateStr);
    return inputDate.toLocaleDateString('ru-RU', options);
}

export function createIdOrder() {
    const currentDate = new Date();

    const year = currentDate.getFullYear().toString().slice(-2); // Последние две цифры года
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Месяц с ведущим нулем
    const day = currentDate.getDate().toString().padStart(2, '0'); // День с ведущим нулем
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Часы с ведущим нулем
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Минуты с ведущим нулем
    const seconds = currentDate.getSeconds().toString().padStart(2, '0'); // Секунды с ведущим нулем

    return `${day}.${month}.${year}._${hours}${minutes}${seconds}`;
}
