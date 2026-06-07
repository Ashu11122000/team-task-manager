export const asyncHandler = <T extends (...args: unknown[]) => unknown>(
    fn: T
) => {
    return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
        try {
            return await fn(...(args as Parameters<T>)) as Awaited<ReturnType<T>>;
        } catch (error) {
            console.error(error);

            throw error;
        }
    };
};