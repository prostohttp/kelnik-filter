export const numberFrom = (value: string | number) =>
    typeof value === "string"
        ? Number(value.replace(/\s+/g, ""))
        : Number(value.toString().replace(/\s+/g, ""));
