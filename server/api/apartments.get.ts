import type { Apartment, Order } from "~/types";
import { Sort } from "~/types";
import { LIMIT, PAGE } from "~/constants";
import { sortBy } from "~/utils/sortBy";
import { safeParseArray } from "~/utils/parseArray";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Number(query.page) || PAGE;
    const limit = Number(query.limit) || LIMIT;
    const sort = query.sort as string;
    const order = query.order as Order;

    const rooms = query.room as string;
    const prices = query.price as string;
    const areas = query.area as string;

    let data = (await useStorage("db").getItem("data.json")) as Apartment[];

    if (rooms) {
        const roomsArray = safeParseArray(rooms);
        if(roomsArray && roomsArray.length) {
            data = data.filter((el) => roomsArray?.includes(el.rooms));
        } else {;
        }
    }

    if (prices) {
        const pricesArray = safeParseArray(prices);
        if (Array.isArray(pricesArray)) {
            data = data.filter(
                (el) =>
                    el.price >= pricesArray[0] && el.price <= pricesArray[1],
            );
        }
    }

    if (areas) {
        const areasArray = safeParseArray(areas);
        if (Array.isArray(areasArray)) {
            data = data.filter(
                (el) => el.area >= areasArray[0] && el.area <= areasArray[1],
            );
        }
    }

    switch (sort) {
        case Sort.AREA:
            data = sortBy(data, "area", order);
            break;
        case Sort.FLOOR:
            data = sortBy(data, "currentFloor", order);
            break;
        case Sort.PRICE:
            data = sortBy(data, "price", order);
            break;
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    const totalPages = Math.ceil( data.length / Number(limit));
    data = data.slice(0, limit * page);
    return {items: data, totalPages};
});
