/**
 * @param {string} message
 * @returns {object}
 */

export const errorObject = (message) => {
    return {
        status: "error",
        message,
    };
};
