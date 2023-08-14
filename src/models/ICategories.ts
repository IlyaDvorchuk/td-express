export interface ICategories {
    categories: ICategory[] | [],
    isLoading: boolean,
    error: string
}

export interface ICategory {
    type?: 'category',
    name: string,
    icon?: string,
    children: ISubcategory[],
    productCards: string[],
    _id: string
}

export interface ISubcategory {
    type?: 'subcategory',
    name: string,
    children: ISection[]
    _id: string,
    alternateName: string,
    parentName?: string
    parent?: string
}

export interface ISection {
    type?: 'section',
    name: string,
    _id: string
}
