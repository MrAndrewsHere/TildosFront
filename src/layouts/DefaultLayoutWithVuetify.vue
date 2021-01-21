<template>
    <v-app style="">


        <slot/>


    </v-app>
</template>

<script>



    import {HTTP} from "../axios";
    import router from "../router";

    export default {
        name: "DefaultLayoutWithVuetify",
        components:{

        },
        beforeMount: function () {

            // HTTP.interceptors.response.use(res => res, error => {
            //
            //     if (error.response.status === 401) {
            //         delete HTTP.defaults.headers.common['Authorization']
            //
            //         this.$store.dispatch("logout").then(() => {
            //
            //                 if (error.response.config.url !== '/check') {
            //                     router.push('/login')
            //                 }
            //             }
            //         ).catch(()=>{
            //
            //         })
            //
            //     }
            // });
            // HTTP.get('/check');
        },
        mounted(){
            // var mode = process.env.NODE_ENV;
            // запрос на получение домена


        }
    }
</script>



<style >

    @import "../styles/feed.css";

</style>