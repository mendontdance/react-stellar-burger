import moment from "moment";
import "moment/locale/ru";

export const formatDate = (date: string | undefined):string => {
    moment.locale('ru')
    return `${moment(date).calendar()} i-GMT+3`
}