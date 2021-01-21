<template>

    <header>

        <v-toolbar dense elevation="2"   height="60px"  style="padding-right: 0px;">
            <v-avatar style="cursor: pointer" size="72px" @click="$router.push('/')"><v-img src="../../assets/logo_new_small_eng_100.png"></v-img></v-avatar>






            <v-bottom-navigation
                    height="56px"
                    style="justify-content:flex-end"



            >

                <v-btn v-if="isLoggedIn"  @click="$router.push('/projects')"   x-small >
                    <span class="navlink text-truncate"    >Мои сайты</span>
                    <v-icon    small>mdi-home</v-icon>
                </v-btn>
              <v-btn v-if="isLoggedIn && isSuperAdmin || isAdmin"  @click="$router.push('/allProjects')"   x-small >
                <span class="navlink text-truncate"    >Все сайты</span>
                <v-icon    small>mdi-home</v-icon>
              </v-btn>
                <v-spacer></v-spacer>


                <v-btn v-if="isLoggedIn"  @click="logout"  x-small >
                    <span class="navlink">Выйти</span>
                    <v-icon  small>mdi-login-variant</v-icon>
                </v-btn>
<!--                <v-btn   x-small value="nearby">-->
<!--                    <span class="navlink">Ещё</span>-->
<!--                    <v-icon small>mdi-dots-horizontal</v-icon>-->
<!--                </v-btn>-->
            </v-bottom-navigation>


            <!--            <v-btn small depressed color="white" @click="saveDialog = true">-->
            <!--                <v-icon>mdi-content-save</v-icon>Сохранить-->
            <!--            </v-btn>-->
            <!--            <v-btn small depressed color="white" @click="$router.push('/')">-->
            <!--                <v-icon>mdi-content-save</v-icon>Предпросмотр-->
            <!--            </v-btn>-->
            <!--            //<router-link class="home-link" :to="'/'">Предпросмотр</router-link>-->


        </v-toolbar>
        <v-progress-linear
                indeterminate
                id="authleaner"
                color="#fa876b"

                hidden
                style="margin-top: -4px;"
        ></v-progress-linear>
    </header>
</template>

<script>
    export default {
        name: "AuthHead",
        computed : {
            isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
          isSuperAdmin : function(){ return this.$store.getters.isSuperAdmin},
          isAdmin : function(){ return this.$store.getters.isAdmin},

        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        },
    }
</script>

<style scoped>
    header{
        min-height: 50px;

    }
    .navlink{
        color: black;
        font-size: 13px;
    }
    .v-bottom-navigation {
        box-shadow: none!important;
        background-color: inherit!important;
    }
</style>