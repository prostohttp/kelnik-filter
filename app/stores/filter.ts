import type { SliderData } from "~/types";

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
        return await $fetch<number[]>("/api/filter", {
            query: {
                filter: "room",
            },
        });
    };

    const prices = ref<SliderData>();
    const setPrices = (data: SliderData) => {
        prices.value = [numberFrom(data[0]), numberFrom(data[1])];
    };
    const minMaxPrices = async () => {
        return await $fetch<SliderData>("/api/filter", {
            query: {
                filter: "price",
            },
        });
    };

    const areas = ref<SliderData>();
    const setAreas = (data: SliderData) => {
        areas.value = [numberFrom(data[0]), numberFrom(data[1])];
    };
    const minMaxAreas = async () => {
        return await $fetch<SliderData>("/api/filter", {
            query: {
                filter: "area",
            },
        });
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
        prices,
        setPrices,
        minMaxPrices,
        areas,
        setAreas,
        clearFilters,
        minMaxAreas,
    };
});
