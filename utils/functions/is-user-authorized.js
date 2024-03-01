import { rolePermissions } from "@/routes";

/**
 *
 * @param {string} userRole
 * @param {string} requestPageUrl
 * @returns {boolean} - Whether the user is authorized to access the requested page
 */

export const isUserAuthorized = (userRole, requestPageUrl) => {
    const accessibleRoutes = rolePermissions[userRole] || [];

    return accessibleRoutes.some((routePattern) =>
        routePattern.test(requestPageUrl)
    );
};
