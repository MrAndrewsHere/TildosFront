<template>
    <div id="app">
        <component :is="layout"  >
            <router-view :key="$route.fullPath"/>
        </component>
    </div>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            layout() {
                return this.$route.meta.layout || "default-layout"
            },

        },
    }
</script>

<style>
    @font-face {
        font-family: 'tfutura';
        src: url('assets/fonts/f300.woff') format('woff');
        font-weight: 300;
        font-face-name: tfutura;
        font-style: light;
    }
    @font-face {
        font-family: 'tfutura';
        src: url('assets/fonts/f400.woff') format('woff');
        font-weight: 400;
        font-face-name: tfutura;
        font-style: normal;
    }
    @font-face {
        font-family: 'tfutura';
        src: url('assets/fonts/f500.woff') format('woff');
        font-weight: 500;
        font-face-name: tfutura;
        font-style: medium;
    }
    @font-face {
        font-family: 'tfutura';
        src: url('assets/fonts/f600.woff') format('woff');
        font-weight: 600;
        font-face-name: tfutura;
        font-stretch: extra-condensed;
        font-style: semibold;
    }
    @font-face {
        font-family: 'tfutura';
        src: url('assets/fonts/f600.woff') format('woff');
        font-weight: 700;
        font-style: bold;
    }


    /*@import url('https://fonts.googleapis.com/css?family=PT+Sans&display=swap');*/

    #app {
        font-family: "tfutura",Arial;
    }


    html, body {
        margin: 0;
        padding: 0;


    }




</style>
