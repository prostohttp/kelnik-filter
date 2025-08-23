<script setup lang="ts">
import type { Apartment } from "~/types";

defineProps<{
    apartment: Apartment;
}>();
</script>

<template>
    <div class="list-item list-wrapper">
        <div class="list-item__image list-wrapper__image">
            <NuxtImg
                v-if="apartment.image"
                :src="apartment.image"
                :width="80"
                :placeholder="[80, 70, 50, 50]"
                :alt="apartment.title"
                placeholder-class="image-placeholder"
            />
            <NuxtImg
                v-else
                src="/img/placeholder.webp"
                class="rounded"
                :width="80"
                :placeholder="[80, 53, 50, 60]"
                :alt="apartment.title"
                placeholder-class="image-placeholder"
            />
        </div>
        <div class="list-wrapper__info">
            <div class="list-item-title list-wrapper__info-title">
                {{ apartment.title }}
            </div>
            <div class="list-wrapper__info-area">
                {{ apartment.area }}
                <span class="hidden-lg"> м²</span>
            </div>
            <div class="list-wrapper__info-floor">
                <span>{{ apartment.currentFloor }}</span>
                <span class="opacity">
                    из {{ apartment.totalFloors }} этаж</span
                >
            </div>
            <div class="list-wrapper__info-price">
                {{ currencyFrom(apartment.price, "ru-RU", "RUB") }}
            </div>
        </div>
    </div>
</template>
