<template>
    <v-app style="background-color: #e7e7e7">


    <AuthHead>

    </AuthHead>

    <slot/>
        <AuthFooter></AuthFooter>
    </v-app>
</template>

<script>
    import AuthHead from "../components/home/AuthHead";
    import AuthFooter from "../components/home/AuthFooter";

import {HTTP} from '../axios/index'
    import router from "../router";
    export default {
        name: "AuthLayout",
        components: {AuthFooter, AuthHead},


        beforeMount: function () {

            HTTP.interceptors.response.use(res => res, error => {

                if (error.response.status === 401) {
                    delete HTTP.defaults.headers.common['Authorization']

                    this.$store.dispatch("logout").then(() => {
                            console.log('dispatch');
                            if (error.response.config.url !== '/check') {
                                router.push('/')
                            }
                        }
                    ).catch(()=>{
                        console.log('from catch dispatch');
                    })

                }
            });
            HTTP.get('/check');
        }

    }
</script>

<style >
    @import url('https://fonts.googleapis.com/css?family=PT+Sans&display=swap');
    @import url('../styles/popup.css');
    #app {

        font-family: 'tfutura',Arial;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
    }
    .mainlink{
        color: #F87458!important;
        text-decoration: none!important;
    }
</style>