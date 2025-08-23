<script setup lang="ts">

const route = useRoute();
const filterStore = useFilterStore();
const { areas } = storeToRefs(filterStore);

const model = ref(await filterStore.minMaxAreas());

const setState = () => {
    filterStore.setAreas(model.value);
};

onMounted(() => {
    const areaQuery = route.query.area as string;
    if (areaQuery) {
        try {
            const areaArray = safeParseArray(areaQuery);
            if (areaArray) {
                areaArray.length = 2;
                const min = model.value[0];
                const max = model.value[1];

                if (
                    areaArray[0] &&
                    (numberFrom(areaArray[0]) < min ||
                        numberFrom(areaArray[0]) > max)
                ) {
                    model.value[0] = min;
                } else {
                    model.value[0] = areaArray[0]!;
                }
                if (
                    areaArray[1] &&
                    (numberFrom(areaArray[1]) > max ||
                        numberFrom(areaArray[1]) < min)
                ) {
                    model.value[1] = max;
                } else {
                    model.value[1] = areaArray[1]!;
                }
                filterStore.setAreas(model.value);
            }
        } catch {
            throw createError({
                statusCode: 400,
                fatal: true,
                message: "Проверьте фильтр - Площадь",
            });
        }
    }
});

watch(areas, async (newValue) => {
    if (newValue) {
        navigateTo({
            query: {
                ...route.query,
                area: JSON.stringify(newValue),
            },
        });
    } else {
        model.value = await filterStore.minMaxAreas()
    }
});
</script>

<template>
    <div class="filter-container">
        <p class="filter-container__title">Площадь, м²</p>
        <AppSlider v-model="model" name="area" @set-state="setState" />
    </div>
</template>
