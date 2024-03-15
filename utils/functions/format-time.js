import moment from "moment";

/**
 *
 * @param {date} time
 * @returns
 */

export const formatTime = (time) => {
    return moment(time, "HH:mm:ss").format("HH:mm");
};
