<script setup lang="ts">
const route = useRoute();
const filterStore = useFilterStore();
const { rooms, prices, areas } = storeToRefs(filterStore);
const isActiveFilters = computed(
    () => rooms.value || prices.value || areas.value,
);

const resetFiltersHandler = async () => {
    navigateTo({
        query: {
            ...route.query,
            room: undefined,
            price: undefined,
            area: undefined,
        },
    });
    filterStore.clearFilters();
};
</script>

<template>
    <div class="filter">
        <ClientOnly>
            <form class="filter__form" @submit.prevent>
                <FilterRoomsNumber />
                <FilterApartmentPrice />
                <FilterApartmentArea />
                <div v-if="isActiveFilters">
                    <AppClearDataButton @clear-data="resetFiltersHandler">
                        Сбросить параметры
                    </AppClearDataButton>
                </div>
            </form>
            <template #fallback>
                <AppPreloader />
            </template>
        </ClientOnly>
    </div>
</template>
