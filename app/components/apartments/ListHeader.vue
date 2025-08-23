<script setup lang="ts">
import { DEBOUNCE_TIME } from "~/constants";
import { Sort, Order, type SortItem } from "~/types";

const route = useRoute();
const sort = ref(route.query.sort);
const order = route.query.order as Order;
const isOrder = () => order === Order.ASC || order === Order.DESC;

const sortItems = ref<SortItem[]>([
    {
        title: "S, м²",
        sort: Sort.AREA,
        class: "area",
        order: sort.value === Sort.AREA && isOrder() ? order : undefined,
    },
    {
        title: "Этаж",
        sort: Sort.FLOOR,
        class: "floor",
        order: sort.value === Sort.FLOOR && isOrder() ? order : undefined,
    },
    {
        title: "Цена, ₽",
        sort: Sort.PRICE,
        class: "price",
        order: sort.value === Sort.PRICE && isOrder() ? order : undefined,
    },
]);

const sortHandler = useDebounceFn((sortItem: SortItem) => {
    sortItems.value.forEach((item) =>
        item !== sortItem ? (item.order = undefined) : false,
    );
    sort.value = sortItem.sort;
    sortItem.order = sortItem.order === Order.ASC ? Order.DESC : Order.ASC;

    navigateTo({
        query: {
            ...route.query,
            sort: sortItem.sort,
            order: sortItem.order,
        },
    });
}, DEBOUNCE_TIME);
</script>

<template>
    <div class="list-header list-wrapper">
        <div class="hidden-md list-wrapper__image">Планировка</div>
        <div class="list-wrapper__info">
            <div class="hidden-md list-wrapper__info-title">Квартира</div>
            <div
                v-for="sortItem in sortItems"
                :key="sortItem.sort"
                :class="`list-wrapper__info-${sortItem.class}`"
            >
                <button
                    class="list-wrapper__info-sort"
                    :class="[
                        {
                            'list-wrapper__info-sort-active':
                                sort === sortItem.sort,
                        },
                    ]"
                    @click="sortHandler(sortItem)"
                >
                    <span>{{ sortItem.title }}</span>
                    <IconSort :order="sortItem.order" />
                </button>
            </div>
        </div>
    </div>
</template>
