export const safeParseArray = (value: string | undefined): number[] | null => {
    if (!value) return null;
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(Number) : null;
    } catch {
        return null;
    }
};
