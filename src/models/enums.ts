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

export enum PopupEnum {
    DEFAULT = '',
    ADD_CART = 'add_cart',
    ADD_CART_NOT_USER = 'add_cart_not_user',
    ADD_FAVORITE = 'add_favorite',
    ADD_FAVORITE_NOT_USER = 'add_favorite_not_user',
}
