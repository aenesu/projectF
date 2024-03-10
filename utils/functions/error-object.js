/**
 * @param {string} message
 * @param {object} errors
 * @returns {object}
 */

export const errorObject = (message, errors) => {
    return {
        status: "error",
        message,
        errors,
    };
};
