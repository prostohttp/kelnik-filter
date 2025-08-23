<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
    error: Object as () => NuxtError,
});
</script>

<template>
    <NuxtLayout name="default">
        <AppMessage>
            <div>{{ props.error?.message }}</div>
            <a href="/">Перезагрузить страницу</a>
        </AppMessage>
        <NuxtPage />
    </NuxtLayout>
</template>
