import type { Apartment } from "~/types";

export const useApartmentStore = defineStore("apartment", () => {
    const apartments = ref<Apartment[]>([]);
    const getApartments = async (): Promise<Apartment[]> => {
        apartments.value = await $fetch<Apartment[]>("/api/apartments");
        return apartments.value;
    };
    const setApartments = (data: Apartment[]) => {
        apartments.value = data;
    };

    return {
        apartments,
        getApartments,
        setApartments,
    };
});
