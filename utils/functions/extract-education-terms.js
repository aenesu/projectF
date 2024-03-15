import moment from "moment";

/**
 *
 * @param {object} data
 * @returns {Array<{value: string, label: string}> | []
 *
 */

export const extractEducationTerms = (data) => {
    if (!data || data?.status === "error") return [];

    // sort the data by startDate using moment for date comparison
    const sortedData = data.sort((a, b) =>
        moment(a.startDate).diff(moment(b.startDate))
    );

    return sortedData.map((item) => {
        // take only the first part of the term, convert it to lowercase, then capitalize the first letter
        const formattedTerm =
            item.term
                .split("_")[0] // take the first part of the "FALL_SEMESTER" | "SPRING_SEMESTER" term
                .toLowerCase() // convert to lowercase => "fall" | "spring"
                .charAt(0)
                .toUpperCase() + item.term.split("_")[0].slice(1).toLowerCase(); // capitalize the first letter => "Fall" | "Spring"

        return {
            value: item.id,
            label: `${formattedTerm} - ${moment(item.startDate).format("LL")}`,
        };
    });
};
