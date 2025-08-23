import type { Apartment } from "~/types";
import { minMaxFrom } from "~/utils/minmax";
import { uniqueRooms } from "~/utils/uniqueRooms";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const filter = query.filter as string;

    const data = (await useStorage("db").getItem("data.json")) as Apartment[];
    if (filter === "price") {
        return minMaxFrom(data, "price");
    }
    if (filter === "area") {
        return minMaxFrom(data, "area");
    }
    if (filter === "room") {
        return uniqueRooms(data);
    }
});
