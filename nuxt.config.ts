// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        "~/assets/scss/main.scss"
    ],
    modules: [
        '@pinia/nuxt',
    ],
    app: {
        baseURL: '/'
    },
    head: {
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' } ]
    },
})
