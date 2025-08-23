import { useQuery } from "@pinia/colada";


// ['apartments', 'search', { filters: { rooms: [1, 2, 3 ,4], price: [50000000, 5600000], area: [20,70] }}]
// macbook pro 16 M3 Max 48Gb 1Tb, iPhone 16 pro max 256Gb
export function useApartments() {
    const query = useQuery({
        key: () => ["all-apartments"],
        query: async () => await $fetch("/api/apartments"),
    });
    return { query };
}
