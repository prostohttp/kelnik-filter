import type { ApartmentForFilter } from "~/types";
import { sortFrom } from "~/utils/sort";

export const uniqueRooms = (data: ApartmentForFilter[]) => {
    const rooms = data.map((apartment) => apartment.rooms);
    const uniqueRooms = new Set(rooms);
    return sortFrom(Array.from(uniqueRooms), "asc");
};
