<script setup lang="ts">

const route = useRoute();
const filterStore = useFilterStore();
const { prices } = storeToRefs(filterStore);
const model = ref(await filterStore.minMaxPrices());

const setState = () => {
    filterStore.setPrices(model.value);
};

onMounted(() => {
    const priceQuery = route.query.price as string;
    if (priceQuery) {
        try {
            const priceArray = safeParseArray(priceQuery);
            if (priceArray) {
                priceArray.length = 2;
                const min = model.value[0];
                const max = model.value[1];

                if (
                    priceArray[0] &&
                    (numberFrom(priceArray[0]) < min ||
                        numberFrom(priceArray[0]) > max)
                ) {
                    model.value[0] = min;
                } else {
                    model.value[0] = priceArray[0]!;
                }
                if (
                    priceArray[1] &&
                    (numberFrom(priceArray[1]) > max ||
                        numberFrom(priceArray[1]) < min)
                ) {
                    model.value[1] = max;
                } else {
                    model.value[1] = priceArray[1]!;
                }
                filterStore.setPrices(model.value);
            }
        } catch {
            throw createError({
                statusCode: 400,
                fatal: true,
                message: "Проверьте фильтр - Цена",
            });
        }
    }
});

watch(prices, async (newValue) => {
    if (newValue) {
        navigateTo({
            query: {
                ...route.query,
                price: JSON.stringify(newValue),
            },
        });
    } else {
        model.value = await filterStore.minMaxPrices();
    }
});
</script>

<template>
    <div class="filter-container">
        <p class="filter-container__title">Стоимость квартиры, ₽</p>
        <AppSlider v-model="model" name="price" @set-state="setState" />
    </div>
</template>
