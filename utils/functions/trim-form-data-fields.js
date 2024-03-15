/**
 * 
 * @param {*} formData - The FormData object to trim
 * @returns {object} - The FormData object with all string values trimmed
 */


export const trimFormDataFields = (formData) => {
    // Convert FormData entries to an array, map over them, and trim strings
    const trimmedEntries = Array.from(formData.entries()).map(
        ([key, value]) => {
            // Check if value is a string and trim it if so (otherwise return the value as is)
            return [key, typeof value === "string" ? value.trim() : value];
        }
    );

    // Convert the array of entries back into an object
    return Object.fromEntries(trimmedEntries);
};
