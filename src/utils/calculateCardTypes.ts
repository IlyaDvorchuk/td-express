import {ITypeRes} from "../models/IProductCard";
import {IColor} from "../models/IColor";

export function calculateCardTypes(typeQuantity: ITypeRes[] | undefined) {
    const existingTypes = typeQuantity?.filter(type => type)
    console.log('existingTypes', existingTypes)
    const uniqueColors = existingTypes
        ?.filter((type, index, self) =>
            self.findIndex(t => t.color?.name === type.color?.name) === index
        )
        .map(type => type.color) || [];

    const existingColors = uniqueColors.filter(color => color !== null && color !== undefined);

    const sizes = existingTypes?.map(type => type.size) || [];

    return {
        colorsGood: existingColors as IColor[],
        sizes: [...new Set(sizes)],
    };
}
