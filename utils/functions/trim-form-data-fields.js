export const trimFormDataFields = (formData) => {
    // convert FormData to an array, map over them, and trim the strings
    const trimmedEntries = Array.from(formData.entries()).map(
        ([key, value]) => {
            return [key, typeof value === "string" ? value.trim() : value];
        }
    );

    // convert the array entries back to an object
    return Object.fromEntries(trimmedEntries);
};
