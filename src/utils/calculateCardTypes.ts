import {ITypeRes} from "../models/IProductCard";
import {IColor} from "../models/IColor";

export function calculateCardTypes(typeQuantity: ITypeRes[] | undefined) {

    const uniqueColors = typeQuantity
        ?.filter((type, index, self) =>
            self.findIndex(t => t.color?.name === type.color?.name) === index
        )
        .map(type => type.color) || [];

    const existingColors = uniqueColors.filter(color => color !== null && color !== undefined);

    const sizes = typeQuantity?.map(type => type.size) || [];

    return {
        colorsGood: existingColors as IColor[],
        sizes: [...new Set(sizes)],
    };
}
