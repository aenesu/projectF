import moment from "moment";

export const compareDateWithToday = (date) => {
    // get today's date at the start of the day for comparison
    const today = moment().startOf("day");

    // parse the input date and use start of day for comparison
    const inputDate = moment(date).startOf("day");

    if (inputDate.isSame(today, "day")) {
        return "ongoing";
    } else if (inputDate.isBefore(today, "day")) {
        return "past";
    } else if (inputDate.isAfter(today, "day")) {
        return "upcoming";
    } else {
        return false;
    }
};
