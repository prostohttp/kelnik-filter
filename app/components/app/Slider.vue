<script setup lang="ts">
import type { ShallowRef } from "vue";
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import type { SliderData } from "~/types";
import type { MaskaDetail } from "maska";

interface IVueSlider {
    setValue: (a: [number, number]) => void;
}

const model = defineModel<SliderData>();
const props = defineProps<{
    name: string;
}>();

const emit = defineEmits<{
    setState: [];
}>();

const min = model.value![0];
const max = model.value![1];

const dataFrom = ref(model.value![0]);
const dataTo = ref(model.value![1]);

const sliderRef = useTemplateRef("slider") as Readonly<ShallowRef<IVueSlider>>;

watch(
    () => [model.value![0], model.value![1]],
    ([dataFromNew, dataToNew]) => {
        dataFrom.value = dataFromNew!;
        dataTo.value = dataToNew!;
    },
);

watch(dataFrom, (dataFromNew) => {
    if (
        numberFrom(dataFromNew) < min ||
        numberFrom(dataFromNew) > max ||
        numberFrom(dataFromNew) > numberFrom(dataTo.value)
    ) {
        dataFrom.value = min;
        sliderRef.value.setValue([min, numberFrom(dataTo.value)]);
    } else {
        sliderRef.value.setValue([
            numberFrom(dataFromNew),
            numberFrom(dataTo.value),
        ]);
    }
});

watch(dataTo, (dataToNew) => {
    if (
        numberFrom(dataToNew) > max ||
        numberFrom(dataToNew) < min ||
        numberFrom(dataToNew) < numberFrom(dataFrom.value)
    ) {
        dataTo.value = max;
        sliderRef.value.setValue([numberFrom(dataFrom.value), max]);
    } else {
        sliderRef.value.setValue([
            numberFrom(dataFrom.value),
            numberFrom(dataToNew),
        ]);
    }
});

const maskaFromHandler = (event: CustomEvent<MaskaDetail>) => {
    const unmasked = event.detail.unmasked;
    dataFrom.value = Number(unmasked);
};

const maskaToHandler = (event: CustomEvent<MaskaDetail>) => {
    const unmasked = event.detail.unmasked;
    dataTo.value = Number(unmasked);
};

const setState = () => {
    emit("setState");
};
</script>

<template>
    <div class="slider-wrapper">
        <div class="slider-wrapper__inputs">
            <div
                class="slider-wrapper__inputs-container-left slider-wrapper__inputs-container"
            >
                <input
                    v-model.lazy="dataFrom"
                    v-maska="''"
                    :aria-label="`${props.name}-from`"
                    data-maska-number-locale="ru"
                    class="slider-wrapper__inputs-container__field"
                    @maska="maskaFromHandler"
                    @blur="setState"
                    @keyup.enter="setState"
                >
            </div>
            <div
                class="slider-wrapper__inputs-container-right slider-wrapper__inputs-container"
            >
                <input
                    v-model.lazy="dataTo"
                    v-maska="''"
                    :aria-label="`${props.name}-to`"
                    data-maska-number-locale="ru"
                    class="slider-wrapper__inputs-container__field"
                    @maska="maskaToHandler"
                    @blur="setState"
                    @keyup.enter="setState"
                >
            </div>
        </div>
        <vue-slider
            ref="slider"
            v-model="model!"
            :min="min"
            :max="max"
            :enable-cross="false"
            :clickable="false"
            tooltip="none"
            @drag-end="$emit('setState')"
        />
    </div>
</template>
