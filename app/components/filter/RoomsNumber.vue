<script setup lang="ts">

const route = useRoute();
const filterStore = useFilterStore();
const uniqueRooms = await filterStore.uniqueRooms();
const isValidRoomNumber = (room: number) => uniqueRooms.includes(room);

const checkHandler = useDebounceFn((room: number) => {
    filterStore.setRooms(room);
    navigateTo({
        query: {
            ...route.query,
            room: JSON.stringify(filterStore.rooms),
        },
    });
});

onMounted(() => {
    const roomQuery = route.query.room as string;
    if (roomQuery) {
        try {
            const roomArray = safeParseArray(roomQuery);
            if (Array.isArray(roomArray)) {
                roomArray.forEach((room) => {
                    if (uniqueRooms.includes(room)) {
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
            v-for="room in uniqueRooms"
            :key="room"
            type="button"
            class="circle-button"
            :class="{
                'circle-button-active': filterStore.rooms?.includes(room),
                'circle-button-disabled': !isValidRoomNumber(room),
            }"
            :disabled="!isValidRoomNumber(room)"
            @click="checkHandler(room)"
        >
            {{ room }}к
        </button>
    </div>
</template>
