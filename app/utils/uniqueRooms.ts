import type { Apartment } from "~/types";
import { sortFrom } from "~/utils/sort";

export const uniqueRooms = (data: Apartment[]) => {
    const rooms = data.map((apartment) => apartment.rooms);
    const uniqueRooms = new Set(rooms);
    return sortFrom(Array.from(uniqueRooms), "asc");
};
