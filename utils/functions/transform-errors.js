export const transformErrors = (errors) => {
    const transformedErrors = {};

    errors.forEach((error) => {
        transformedErrors[error.path] = error.message;
    });

    return transformedErrors;
};
