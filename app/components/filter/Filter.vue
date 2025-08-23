<script setup lang="ts">

const route = useRoute();
defineProps<{
    isLoading: boolean;
    isPending: boolean;
}>();

const filterStore = useFilterStore();
const isActiveFilters = computed(
    () => filterStore.rooms || filterStore.prices || filterStore.areas,
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
        <form class="filter__form" @submit.prevent>
            <FilterRoomsNumber />
            <FilterApartmentPrice />
            <FilterApartmentArea />
            <div v-if="isActiveFilters">
                <AppClearDataButton
                    text="Сбросить параметры"
                    @clear-data="resetFiltersHandler"
                />
            </div>
        </form>
    </div>
</template>
