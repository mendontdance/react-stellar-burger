export type TCustomResponse = {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
    json(): any;
}

export type TResponseBody<TDataType> = {
    readonly success: boolean;

    accessToken: string;
    refreshToken: string;
    user?: TDataType;
    message?: string;
    headers?: Headers;
    data?: any
}

export type TUser = {
    readonly id: number;
    password: string;
    email: string;
    name: string;
};

export type TUserInfo = {
    email: string;
    password: string;
    text?: string;
    name: string;
}

export type TResponseBodyWithoutToken<TDataType> = {
    readonly success: boolean;

    user?: TDataType;
    message?: string;
    headers?: Headers;
    data?: any
}

export type TIngredient = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    order: number,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
    _newId?: string
}

export type TRawUser = {
    success?: boolean,
    email?: string,
    name?: string,
    password?: string
}

export type TRegisteredInfo = {
    email: string,
    password: string,
    name: string,
}

export type TLoginInfo = {
    email: string,
    password: string,
    name: string;
}