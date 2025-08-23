// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "ООО Кельник Студиос - тестовое задание",
            htmlAttrs: {
                lang: "ru",
            },
            link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        },
    },
    css: ["~/assets/scss/main.scss"],
    dir: {
        public: "app/public",
    },
    nitro: {
        storage: {
            db: {
                driver: "fs",
                base: "./.data",
            },
        },
    },
    $production: {
        nitro: {
            storage: {
                data: { driver: "vercelKV" },
            },
        },
    },
    devtools: { enabled: true },
    modules: [
        "@nuxt/eslint",
        "@nuxt/image",
        "@nuxt/fonts",
        "@pinia/nuxt",
        "@pinia/colada-nuxt",
        "nuxt-typed-router",
        "@vueuse/nuxt",
    ],
    fonts: {
        families: [
            {
                name: "PT Root UI Regular",
                provider: "local",
                src: "/fonts/pt-root-ui_regular.woff2",
            },
            {
                name: "PT Root UI Medium",
                provider: "local",
                src: "/fonts/pt-root-ui_medium.woff2",
            },
            {
                name: "PT Root UI Bold",
                provider: "local",
                src: "/fonts/pt-root-ui_bold.woff2",
            },
        ],
    },
    compatibilityDate: "2025-07-15",
});
