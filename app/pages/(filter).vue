<script setup lang="ts">
import type { Data } from "~/types";

const route = useRoute();
const { data, isLoading, isPending } = useQuery({
    staleTime: 1000 * 60 * 60,
    key: () => [
        "all-apartments",
        route.query.sort as string,
        route.query.order as string,
        route.query.page as string,
        route.query.room as string,
        route.query.price as string,
        route.query.area as string,
    ],
    query: async () => {
        return await $fetch<Data>("/api/apartments", {
            query: {
                ...route.query,
            },
        });
    },
    placeholderData: (data) => data,
});
</script>

<template>
    <div class="with-sidebar">
        <div class="content">
            <h1><a href="/">Квартиры</a></h1>
            <ApartmentsList v-model="data" :is-loading :is-pending />
        </div>
        <div class="sidebar">
            <Filter />
        </div>
    </div>
</template>
