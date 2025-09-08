import type { Order } from "~/types";
import { Sort } from "~/types";
import { LIMIT, PAGE } from "~/constants";
import { sortBy } from "~/utils/sortBy";
import { safeParseArray } from "~/utils/parseArray";
import { apartments } from "~~/.data/data";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Number(query.page) || PAGE;
    const limit = Number(query.limit) || LIMIT;
    const sort = query.sort as string;
    const order = query.order as Order;
    const all = query.all as string;

    const rooms = query.room as string;
    const prices = query.price as string;
    const areas = query.area as string;

    let data = apartments;

    if (rooms) {
        const roomsArray = safeParseArray(rooms);
        if (roomsArray && roomsArray.length) {
            data = data.filter((el) => roomsArray?.includes(el.rooms));
        }
    }

    if (prices) {
        const pricesArray = safeParseArray(prices);
        if (Array.isArray(pricesArray)) {
            data = data.filter(
                (el) =>
                    pricesArray[0] &&
                    pricesArray[1] &&
                    el.price >= pricesArray[0] &&
                    el.price <= pricesArray[1],
            );
        }
    }

    if (areas) {
        const areasArray = safeParseArray(areas);
        if (Array.isArray(areasArray)) {
            data = data.filter(
                (el) =>
                    areasArray[0] &&
                    areasArray[1] &&
                    el.area >= areasArray[0] &&
                    el.area <= areasArray[1],
            );
        }
    }

    if (all === "true") {
        return data;
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

    const totalPages = Math.ceil(data.length / Number(limit));
    data = data.slice(0, limit * page);

    return { items: data, totalPages };
});
