/**
 * the default redirect page after a successful login
 * @type {string}
 */

export const DEFAULT_REDIRECT_PAGE = "/dashboard";

/**
 * array of routes that are accessible to the public
 * These routes does not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authenticationRoutes = ["/login", "/error"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiPrefix = "/api/auth";

/**
 * Routes accessible to admin users
 * @type {RegExp[]}
 */

export const ADMIN = [
    /^\/dashboard\/?$/, // Matches "/dashboard" exactly and "/dashboard/"
    /^\/dashboard\/manage\/?$/, // Matches "/dashboard/manage" exactly and "/dashboard/manage/"
    /\/dashboard\/manage\/admin($|\/.*)/,
    /\/dashboard\/manage\/assistant-manager($|\/.*)/,
    /\/dashboard\/manage\/education-term($|\/.*)/,
    /\/dashboard\/manage\/lesson($|\/.*)/,
    /\/dashboard\/manage\/lesson-program($|\/.*)/,
    /\/dashboard\/manage\/manager($|\/.*)/,
    /\/dashboard\/manage\/message($|\/.*)/,
    /\/dashboard\/manage\/student($|\/.*)/,
    /\/dashboard\/manage\/teacher($|\/.*)/,
];

/**
 * Routes accessible to manager users
 * @type {RegExp[]}
 */

export const MANAGER = [
    /^\/dashboard\/?$/,
    /^\/dashboard\/manage\/?$/,
    /\/dashboard\/manage\/assistant-manager($|\/.*)/,
    /\/dashboard\/manage\/message($|\/.*)/,
];

/**
 * Routes accessible to assistant manager users
 * @type {RegExp[]}
 */

export const ASSISTANTMANAGER = [
    /^\/dashboard\/?$/,
    /^\/dashboard\/manage\/?$/,
    /\/dashboard\/manage\/education-term($|\/.*)/,
    /\/dashboard\/manage\/lesson($|\/.*)/,
    /\/dashboard\/manage\/lesson-program($|\/.*)/,
    /\/dashboard\/manage\/message($|\/.*)/,
    /\/dashboard\/manage\/student($|\/.*)/,
    /\/dashboard\/manage\/teacher($|\/.*)/,
];

/**
 * Routes accessible to teacher users
 * @type {RegExp[]}
 */

export const TEACHER = [
    /^\/dashboard\/?$/,
    /^\/dashboard\/manage\/?$/,
    /\/dashboard\/manage\/meeting($|\/.*)/,
    /\/dashboard\/manage\/student-information($|\/.*)/,
];

/**
 * Routes accessible to student users
 * @type {RegExp[]}
 */

export const STUDENT = [
    /^\/dashboard\/?$/,
    /^\/dashboard\/grades\/?$/,
    /^\/dashboard\/lessons\/?$/,
    /^\/dashboard\/meetings\/?$/,
];

/**
 * Roles
 * @type {{ADMIN: RegExp[], MANAGER: RegExp[], ASSISTANTMANAGER: RegExp[], TEACHER: RegExp[], STUDENT: RegExp[]}}
 */

export const rolePermissions = {
    ADMIN,
    MANAGER,
    ASSISTANTMANAGER,
    TEACHER,
    STUDENT,
};
