export const sortFrom = (data: number[], sort: "asc" | "desc") => {
    let sorted: number[] = [];
    if (sort === "asc") {
        sorted = data.sort((a, b) => a - b);
    } else if (sort === "desc") {
        sorted = data.sort((a, b) => b - a);
    }
    return sorted;
};
