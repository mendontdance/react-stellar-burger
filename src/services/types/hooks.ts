import {  TApplicationActions, AppThunk } from ".";
import { Dispatch } from "redux";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { RootState } from "../reducers/rootReducer";

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>;

// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
