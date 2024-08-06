import {holidays} from "../entities/Date";

export const toMountainTime = (date: Date) => {
    return new Date(date.toLocaleString("en-US", {timeZone: "America/Edmonton"}));
}
export const getDate = (startDate: string | null) => {
    if (!startDate) return [];

    const date = toMountainTime(new Date(startDate + "T00:00:00"));
    if (isNaN(date.getTime())) return [];

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + i);
        dates.push(newDate);
    }
    return dates;
}

export const formatDay = (date: Date) => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
}

export const isHoliday = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return holidays.includes(dateString);
}