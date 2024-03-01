const parseJwt = (token) => {
    // token.split(".")[1] => token has 3 parts: header, payload, signature
    // what we need is in the payload part (2nd part)
    // atob() => decode from base64
    return JSON.parse(atob(token.split(".")[1]));
};

/**
 * Check if the token is valid
 * @param {string} token - The token to check
 * @returns {boolean} - If the token is valid or not
 */

export const isTokenValid = (token) => {
    // check if the token is sent
    if (!token) return false;

    const jwtExpireTimeStamp = parseJwt(token).exp;

    // new Date gets a new date object with the given milliseconds added to 1 January 1970 00:00:00 UTC
    const jwtExpireDateTime = new Date(jwtExpireTimeStamp * 1000);

    // if the token is expired, return false, so meaning the user is not authenticated
    if (jwtExpireDateTime < new Date()) return false;

    return true;
};
