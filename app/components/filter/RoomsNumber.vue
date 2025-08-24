<script setup lang="ts">
const route = useRoute();
const filterStore = useFilterStore();
const rooms = await filterStore.uniqueRooms();

const { prices, areas, apartmentsWithActiveRooms } = storeToRefs(filterStore);
await useAsyncData(() =>
    filterStore.setApartmentsWithActiveRooms(prices.value!, areas.value!),
);

const checkHandler = useDebounceFn((room: number) => {
    filterStore.setRooms(room);
    navigateTo({
        query: {
            ...route.query,
            room: JSON.stringify(filterStore.rooms),
        },
        force: true,
    });
});

watch([prices, areas], ([newPrice, newArea]) => {
    filterStore.setApartmentsWithActiveRooms(newPrice!, newArea!);
});

const disabledRoom = (room: number) => {
    return !uniqueRooms(apartmentsWithActiveRooms.value!).includes(room);
};

onMounted(() => {
    const roomQuery = route.query.room as string;
    if (roomQuery) {
        try {
            const roomArray = safeParseArray(roomQuery);
            if (Array.isArray(roomArray)) {
                roomArray.forEach((room) => {
                    if (rooms.includes(room)) {
                        filterStore.setRooms(room);
                    }
                });
            }
        } catch {
            throw createError({
                statusCode: 400,
                fatal: true,
                message: "Проверьте фильтр - Количества комнат",
            });
        }
    }
});
</script>

<template>
    <div class="rooms">
        <button
            v-for="room in rooms"
            :key="room"
            type="button"
            class="circle-button"
            :class="{
                'circle-button-active':
                    filterStore.rooms?.includes(room),
                'circle-button-disabled': disabledRoom(room),
            }"
            :disabled="disabledRoom(room)"
            @click="checkHandler(room)"
        >
            {{ room }}к
        </button>
    </div>
</template>
