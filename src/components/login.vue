<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-5">
                    <v-toolbar
                            color="#fa886e"
                            dark
                            flat
                    >
                        <v-toolbar-title>Login form</v-toolbar-title>


                    </v-toolbar>
                    <v-form class="pa-3">
                        <v-text-field

                                required
                                label="Login"
                                name="login"
                                prepend-icon="mdi-account"
                                type="text"
                                v-model="login"
                                color="#FFAB91"
                                :messages="error.login"
                                :rules="[v => !!v || 'Login is required']"
                        ></v-text-field>

                        <v-text-field
                                required
                                id="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="password"
                                color="#FFAB91"
                                :rules="[v => !!v || 'Password is required']"
                                :messages="error.password"
                        ></v-text-field>
                    </v-form>
                    <div class="pa-3" v-if="error.message ">
                        <v-alert type="error"  dense
                                 outlined>

                            <span >eewe{{error.message}}</span>
                        </v-alert>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#fa886e" @click="auth">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                login : "",
                password : "",
                error:"",
                loading:false,

            }
        },
        methods: {
            auth: function () {
                let login = this.login
                let password = this.password
                this.$store.dispatch('login', { login, password })
                    .then(() => this.$router.push('/projects'))
                    .catch(err =>
                    {
                        if(!err.response.status)
                        {
                            this.error.message = 'Не удалось выполнить авторизацию. Попобуйте позже'
                        }
                        this.error = err.response.data
                    })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>