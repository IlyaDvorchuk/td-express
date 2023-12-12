export interface IComment {
    text: string,
    productId: string,
    userName: string
}

export interface ICommentRes extends IComment{
    _id: string,
    createdAt: string
}
