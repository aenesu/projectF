/**
 *
 * @param {Array} data
 * @returns {Array<{value: string, label: string}> | []
 */

export const extractLessons = (data) => {
    if (!data || data?.status === "error") return [];

    return data.map((item) => ({
        label: item.lessonName,
        value: item.lessonId,
    }));
};
