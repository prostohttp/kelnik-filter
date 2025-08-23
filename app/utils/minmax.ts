import type { Apartment } from "~/types";
import { sortFrom } from "~/utils/sort";

export const minMaxFrom = (
    data: Apartment[],
    key: "area" | "price",
): [number, number] => {
    let areaPrice: number[] = [];
    if (key === "area") {
        areaPrice = data.map((apartment) => Math.floor(apartment.area));
    } else if (key === "price") {
        areaPrice = data.map((apartment) => apartment.price);
    }

    const sorted = sortFrom(areaPrice, "asc");
    return [sorted[0]!, sorted[sorted.length - 1]!];
};
