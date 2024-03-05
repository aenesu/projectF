export const filterAndSortDataByTitle = (data, role) => {
    if (!data || !role) return [];

    const filteredData = data.filter((item) => item.roles.includes(role));

    // since we want dashboard to be at the top, we need to sort the rest of the items after Dashboard
    const restOfItems = filteredData
        .slice(1)
        .sort((a, b) => a.title.localeCompare(b.title));
    return [filteredData[0], ...restOfItems];
};
