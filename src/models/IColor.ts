export interface IColor {
    name: string,
    color: string,
    _id: string,
    image?: string
}

export interface ISelectedColor extends IColor {
    image?: string | undefined
}

export type ColorImage = {
    image: File | string | undefined,
    name: string,
    color?: string,
    dialColor?: {
        name?: string,
        color?: string,
    }

}

export interface IWatchColor {
    strapColor: IColor | null, dialColor: IColor | null
}
