<script setup lang="ts">
import { DEBOUNCE_TIME } from "~/constants";
import type { Data } from "~/types";

const route = useRoute();
const page = ref(Number(route.query.page) || 1);

const props = defineProps<{
    isLoading: boolean;
    isPending: boolean;
}>();

const data = defineModel<Data>();

const isEmptyData = computed(() => !data.value?.items.length && !props.isLoading);
const loadMore = computed(() => data.value && page.value < data.value.totalPages);
const increasePageHandler = useDebounceFn(async () => {
    navigateTo({
        query: {
            ...route.query,
            page: ++page.value,
            limit: 20,
        },
    });
}, DEBOUNCE_TIME);
</script>

<template>
    <div>
        <ApartmentsListHeader :class="{ placeholder: isLoading }" />
        <AppLoading v-if="isPending" />
        <div
            v-if="data?.items.length"
            class="apartments-list"
            :class="{ placeholder: isLoading }"
        >
            <ApartmentsListItem
                v-for="apartment in data.items"
                :key="apartment.id"
                :apartment="apartment"
            />
        </div>
        <AppBaseButton
            v-if="loadMore"
            @click="increasePageHandler"
        >
            Загрузить еще
        </AppBaseButton>
        <AppNotFound v-if="isEmptyData"> Квартиры не найдены </AppNotFound>
    </div>
</template>
