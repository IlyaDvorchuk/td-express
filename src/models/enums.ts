export enum StatusEnum {
    DEFAULT = '',
    PENDING_MODERATION = 'В ожидании модерации',
    MODERATION = 'В модерации',
    APPROVED = 'В продаже',
    OVER = 'Закончился',
    REJECT = 'Отклонён'
}

export enum ADMIN_SCREEN {
    "GENERAL"= "GENERAL",
    "MODERATION_AD" = "MODERATION_AD",
    "MODERATION_SELLERS" =  "MODERATION_SELLERS",
    "PRODUCT_LIST" = "PRODUCT_LIST"
}

export enum OrderEnum {
    DEFAULT = '',
    AWAITING_CONFIRMATION = 'ожидает подтверждения',
    AWAITING_SHIPMENT = 'ожидает отправки',
    DELIVERY = 'в процессе доставки',
    COMPLETED = 'заказ завершен',
}