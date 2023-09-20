export interface IColor {
    name: string,
    color: string,
    _id: string
}

export interface ISelectedColor extends IColor {
    image?: string | undefined
}
