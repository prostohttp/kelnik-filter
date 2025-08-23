<script setup lang="ts">
const isHidden = ref(true);
const scrollHandler = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

const scrollListener = () => (isHidden.value = window.scrollY < 100);

onMounted(() => {
    window.addEventListener("scroll", scrollListener);
    scrollListener();
});

onUnmounted(() => {
    window.removeEventListener("scroll", scrollListener);
});
</script>

<template>
    <button
        class="scroll-button"
        title="Scroll top button"
        :class="{ 'scroll-button-hidden': isHidden }"
        @click="scrollHandler"
    >
        <svg
            width="10"
            height="15"
            viewBox="0 0 10 15"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 14.0032L5 2.00317M5 2.00317L9.00063 6.00317M5 2.00317L0.999365 6.00317"
                stroke="white"
                style="stroke: white; stroke-opacity: 1"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
    </button>
</template>
