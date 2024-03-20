/**
 * Check if a letter grade is passing
 *
 * @param {string} grade
 * @returns {boolean}
 *
 */

export const isPassingLetterGrade = (grade) => {
    // Define failing grades as an array. Add more if needed.
    const failingGrades = ["FF"];

    // Check if the provided grade is not in the failingGrades array
    return !failingGrades.includes(grade);
};
