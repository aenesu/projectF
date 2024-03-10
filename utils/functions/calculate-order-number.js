/**
 * Calculate order number according to page and size in a paginated list
 * @param {number} page
 * @param {number} size
 * @param {number} index
 * @returns {number}
 */

export const calculateOrderNumber = (page, size, index) =>
    (page - 1) * size + index + 1;
