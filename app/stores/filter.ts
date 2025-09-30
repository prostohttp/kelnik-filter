import type { ApartmentForFilter, SliderData } from "~/types";
import { uniqueRooms as uniqueRoomsHandler } from "~/utils/uniqueRooms";
import { minMaxFrom } from "~/utils/minmax";

export const useFilterStore = defineStore("filter", () => {
    const rooms = ref<number[]>();
    const setRooms = (value: number) => {
        if (!rooms.value?.length) {
            rooms.value = [];
        }
        if (rooms.value.includes(value)) {
            const index = rooms.value.findIndex((room) => room === value);
            rooms.value.splice(index, 1);
        } else {
            rooms.value.push(value);
        }
    };
    const uniqueRooms = async () => {
        const data = await $fetch<ApartmentForFilter[]>("/api/apartments", {
            query: {
                all: true,
            },
        });
        return uniqueRoomsHandler(data);
    };

    const apartmentsWithActiveRooms = ref<ApartmentForFilter[]>([]);
    const setApartmentsWithActiveRooms = async (prices: SliderData, areas: SliderData) => {
        const data = await $fetch<ApartmentForFilter[]>("/api/apartments", {
            query: {
                all: true,
                price: JSON.stringify(prices),
                area: JSON.stringify(areas),
            },
        });
        apartmentsWithActiveRooms.value = data;
    };

    const prices = ref<SliderData>();
    const setPrices = (data: SliderData) => {
        prices.value = [numberFrom(data[0]), numberFrom(data[1])];
    };
    const minMaxPrices = async () => {
        const data = await $fetch<ApartmentForFilter[]>("/api/apartments", {
            query: {
                all: true,
            },
        });
        return minMaxFrom(data, "price");
    };

    const areas = ref<SliderData>();
    const setAreas = (data: SliderData) => {
        areas.value = [numberFrom(data[0]), numberFrom(data[1])];
    };
    const minMaxAreas = async () => {
        const data = await $fetch<ApartmentForFilter[]>("/api/apartments", {
            query: {
                all: true,
            },
        });
        return minMaxFrom(data, "area");
    };

    const clearFilters = () => {
        rooms.value = undefined;
        prices.value = undefined;
        areas.value = undefined;

    };

    return {
        rooms,
        setRooms,
        uniqueRooms,
        apartmentsWithActiveRooms,
        setApartmentsWithActiveRooms,
        prices,
        setPrices,
        minMaxPrices,
        areas,
        setAreas,
        clearFilters,
        minMaxAreas,
    };
});
