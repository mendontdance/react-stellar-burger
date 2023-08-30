import { TModalActions } from './modal';
import { TAuthActions } from './auth';
import { TFetchActions } from './fetch';
import { TCounterActions } from './ingredientCounter'
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { RootState } from '../reducers/rootReducer';
import { TWSActionsProfileOrders } from './wsProfile';
import { TWSActions } from './ws';

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
    headers: Headers;
    data?: any;
    name?: string,
    order?: {
        number?: number
    },
    email?: string
    password?: string
}

export type TUser = {
    readonly id: number;
    password: string;
    email: string;
    name: string;
};

export type TUserInfo = {
    email?: string;
    password?: string;
    text?: string;
    name?: string;
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
    price: number,
    proteins: number,
    type: string,
    __v: number | undefined,
    _id: string,
    _newId?: string,
    order: number
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

export type TInfoUser = {
    email?: string,
    password?: string,
    name?: string,
} | undefined

export type TLoginInfo = {
    email: string,
    password: string,
    name: string;
}

export type TCheckUserAuth = {
    getUserData: () => Promise<void>
    catch: () => void
}

export type TActions = TModalActions
    | TAuthActions
    | TFetchActions
    | TCounterActions
    | TWSActions
    | TWSActionsProfileOrders

type Tcatch = {
    catch: () => void
    }

// Типизация всех экшенов приложения
export type TApplicationActions = TActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>>

export type TMessageIngredient = {
    ingredients: string[],
    _id: string,
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string,
    name: string
}

export type TMessage = {
    success: boolean,
    orders: TMessageIngredient[],
    total: number,
    totalToday: number
}