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
