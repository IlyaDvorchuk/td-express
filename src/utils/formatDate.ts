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
