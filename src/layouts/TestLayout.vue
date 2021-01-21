<template>
    <v-app style="" >
        <div id="builder">




        <slot/>


        </div>
    </v-app>
</template>

<script>



    import {HTTP} from "../axios";
    import router from "../router";

    export default {
        name: "TestLayout",
        components:{

        },
        beforeMount: function () {

            HTTP.interceptors.response.use(res => res, error => {

                if (error.response.status === 401) {
                    delete HTTP.defaults.headers.common['Authorization']

                    this.$store.dispatch("logout").then(() => {

                            if (error.response.config.url !== '/check') {
                                router.push('/login')
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



<style  >
    @import url('https://fonts.googleapis.com/css?family=PT+Sans&display=swap');
    @import "../styles/feed.css";
    #builder {

        font-family: 'tfutura',Arial;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
    }




</style>