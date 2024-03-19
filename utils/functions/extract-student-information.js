/**
 * Extracts student information from the data
 * @param {Array} data
 * @returns {Array}
 
 */

export const extractStudentInformation = (data) => {
    if (!data) return [];
    return data.map((information) => ({
        value: information.userId || information.id,
        label: `${information.name} ${information.surname}`,
    }));
};
