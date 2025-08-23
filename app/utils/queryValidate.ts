export const queryValidateFor = <T>(data: T, fn: (data: T) => void): void => {
    try {
        fn(data);
    } catch {
        throw createError({
            statusCode: 400,
            fatal: true,
            message: "Не балуйся с адресной строкой, не делай так!",
        });
    }
};
