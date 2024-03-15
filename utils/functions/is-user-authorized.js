import { rolePermissions } from "@/routes";

/**
 * Check if the user is authorized to access the requested page
 * @param {string} userRole - The role of the user
 * @param {string} requestedPageUrl - The URL of the requested page
 * @returns {boolean} - True if the user is authorized, false otherwise
 */

export const isUserAuthorized = (userRole, requestPageUrl) => {
    const accessibleRoutes = rolePermissions[userRole] || [];
    // Use regex.test() to check if the requestedPageUrl matches any patterns
    return accessibleRoutes.some((routePattern) =>
        routePattern.test(requestPageUrl)
    );
};
