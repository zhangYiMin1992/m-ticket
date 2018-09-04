


export function getPadding(year, month, from) {
    var date = new Date(year + "/" + month + "/1"), day = date.getDay();
    return day;
}

/**
 * Find the number of days in a given month.
 */
export function getDaysInMonth(year, month) {
    return 32 - daylightSavingAdjust(new Date(year, month, 32)).getDate();
}

/**
 * Find the day of the week of the first of a month.
 */
export function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

export function daylightSavingAdjust(date) {
    if (!date) return null;
    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
    return date;
}
