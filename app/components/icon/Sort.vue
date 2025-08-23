<script setup lang="ts">
import { Order } from "~/types";

const { order = undefined } = defineProps<{
    order?: Order;
}>();
</script>

<template>
    <div class="sort-icon">
        <svg
            width="7"
            height="4"
            viewBox="0 0 7 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.0345 0.253496C3.87223 0.0898395 3.65798 2.7968e-07 3.42829 2.9976e-07C3.19918 3.1979e-07 2.98377 0.0898396 2.82265 0.253496L0.167554 3.01277C-0.0558463 3.2388 -0.0558462 3.60445 0.167554 3.83048C0.390384 4.05651 0.752053 4.05651 0.975454 3.83048L3.42829 1.27549L5.8817 3.83048C6.1051 4.05651 6.4662 4.05651 6.6896 3.83048C6.913 3.60445 6.913 3.2388 6.6896 3.01277L4.0345 0.253496Z"
                fill="#9ca2b1"
                :class="{ 'sort-icon-active': order === Order.ASC }"
            />
        </svg>

        <svg
            width="7"
            height="4"
            viewBox="0 0 7 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.82335 3.7465C2.98561 3.91016 3.19987 4 3.42956 4C3.65867 4 3.87408 3.91016 4.0352 3.7465L6.69029 0.987232C6.9137 0.761203 6.9137 0.395551 6.69029 0.169522C6.46747 -0.0565073 6.1058 -0.0565073 5.8824 0.169522L3.42956 2.72451L0.976151 0.169522C0.752751 -0.0565073 0.391653 -0.0565073 0.168252 0.169522C-0.0551483 0.395551 -0.0551483 0.761203 0.168252 0.987232L2.82335 3.7465Z"
                fill="#9ca2b1"
                :class="{ 'sort-icon-active': order === Order.DESC }"
            />
        </svg>
    </div>
</template>
