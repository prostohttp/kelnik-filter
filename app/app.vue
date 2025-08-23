<script setup lang="ts">
import { PiniaColadaDevtools } from "@pinia/colada-devtools";
</script>
<template>
    <div>
        <NuxtRouteAnnouncer />
        <PiniaColadaDevtools />
        <NuxtLayout>
            <ClientOnly>
                <NuxtPage />
                <template #fallback>
                    <AppPreloader />
                </template>
            </ClientOnly>
        </NuxtLayout>
    </div>
</template>
