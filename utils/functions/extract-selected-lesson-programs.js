export const extractSelectedLessonPrograms = (data) => {
    if (!data) return [];
    return data.map((item) => ({
        value: item.id,
        label: `Lesson Program ${item.id} - ${item.lesson
            .map((singleLesson) => singleLesson.lessonName)
            .join(", ")}`,
    }));
};