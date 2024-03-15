/**
 *
 * @param {object} data
 * @returns {Array<{value: string, label: string}> | []
 *
 */

export const extractLessonPrograms = (data) => {
    if (!data || data?.status === "error") return [];

    return data.map((item) => ({
        value: item.lessonProgramId,
        label: `Lesson Program ${item.lessonProgramId} - ${
            item.lessonName &&
            item.lessonName.map((lesson) => lesson.lessonName).join(", ")
        }`,
    }));
};
