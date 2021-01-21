<template>
    <div style="">
        <div class="td-maincontainer">

            <div class="td-sites-maincontainer">

                <div class="td-sites-uppanel">
                    <div class="td-sites-uppanel__wrapper">
                        <div class="td-sites-uppanel__title">Мои сайты:</div>
                        <div class="td-sites-uppanel__rightside">

                            <div class="td-sites-uppanel__righttable">


                                <div class="td-sites-uppanel__righttabletd">
                                    <table class="td-sites-uppanel__rightbtn-table"
                                       >
                                        <tbody>
                                        <tr>

                                            <td><img src="../assets/icons/td-uppanel__startnew-plus.png" class="td-sites-uppanel__rightbtn-plus"></td>
                                            <td>
                                                <div @click="overlay = !overlay" class="td-sites-uppanel__rightbtn-title">Создать новый сайт</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                        </div>
                    </div>
                </div>

                <div class="td-sites-grid">


                    <div class="td-sites-grid__cell" v-for="(project,index) in projects" :key="index" :id="'project'+project.id">

                        <div class="td-sites-grid__item" style="cursor: pointer">

                            <div class="td-site__section-one" @click="$router.push('/project/'+project.id)"
                               alt="Перейти к редактированию">
                                <div class="td-site__title ">{{project.name}}</div>
                                <div class="td-site__descr"></div>
                            </div>

                            <div class="td-site__hr"></div>

                            <div class="td-site__section-two">
                                <div class="td-site__section-two-wrapper">
                                    <table class="td-site__settings">
                                        <tbody>
                                        <tr>
                                            <td><img src="../assets/icons/td-icon-edit.png" width="14px" height="14px"
                                                     style="padding:5px;"></td>
                                            <td class="td-site__settings-title">
                                                <div style="cursor: pointer" @click="$router.push('/project/'+project.id)">Редактировать
                                                сайт</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <table class="td-site__url">
                                        <tbody>
                                        <tr>
                                            <td><img src="../assets/icons/td-site__link.png" width="14px" height="14px"
                                                     style="margin-top:6px;"></td>
                                            <td class="td-site__url-link"><a style="color: black;text-decoration: none" :href="project.domain?'http://'+project.domain:'#'" :target="project.domain?'_blank':''"
                                                                             rel="noopener noreferrer">{{project.domain || project.techdomain+'.uni-dubna.ru'}}</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>




                </div>

            </div>


            <br><br><br><br>


        </div>


        <v-dialog

                :value="overlay"
                style="background-color: transparent;box-shadow: none"
                width="500px"
        >
            <v-card class="elevation-5">
                <v-toolbar
                        color="#fa886e"

                        flat
                >
                    <v-toolbar-title>Новый сайт</v-toolbar-title>


                </v-toolbar>
                <v-form class="pa-3" @submit.prevent="createproject()">
                    <v-text-field

                            required
                            label="Название"
                            name="Название"
                            prepend-icon="mdi-label-outline"
                            type="text"
                            v-model="name"
                            color="#FFAB91"
                            :messages="error.name"
                            maxlength="30" minlength="5"

                            :rules="[v => !!v || '*' || v<5]"
                    ></v-text-field>


                </v-form>
                <div class="pa-3" v-if="error.error ">
                    <v-alert type="error" dense
                             outlined>

                        <span>{{error.error}}</span>
                    </v-alert>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark @click="overlay = false"><span class="btnelement">Отмена</span></v-btn>
                    <v-btn color="#fa886e" @click="createproject"><span class="btnelement">Создать</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {HTTP} from "../axios/index";

    export default {
        name: "projects",
        data: () => {
            return {
                projects: [],
                overlay: false,
                name: '',
                error: '',
            }
        },
        methods: {


            createproject() {
                let data = {
                    name: this.name
                }
                HTTP.post('/projects', JSON.stringify(data), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(
                    res => {
                        this.$router.push('/project/' + res.data.project_id)

                    }
                ).catch(e => {
                    this.error = e.response.data
                })
            }
        },
        mounted() {
            document.getElementById('authleaner').hidden = false;
            HTTP.get('/projects').then(res => {
                this.projects = res.data.projects
            }).finally(()=>{ document.getElementById('authleaner').hidden = true;})
        }
    }
</script>

<style scoped>

</style>