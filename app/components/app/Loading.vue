<script setup lang="ts"></script>

<template>
    <div class="not-found">
        <div class="loading__indicator">
            <svg class="loader" viewBox="204 184 264 32">
                <defs>
                    <filter id="gooey" color-interpolation-filters="sRGB">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="7"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="gooey"
                        />
                        <feBlend in="SourceGraphic" in2="gooey" />
                    </filter>
                </defs>
                <g class="ellipses" fill="#3EB57C" filter="url(#gooey)">
                    <ellipse class="ellipse" cx="220" cy="200" rx="16" ry="16" />
                    <ellipse class="ellipse" cx="280" cy="200" rx="16" ry="16" />
                    <ellipse class="ellipse" cx="340" cy="200" rx="16" ry="16" />
                    <ellipse class="ellipse" cx="400" cy="200" rx="16" ry="16" />
                </g>
            </svg>
        </div>
    </div>
</template>
