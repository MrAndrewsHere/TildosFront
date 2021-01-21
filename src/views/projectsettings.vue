<template>
    <div>
        <div class="ss-container">
            <div class="ss-container__wrapper">

                <div class="ss-header">
                    <div class="ss-header-buttons">
                        <input type="button" style="margin:0px 10px;" @click="$router.push('/project/'+projectid)"
                               value="Закрыть"
                               class="ss-header-buttons__item ss-btn-white">
                        <input type="submit" value="Сохранить изменения" @click="save()"
                               class="ss-header-buttons__item ss-btn js-ss-submit"
                               id="ss-btn-save">
                    </div>
                    <div class="ss-header-nav ss-hidden-xs">
                        <div class="ss-header-nav__item"><a @click="$router.push('/projects')">Мои сайты</a></div>
                        <img src="../assets/icons/arrow.svg" class="ss-header-nav__item ss-header-nav__img">
                        <div class="ss-header-nav__item"><a @click="$router.push('/project/'+projectid)">{{subPN}}</a>
                        </div>
                        <img src="../assets/icons/arrow.svg" class="ss-header-nav__item ss-header-nav__img">
                        <div class="ss-header-nav__item" style="opacity:0.5;">Настройки сайта</div>
                    </div>
                    <h1 class="ss-menu-pane__title ss-hidden-m">Site settings</h1>
                </div>

                <div class="ss-wrapper">
                    <div class="ss-menu">
                        <ul class="ss-menu__wrapper">
                            <li class="ss-menu__item ss-menu__item_active" data-menu-item="ss_menu_main">

                                <a @click="ss_menu('ss_menu_main');">Главное</a>
                            </li>
                            <li class="ss-menu__item" data-menu-item="ss_menu_collaborators"><a
                                    @click="ss_menu('ss_menu_collaborators');">Сотрудники</a></li>
                            <li class="ss-menu__item " data-menu-item="ss_menu_index"><a
                                    @click="ss_menu('ss_menu_index');">Главная страница</a></li>
                            <li class="ss-menu__item " data-menu-item="ss_menu_actions"><a
                                    @click="ss_menu('ss_menu_actions');">Действия</a></li>
                            <li class="ss-menu__item " data-menu-item="ss_menu_header"><a
                                    @click="ss_menu('ss_menu_header');">Шапка и подвал</a></li>

                        </ul>
                    </div>
                    <div class="ss-content">

                        <div class="ss-content__form">

                            <div id="ss_menu_main" class="ss-menu-pane ss-menu-pane_active">
                                <h2 class="ss-menu-pane__title ss-hidden-m">Основные настройки</h2>
                                <div class="ss-form-group">
                                    <label class="ss-label">Название сайта</label>
                                    <input maxlength="30" minlength="5" type="text" placeholder="example: My Company"
                                           name="title" class="ss-input"
                                           v-model="project.name">
                                </div>
                                <div class="ss-form-group">
                                    <label class="ss-label">Описание сайта</label>
                                    <input type="text" name="descr" placeholder="example: Best ever company"
                                           class="ss-input" v-model="project.description">
                                </div>
                                <div class="ss-form-group" data-ss-field="alias">
                                    <label class="ss-label">Домен</label>
                                    <table width="100%">
                                        <tbody>
                                        <tr>
                                            <td>
                                                <div class="td-item-group__project-url"
                                                     onclick="$('#ss-input-alias').focus();">https://
                                                </div>
                                            </td>
                                            <td style="width:100%;"><input disabled type="text" name="alias"
                                                                           class="ss-input"
                                                                           v-model="project.domain"
                                                                           :placeholder="project.techdomain"
                                                                           id="ss-input-alias"></td>
                                            <td>
                                                <div class="td-item-group__project-url"
                                                     onclick="$('#ss-input-alias').focus();">.uni-dubna.ru
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div class="ss-form-group">
                                    <label class="ss-label">Favicon </label>
                                    <div class="ss-form-group__upl-button ss-upload-button" style="display:block">


                                        <label class="v-btn v-btn--depressed v-btn--flat v-btn--outlined theme--light v-size--small "
                                               style="color: black; cursor: pointer ">
                                            <v-icon color="black">mdi-upload</v-icon>
                                            <span class="v-btn__content">Загрузить</span>
                                            <input type="file" style="display: none" accept="image/vnd.microsoft.icon"
                                                   @change="uploadFile($event)">
                                        </label>




                                        <a href="https://land.uni-dubna.ru/api/favicon/dd" style="color: transparent!important;">


                                        <label v-if="project.favicon"   class="v-btn v-btn--depressed v-btn--flat  theme--light v-size--small "
                                               style="color: black; height: 32px;width: 32px ;cursor: pointer">
                                            <span class="v-btn__content"><img  id="projectFavicon" src="'example'" width="32px" height="32px" style=""></span>
                                        </label>
                                        </a>
<!--                                        <a v-if="project.favicon"-->
<!--                                           style="color:black;margin-left: 5px; text-decoration: none" target="_blank"-->
<!--                                           :href="project.favicon">{{}}</a>-->

                                    </div>
                                    <div class="ss-form-group__hint">
                                        Favicon — значок веб-сайта или страницы. Отображается в браузере перед названием
                                        страницы, а также в качестве картинки рядом с закладкой, во вкладках и в других
                                        элементах интерфейса. Фавикон можно загрузить только в формате .ico, минимальный
                                        рекомендованный размер — 32x32px.
                                        Конвертируйте ваше изображение в .ico <a href="http://www.xiconeditor.com/"
                                                                                 target="_blank">здесь</a>.


                                    </div>
                                </div>
                            </div>
                            <div id="ss_menu_collaborators" class="ss-menu-pane">

                                <div class="ss-menu-pane__title">Сотрудники</div>
                                <div class="ss-form-group" style="margin-bottom:30px;">

                                    Совместное редактирование сайта. Вы можете дать сотрудникам полный или ограниченный
                                    доступ. Сотруднику не нужно предварительно регистрироваться. Для редактирования
                                    вашего сайта ему будет достаточно выполнить вход с учётными данными от uni-domain.

                                    <br>

                                </div>
                                <div class="ss-form-group">
                                    <label class="ss-label">Добавить</label>
                                    <div style="padding-top:10px;">


                                    </div>
                                    <v-autocomplete
                                            v-model="getcollaborators"
                                            :disabled="isUpdating"
                                            :items="searched"
                                            filled
                                            :search-input.sync="search"
                                            v-on:keydown.enter="fetchsearch(search)"

                                            small-chips

                                            return-object
                                            hide-selected
                                            no-data-text="Введите логин или часть логина и нажмите Enter"


                                            label="Логин"
                                            item-text="login"
                                            item-value="login"
                                            multiple
                                            style="width: 100%"
                                    >
                                        <template v-slot:selection="data">
                                            <v-chip
                                                    v-bind="data.attrs"
                                                    :input-value="data.selected"
                                                    close
                                                    @click="data.select"
                                                    @click:close="remove(data.item)"
                                            >
                                                <v-avatar left>
                                                    <v-icon>mdi-account</v-icon>
                                                </v-avatar>
                                                {{ data.item.user_name }}
                                            </v-chip>

                                        </template>
                                        <template v-slot:item="data">
                                            <template v-if="typeof data.item !== 'object'">
                                                <v-list-item-content v-text="data.item"></v-list-item-content>
                                            </template>
                                            <template v-else>
                                                <v-list-item-avatar>
                                                    <v-icon>mdi-account</v-icon>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.user_name"></v-list-item-title>
                                                    <v-list-item-subtitle
                                                            v-html="data.item.login"></v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                    <table style="width:100% ">
                                        <tbody>
                                        <tr>
                                            <td style="width:25%;">
                                                <div class="ss-select">
                                                    <select class="ss-input ss-select" v-model="roleaddindex">

                                                        <option v-for="(role,indexrole) in roles" :key="indexrole"
                                                                :value="role.id">{{role.name}}
                                                        </option>

                                                    </select>
                                                </div>
                                                <div style="padding-top:10px; opacity:0.7;">Роль</div>
                                            </td>
                                            <td style="width:49%;">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                            <td style="width:25%;">


                                                <a data-v-45c2e1c2="" class="ss-btn-white" @click="addcolls()"
                                                   style="border: 1px solid rgb(204, 204, 204); cursor: pointer">Добавить</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <v-divider class="mb-5 mx-10"></v-divider>
                                <div class="ss-form-group mt-10">
                                    <label class="ss-label">Список сотрудников</label>
                                    <div style="padding-top:10px;">

                                        <input type="hidden" name="currency_code" class="js-currency-code-input"
                                               value="RUB">


                                    </div>
                                    <div v-if="collaborators.length === 0">
                                        <span>Нет ни одного сотрудника</span>
                                    </div>

                                    <table v-else class="mb-2" v-for="(user, ind) in collaborators" :key="ind"
                                           width="100%">
                                        <tbody>
                                        <tr>
                                            <td style="width:50%;">
                                                <input disabled type="text" name="user_name" class="ss-input"
                                                       :value="user.user_name" placeholder="">
                                                <div style="padding-top:10px; opacity:0.7;">Имя</div>
                                            </td>
                                            <td style="width:25%;padding-left: 5px">
                                                <input disabled type="text" name="login" class="ss-input"
                                                       :value="user.login" placeholder="">
                                                <div style="padding-top:10px; opacity:0.7;">Логин</div>
                                            </td>

                                            <td style="width:19%;padding-left: 5px">
                                                <div class="ss-select">
                                                    <select class="ss-input ss-select" name="role_id"
                                                            v-model="user.role_id">
                                                        <option v-for="(role,index) in roles" :key="index"
                                                                :value="role.id"
                                                                :selected="user.role_id === role.id">{{role.name}}
                                                        </option>

                                                    </select>
                                                </div>
                                                <div style="padding-top:10px; opacity:0.7;">Роль</div>
                                            </td>
                                            <td style="width:5%;">
                                                <v-btn @click="collaborators.splice(ind,1)" small icon>
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                            </td>

                                        </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <br>
                                <div class="ss-form-group">
                                    <table style="width:100%; font-size:18px;">
                                    </table>
                                </div>


                            </div>
                            <div id="ss_menu_index" class="ss-menu-pane ">
                                <h2 class="ss-menu-pane__title ss-hidden-m">Главная страница</h2>
                                <div class="ss-form-group">
                                    <label class="ss-label">Главная страница</label>
                                    <div class="ss-select">
                                        <select class="ss-input ss-select" name="indexpageid"
                                                v-model="project.mainpage">
                                            <option value="-1" selected>Не выбрано</option>
                                            <option v-for="(page,index) in pages" :key="index" :value="page.id"
                                                    :selected="project.mainpage === page.id">{{page.title}}
                                            </option>

                                        </select>
                                    </div>
                                    <div style="font-size:20px;"><br><br>Выберите, какая страница будет главной для
                                        этого
                                        сайта (открывается первой при заходе на сайт). <br></div>


                                </div>
                            </div>
                            <div id="ss_menu_actions" class="ss-menu-pane ">
                                <h2 class="ss-menu-pane__title ss-hidden-m">Действия</h2>
                                <div class="ss-menu-pane__description">Действия с сайтом:</div>
                                <!--                                <ul class="ss-list-link ss-list-link-actions">-->
                                <!--                                    <li><a><span>Передать сайт <b>на другой аккаунт</b></span></a>-->
                                <!--                                    </li>-->
                                <!--                                    <li><a-->
                                <!--                                    ><span>Удалить сайт <b>без возможности отмены</b></span></a>-->
                                <!--                                    </li>-->
                                <!--                                </ul>-->
                                <div class="ss-form-group__hint">Внимание: эти действия не могут быть отменены</div>
                            </div>
                            <div id="ss_menu_header" class="ss-menu-pane">
                                <h2 class="ss-menu-pane__title ss-hidden-m">Шапка и подвал</h2>

                                <div class="ss-form-group__hint" style="padding-top:0px;">Eсли у вас есть блоки,
                                    повторяющиеся на каждой странице, например меню или логотип, создайте <span
                                            style="font-weight:500;">отдельную новую страницу</span> и перенесите
                                    повторяющиеся блоки в нее. Назначьте эту страницу шапкой. Содержание страницы,
                                    которая
                                    назначена как шапка или подвал, будет добавляться ко всем страницам сайта
                                    автоматически
                                    при публикации.
                                </div>
                                <br>

                                <div class="ss-form-group">
                                    <label class="ss-label">Назначить шапку (Header)</label>
                                    <div class="ss-select">
                                        <select class="ss-input ss-select" name="headerpageid" v-model="project.header">
                                            <option selected value="-1">Не выбрано</option>
                                            <option v-for="(page,index2) in pages" :key="index2" :value="page.id"
                                                    :selected="project.header === page.id">{{page.title}}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="ss-form-group">
                                    <label class="ss-label">Назначить подвал (Footer)</label>
                                    <div class="ss-select">
                                        <select class="ss-input ss-select" name="footerpageid" v-model="project.footer">
                                            <option selected value="-1">Не выбрано</option>
                                            <option v-for="(page,index3) in pages" :key="index3" :value="page.id"
                                                    :selected="project.footer === page.id">{{page.title}}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div style="clear: both"></div>
                    </div>
                </div>
            </div>
            <v-snackbar
                    v-model="snackbar"
                    color="white"
                    top right
                    class="mt-10"
            >
                <span style="color: black"> {{ messagesnackbar }}</span>


                <v-btn
                        color="#fa876b"
                        small

                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </div>

    </div>

</template>

<script>
    import {HTTP} from "../axios";

    export default {
        name: "projectsettings",
        props: ['projectid'],
        data: () => {
            return {
                project: [],
                projname: '',
                pages: [],
                snackbar: false,
                messagesnackbar: '',
                collaborators: [],
                roles: [],
                roleaddindex: null,
                search: null,
                getcollaborators: [],
                searched: [],
                isUpdating: false,
            }
        },
        computed: {
            subPN() {
                if(this.projname)
                {
                    if (this.projname.length > 14) {
                        return this.projname.substring(0, 14) + '...';
                    }
                    return this.projname;
                }
                else {
                    return 'Undefined'
                }
            },
        },
        watch: {},
        methods: {
            callaba(myBase64){
                document.getElementById('projectFavicon').src = myBase64;

            },
            toDataUrl(callback) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', this.project.favicon);
                xhr.responseType = 'blob';
                xhr.send();
            },

            addcolls() {
                if (!this.roleaddindex || this.getcollaborators.length === 0) {
                    return
                }
                const role = JSON.parse(JSON.stringify(this.roleaddindex));
                var newarra = this.getcollaborators.map(function (element) {

                    return Object.assign(element, {role_id: role})

                })
                this.collaborators = JSON.parse(JSON.stringify(this.collaborators.concat(newarra)));
                this.getcollaborators = [];

                this.searched = [];
            },
            fetchsearch: function (val) {
                // Items have already been loaded
                if (!val) return;
                if (val.length < 3) return;

                // Items have already been requested
                if (this.isUpdating) return

                this.isUpdating = true

                // Lazily load input items
                HTTP.post('/searchcollaborators', JSON.stringify({query: val}))
                    .then(res => {


                        this.searched = this.searched.concat(this.filter_dubplicate(res.data.result, this.collaborators))

                    })
                    .catch(err => {

                    })
                    .finally(() => (this.isUpdating = false))
            },
            save() {
                HTTP
                    .put("project/" + this.project.id, JSON.stringify({
                        main: this.project,
                        collaborators: this.collaborators
                    }), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(() => {
                        this.projname = this.project.name;
                        this.messagesnackbar = 'Сохранено';
                    })
                    .catch(err => {
                        this.messagesnackbar = err.data;
                    })
                    .finally(() => {
                        this.snackbar = true;
                    })
            },
            printurl(url) {
                return url.split('/').pop().slice(-20);
            },
            uploadFile(event) {
                this.loading = true;
                var postData = new FormData()
                postData.append('file', event.target.files[0])
                HTTP
                    .post('/files', postData)
                    .then(r => {
                        this.project.favicon = r.data.file.url
                        this.toDataUrl((base) => {
                            this.callaba(base)})
                        this.loading = false
                    })
            },
            // get_project_name(name) {
            //     if (name.length > 10) {
            //         return name.slice(0, 10) + '...';
            //     }
            //     return name;
            // },
            filter_dubplicate(array, array2) {

                var A = JSON.parse(JSON.stringify(array));
                var B = JSON.parse(JSON.stringify(array2));
                return A.filter(element => !B.find(item => {
                    return item.login === element.login
                }))
            },
            ss_menu(menu) {

                document.getElementsByClassName('ss-menu__item_active')[0].classList.toggle('ss-menu__item_active');
                document.querySelectorAll('[data-menu-item="' + menu + '"]')[0].classList.add('ss-menu__item_active');
                document.getElementsByClassName('ss-menu-pane_active')[0].classList.toggle('ss-menu-pane_active');
                document.getElementById(menu).classList.toggle('ss-menu-pane_active');


            },
            remove(item) {
                const index1 = this.getcollaborators.findIndex(function (element) {
                    return element.login === item.login
                })

                if (index1 >= 0) this.getcollaborators.splice(index1, 1)
            },
        },
        mounted() {
            document.getElementById('authleaner').hidden = false;
            HTTP
                .get('/projectsettings/' + this.projectid)
                .then(res => {
                    this.project = res.data.project
                    this.projname = this.project.name;
                    this.pages = res.data.pages
                    this.roles = res.data.roles
                    this.roleaddindex = this.roles.slice(0, 1)[0].id
                    this.collaborators = res.data.collaborators

                    if( this.project.favicon)
                    {
                        this.toDataUrl((base) => {
                            this.callaba(base) })
                    }

                })
                .catch(err => {

                }).finally(() => {
                document.getElementById('authleaner').hidden = true;
            })
        }
    }

</script>


<style scoped>
    .ss-container {
        width: 100%;
        font-family: "tfutura";
        background-color: #ededed;
        padding: 15px 0px;
        -webkit-font-smoothing: antialiased;
    }

    .ss-container__wrapper {
        max-width: 1160px;
        margin: 0 auto;
    }

    .ss-header {
        padding: 35px 0 40px;
        position: relative;
    }

    .ss-header-nav {
        margin-top: 6px;
    }

    .ss-header-nav__item {
        display: inline-block;
        vertical-align: middle;
        font-size: 32px;
        line-height: 32px;
        color: rgba(0, 0, 0, .5);
        font-family: "tfutura";
        font-weight: normal;
    }

    .ss-header-nav__item:last-child {
        font-weight: 300;
    }

    .ss-header-nav__item a {
        font-weight: normal;
        color: rgba(0, 0, 0, .5);
        text-decoration: none;
    }

    .ss-header-nav__img {
        width: 25px;
        margin: 0 16px;
    }


    .ss-button {
        display: inline-block;
        padding: 13px 30px 12px;
        background-color: #fa876b;
        border-radius: 55px;
        color: #fff;
        display: inline-block;
        text-align: center;
        font-size: 18px;
        font-weight: 300;
        cursor: pointer;
        -webkit-transition: all ease-in-out 0.1s;
        -moz-transition: all ease-in-out 0.1s;
        -o-transition: all ease-in-out 0.1s;
        transition: all ease-in-out 0.1s;
        -webkit-font-smoothing: antialiased;
        opacity: 1;
        font-weight: normal;
    }

    .ss-button:hover {
        background: #F87458;
        color: #fff;
    }

    .ss-header-buttons {
        float: right;
    }

    .ss-header-buttons__item {
        margin-right: 10px;
    }

    .ss-header-buttons__item:last-child {
        margin-right: 0;
    }

    .ss-wrapper {
        background: #fff;
        min-height: 900px;
        position: relative;
        border: 1px solid #e7e7e7;
        margin-bottom: 100px;
    }

    .ss-menu {
        width: 220px;
        border-right: 1px solid #dddddd;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }


    .ss-menu__wrapper {
        list-style: none;
        -webkit-padding-start: 0px;
        padding-left: 0px;
    }

    .ss-errorbox {
        padding: 20px 30px;
        font-size: 18px;
        margin-bottom: 20px;
        background: #FFEC51;
        display: none;
    }

    .ss-menu__item a {
        padding: 18px 30px 17px;
        display: block;
        cursor: pointer;
        color: #222;
        -webkit-transition: all ease-in-out 0.1s;
        -moz-transition: all ease-in-out 0.1s;
        -o-transition: all ease-in-out 0.1s;
        transition: all ease-in-out 0.1s;
        font-weight: normal;
        font-size: 18px;
    }

    .ss-menu__item a:hover {
        background: rgba(0, 0, 0, .03);
        color: #fa876b;
    }

    .ss-menu__item_active a, .ss-menu__item_active a:hover {
        background: #fa876b;
        color: #fff;
    }

    .ss-content {
        margin-left: 220px;
    }


    .ss-content__form {
        max-width: 600px;
        padding: 0 15px;
        margin: 61px auto;
    }


    .ss-menu-pane {
        display: none;
    }


    .ss-menu-pane.ss-menu-pane_active {
        display: block;
    }

    .ss-menu-pane__title {
        font-size: 32px;
        font-weight: 300;
        color: #000;
        text-align: center;
        margin-bottom: 28px;
    }

    .ss-tab-pane {
        display: none;
    }

    .ss-tab-pane.ss-tab-pane_active {
        display: block;
    }

    .ss-form-group {
        margin-bottom: 46px;
        position: relative;
    }

    .ss-label, .ss-input, .ss-select {
        display: block;
    }

    .ss-form-group_2col {
        padding-left: 148px;
        margin-bottom: 26px;
    }

    .ss-form-group_2col .ss-label {
        position: absolute;
        width: 130px;
        top: 24px;
        left: 0;
    }

    .ss-form-group_2col .ss-label2 {
        position: relative;
        font-weight: 400;
        font-size: 14px;
    }

    .ss-dopdown-select {
        border: 1px solid #b5b5b5;
        display: block;
        position: absolute;
        background: #FFFFFF;
        padding: 5px;
        z-index: 100;
    }

    .ss-dopdown-select ul {
        list-style: none;
        padding: 0;
    }

    .ss-dopdown-select ul li {
        font-size: 16px;
        padding: 10px 20px;
        background: #FFFFFF;
        cursor: pointer;
    }

    .ss-dopdown-select ul li:hover {
        background: #EEEEEE;
    }

    .js-error-field-message {
        color: #FF5555;
    }

    .js-error-class {
        border: 1px solid #FF5555 !important;
    }

    .ss-select-after-input {
        position: absolute;
        top: 18px;
        height: 53px;
        right: 0;
        border: 0px;
        font-size: 16px;
        background: transparent;
    }

    .ss-textarea {
        padding: 0;
        margin: 5px 0 0 0;
        border: 0;
        border-bottom: 1px solid #b5b5b5;
        border-top: 1px solid #e5e5e5;
        background: transparent none repeat scroll 0% 0%;
        font-size: 24px;
        font-weight: 300;
        color: #000;
        width: 100%;
        height: 106px;
        box-sizing: border-box;
    }

    .ss-input {
        padding: 0;
        margin: 0;
        border: 0;
        border-bottom: 1px solid #b5b5b5;
        background: transparent none repeat scroll 0% 0%;
        font-size: 24px;
        font-weight: 300;
        color: #000;
        width: 100%;
        height: 53px;
        box-sizing: border-box;
        -webkit-transition: all ease-in-out 0.1s;
        -moz-transition: all ease-in-out 0.1s;
        -o-transition: all ease-in-out 0.1s;
        transition: all ease-in-out 0.1s;
        outline: none !important;
    }

    .ss-input:focus, .ss-form-group:hover .ss-input, .ss-textarea:focus, .ss-form-group:hover .ss-textarea {
        border-bottom: 1px solid #fa8e73;
    }

    .ss-input::-moz-placeholder, .ss-textarea::-moz-placeholder {
        color: #cacaca;
    }


    .ss-label {
        font-size: 14px;
        line-height: 14px;
        font-weight: 300;
        color: #000;
        text-transform: uppercase;
        cursor: default;
        letter-spacing: 1px;
        -webkit-transition: all ease-in-out 0.1s;
        -moz-transition: all ease-in-out 0.1s;
        -o-transition: all ease-in-out 0.1s;
        transition: all ease-in-out 0.1s;
    }

    .ss-form-group:hover .ss-label {
        color: #fa8669;
    }

    .ss-form-group__hint {
        font-size: 15px;
        font-weight: 300;
        color: #333;
        padding: 20px 0px 10px 0px;
        cursor: default;
    }

    .ss-form-group__hint a {
        color: #fa633f;
    }

    .ss-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        border-radius: 0;
        cursor: pointer;
    }

    .ss-select select {
        z-index: 1;
    }

    .ss-select:after {
        content: ' ';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 5px 0 5px;
        border-color: #9a9a9a transparent transparent transparent;
        position: absolute;
        bottom: 20px;
        right: 0;
        -webkit-transition: all ease-in-out 0.1s;
        -moz-transition: all ease-in-out 0.1s;
        -o-transition: all ease-in-out 0.1s;
        transition: all ease-in-out 0.1s;
    }

    .ss-select:hover:after {
        border-color: #fa8e73 transparent transparent transparent;
    }

    .ss-select select:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
    }

    .ss-form-group__upl-button {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .ss-tabs__menu {
        list-style: none;
        position: relative;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        margin-bottom: 40px;
        -webkit-padding-start: 0px;
        padding-left: 0px;
    }

    .ss-tabs__item {
        position: relative;
        display: inline-block;
        vertical-align: top;
        font-size: 18px;
        font-weight: 300;
        margin-right: 70px;
    }

    .ss-tabs__item:last-child {
        margin-right: 0px;
    }

    .ss-tabs__item#ss-tabs__line {
        display: block;
        position: absolute;
        content: '';
        bottom: -1px;
        left: 0;
        text-indent: -10000px;
        height: 3px;
        width: 0;
        padding: 0;
        background: #000;
        margin-left: 0;
    }

    .ss-tabs__item a {
        display: block;
        color: #000;
        text-decoration: none;
        padding-bottom: 15px;
        cursor: pointer;
    }

    .ss-tabs__item_active {
        color: #fa8669;
    }

    .ss-menu-pane__description {
        font-size: 26px;
        font-weight: 300;
        color: #000;
        text-align: center;
        max-width: 470px;
        margin: 0 auto 28px;
    }

    .ss-button.ss-button-export {
        font-size: 16px;
        display: inline-block;
        margin: 12px auto 0;
    }

    .ss-list-link {
        list-style: none;
        border: 1px solid #d5d5d5;
        margin-top: 39px;
        overflow: hidden;
        -webkit-padding-start: 0px;
        padding-left: 0px;
    }

    .ss-list-link li {
        float: left;
        width: 50%;
        height: 98px;
        font-size: 20px;
        border-right: 1px solid #d5d5d5;
        border-top: 1px solid #d5d5d5;
        box-sizing: border-box;
    }

    .ss-list-link li:nth-child(1), .ss-list-link li:nth-child(2) {
        border-top: 0;
    }

    .ss-list-link li:nth-child(2n) {
        border-right: 0;
    }

    .ss-list-link li a {
        position: relative;
        display: table;
        border-collapse: separate;
        border-spacing: 0 0;
        width: 100%;
        height: 100%;
        color: #000;
        text-decoration: none;
        padding-left: 90px;
        box-sizing: border-box;
    }

    .ss-list-link li a span {
        display: table-cell;
        vertical-align: middle;
    }

    .ss-list-link li a:hover, .ss-list-link li a:hover b {
        color: #ff8562;
    }

    .ss-list-link li a span b {
        display: block;
        font-size: 15px;
        font-weight: 300;
        color: #929292;
        margin-top: 5px;
    }

    .ss-list-link li:nth-child(1) a:before {
        content: "";
        display: block;
        position: absolute;
        left: 40px;
        top: 38px;
        background: url("../assets/icons/all-icons.svg") no-repeat -24px -274px;
        width: 24px;
        height: 24px;
    }

    .ss-list-link li:nth-child(1) a:hover:before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -23px -270px;
    }

    .ss-list-link li:nth-child(2) a:before {
        content: "";
        display: block;
        position: absolute;
        left: 40px;
        top: 38px;
        background: url("../assets/icons/all-icons.svg") no-repeat -156px -275px;
        width: 29px;
        height: 26px;
    }

    .ss-list-link li:nth-child(2) a:hover:before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -155px -271px;
    }

    .ss-list-link li:nth-child(3) a:before {
        content: "";
        display: block;
        position: absolute;
        left: 40px;
        top: 38px;
        background: url("../assets/icons/all-icons.svg") no-repeat -109px -274px;
        width: 33px;
        height: 26px;
    }

    .ss-list-link li:nth-child(3) a:hover:before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -108px -270px;
    }

    .ss-list-link li:nth-child(4) a:before {
        content: "";
        display: block;
        position: absolute;
        left: 40px;
        top: 38px;
        background: url("../assets/icons/all-icons.svg") no-repeat -156px -275px;
        width: 29px;
        height: 26px;
    }

    .ss-list-link li:nth-child(4) a:hover:before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -155px -271px;
    }


    .ss-list-link-forms {
        list-style: none;
        margin-top: 39px;
        overflow: hidden;
        -webkit-padding-start: 0px;
        padding-left: 0px;
    }

    .ss-list-link-forms li {
        display: block;
        float: none;
        border: 0;
        width: auto;
        height: 98px;
        font-size: 20px;
        box-sizing: border-box;
    }

    .ss-list-link-forms li a {
        position: relative;
        display: table;
        border-collapse: separate;
        border-spacing: 0 0;
        width: 100%;
        height: 100%;
        color: #000;
        text-decoration: none;
        padding-left: 90px;
        box-sizing: border-box;
    }

    .ss-list-link-forms li a:hover, .ss-list-link-forms li a:hover b {
        color: #ff8562;
    }

    .ss-list-link-forms li a::before {
        background: rgba(0, 0, 0, 0) url("../assets/icons/all-icons.svg") no-repeat scroll -156px -276px !important;
        width: 30px !important;
        content: "";
        display: block;
        height: 24px;
        left: 40px;
        position: absolute;
        top: 38px;
        width: 24px;
    }

    .ss-list-link-forms li a:hover:before {
        background: rgba(0, 0, 0, 0) url("../assets/icons/all-icons-orange.svg") no-repeat scroll -154px -272px !important;
        width: 30px !important;
    }

    .ss-list-link-forms li a span {
        display: table-cell;
        vertical-align: middle;
    }

    .ss-list-link-forms li a span b {
        display: block;
        font-size: 15px;
        font-weight: 300;
        color: #929292;
        margin-top: 5px;
    }


    .ss-list-link-actions li:nth-child(1) a::before {
        width: 25px;
        height: 26px;
        top: 33px;
        background: url("../assets/icons/all-icons.svg") no-repeat -213px -273px;
    }

    .ss-list-link-actions li:nth-child(1) a:hover::before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -208px -269px;
    }

    .ss-list-link-actions li:nth-child(2) a::before {
        width: 19px;
        height: 26px;
        top: 33px;
        background: url("../assets/icons/all-icons.svg") no-repeat -252px -273px;
    }

    .ss-list-link-actions li:nth-child(2) a:hover::before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -247px -269px;
    }

    .ss-list-link-actions li:nth-child(3) a::before {
        width: 22px;
        height: 25px;
        top: 32px;
        background: url("../assets/icons/all-icons.svg") no-repeat -287px -275px;
    }

    .ss-list-link-actions li:nth-child(3) a:hover::before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -282px -271px;
    }

    .ss-list-link-actions li:nth-child(4) a::before {
        width: 27px;
        height: 23px;
        top: 38px;
        background: url("../assets/icons/all-icons.svg") no-repeat -322px -276px;
    }

    .ss-list-link-actions li:nth-child(4) a:hover::before {
        background: url("../assets/icons/all-icons-orange.svg") no-repeat -317px -272px;
    }

    #menu_actions .ss-form-group__hint {
        text-align: center;
        margin-top: 20px;
    }

    .ss-facebook__badge {
        width: 470px;
        border: 1px solid #e9eaed;
        margin: 38px auto 34px auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .ss-facebook__badge-image {
        background-attachment: unset;
        background-position: center center;
        background-size: cover;
        display: block;
        height: 246px;
        position: relative;
        width: 470px;
        background-repeat: no-repeat;
    }

    .ss-facebook__badge-wrapper {
        margin: 10px 12px;
        font-family: helvetica, arial, sans-serif;
        height: auto;
        max-height: 100px;
    }

    .ss-facebook__badge-title {
        font-size: 18px;
        line-height: 22px;
        font-family: Georgia, 'lucida grande', tahoma, verdana, arial, sans-serif;
        font-weight: 500;
        margin-top: 2px;
        margin-bottom: 7px;
        max-height: 110px;
        overflow: hidden;
        word-wrap: break-word;
    }

    .ss-facebook__badge-descr {
        font-size: 12px;
        line-height: 16px;
        max-height: 80px;
        overflow: hidden;
        word-wrap: break-word;
        color: #141823;
        margin-bottom: 2px;
    }

    .ss-facebook__badge-site {
        padding-top: 9px;
        font-size: 12px;
        line-height: 16px;
        text-transform: uppercase;
        color: #9197a3;
        padding-bottom: 1px;
    }

    .ss-button-white {
        background: #fff;
        border: 1px solid rgba(0, 0, 0, .3);
        color: #222;
        margin-top: 5px;
    }

    .ss-button-white:hover {
        background: #F87458;
        border: 1px solid #F87458;
        color: #fff;
    }

    .ss-button-white .uploadcare-widget-button-open {
        background: transparent;
        color: #000000;
        cursor: hand;
    }

    .ss-export__customize {
        display: none;
    }

    .ss-export__btnwrapper {
        text-align: center;
        padding-top: 40px;
        padding-bottom: 50px;
    }


    .ss-btn {
        position: relative;
        display: inline-block;
        vertical-align: top;
        padding: 13px 29px 15px;
        margin: 0;
        border: 0px none;
        background: #fa8669;
        border-radius: 100px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        outline: none !important;
    }

    .ss-btn:hover {
        background: #F87458;
        color: #fff;
    }

    input.ss-btn,
    input.ss-btn-white {
        padding: 14px 34px;
    }

    .ss-btn-white {
        position: relative;
        padding: 13px 29px 15px;
        display: inline-block;
        margin: 0 0 0 0px;
        border: 0px;
        background: #fff;
        border-radius: 100px;
        font-size: 16px;
        color: #000;
        cursor: pointer;
        outline: none !important;
    }

    .ss-btn_gray-border {
        display: inline-block;
        border: 1px solid #DDD;
    }

    .ss-btn_orange-border {
        display: inline-block;
        border: 1px solid #fa8669;
    }

    .ss-link_with-border {
        border-bottom: 1px solid #fa8669;
        box-shadow: inset 0px -1px 0px 0px #fa8669;
        -webkit-box-shadow: inset 0px -1px 0px 0px #fa8669;
        -moz-box-shadow: inset 0px -1px 0px 0px #fa8669;
        text-decoration: none;
    }

    .ss-btn-white:hover {
        border: 0px;
    }

    .ss-btn_gray-border:hover {
        border: 1px solid #F87458;
    }

    .ss-btn_box {
        border-radius: 0px;
    }

    .ss-btn_box100 {
        border-radius: 0px;
        padding-left: 0px;
        padding-right: 0px;
        width: 100%;
    }

    .ss-upload-button {
        display: inline-block;
    }

    .ss-upload-button .uploadcare-widget-button-open,
    .ss-upload-button .uploadcare-widget-button {
        background-color: #fff;
        color: #000;
        border: 1px solid #e9eaed;
        padding: 15px 35px;
        margin-top: 0px;
        border-radius: 30px;
        font-size: 18px;
        cursor: pointer;
    }



    @media screen and (max-width: 660px) {
        input.ss-btn,
        input.ss-btn-white {
            padding: 10px 20px;
        }
    }


    .ss-fontpairs {
    }

    .ss-fontpairs__slides-wrapper {

    }

    .ss-fontpairs__slide {
        display: none;
    }

    .ss-fontpairs__slide_active {
        display: block;
    }

    .ss-fontpairs__slide-wrap {
        border: 1px solid #e7e7e7;
    }

    .ss-fontpairs__slide-info {
        text-align: center;
        padding-top: 15px;
    }

    .ss-fontpairs__title {
        font-size: 52px;
        padding: 20px 40px 15px 40px;
    }

    .ss-fontpairs__text {
        font-size: 18px;
        padding: 20px 40px;
        padding-top: 0px;
        padding-bottom: 50px;
    }

    .ss-fontpairs__points-wrapper {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 40px;
        box-sizing: border-box;
    }

    .ss-fontpairs__point {
        display: inline-block;
        background-color: #000;
        border-radius: 30px;
        width: 10px;
        height: 10px;
        cursor: pointer;
        margin: 0px 5px;
    }

    .ss-fontpairs__point_active {
        border: 1px solid #aaa;
        background-color: #fff;
    }

    .ss-fonts-div-customize {
        display: none;
    }

    .ss-fonts-btn-customize__btnwrapper {
        text-align: center;
    }

    .ss-fontpairs__info {
        background-color: #eee;
        padding: 20px 40px;
        position: relative;
    }

    .ss-fontpairs__info-headline,
    .ss-fontpairs__info-text {
        font-size: 18px;
    }

    .ss-fontpairs__slide_choosed .ss-btn {
        background: #ccc;
        color: #000;
    }

    .ss-fontpairs__info .ss-btn {
        padding: 10px 29px 10px;
        position: absolute;
        right: 20px;
        top: 25px;
    }

    .ss-form-group label .jq-checkbox__div {
        display: none;
    }

    .ss-form-group label .jq-checkbox {
        position: absolute !important;
        top: 0px;
        left: 0;
        border: 0;
        box-shadow: none;
        background: url("../assets/icons/all-icons.svg") no-repeat -56px -222px;
        width: 23px;
        height: 24px;
        border-radius: 0;
        margin-right: 10px;
    }

    .ss-form-group label .jq-checkbox.checked {
        background-position: -22px -222px;
    }

    .ss-layout-block {
        display: block;
        float: left;
        width: 210px;
        height: 123px;
        box-sizing: border-box;
        margin: 5px;
        background-color: #eeeeee;
    }

    .ss-layout-block:hover, .ss-layout-block__active {
        border: 1px solid #999999;
        cursor: hand;
    }

    .ss-layout-block__ttl-lbr {
        background: rgba(0, 0, 0, 0) url("../assets/icons/fb-layouts.gif") no-repeat 0px 0px;
    }

    .ss-layout-block__ttr-lbl {
        background: rgba(0, 0, 0, 0) url("../assets/icons/fb-layouts.gif") no-repeat 0px -123px;
    }

    .ss-layout-block__ttc-lbc {
        background: rgba(0, 0, 0, 0) url("../assets/icons/fb-layouts.gif") no-repeat 0px -246px;
    }

    .ss-layout-block__tbc-ltc {
        background: rgba(0, 0, 0, 0) url("../assets/icons/fb-layouts.gif") no-repeat 0px -369px;
    }

    .ss-layout-block__tbr-ltl {
        background: rgba(0, 0, 0, 0) url("../assets/icons/fb-layouts.gif") no-repeat 0px -492px;
    }

    .ss-layout-block__tbl-ltr {
        background: rgba(0, 0, 0, 0) url("../assets/icons/fb-layouts.gif") no-repeat 0px -615px;
    }

    .t265-wrapper {
        padding: 30px 20px 28px 55px;
        position: relative;
        text-align: left;
    }

    .t265-icon {
        position: absolute;
        top: 27px;
        left: 20px;
    }

    @media screen and (max-width: 910px) {
        .ss-content__form {
            margin-top: 20px;
        }
    }

    .ss-hidden-m {
        display: none;
    }

    ss-integlist {
    }

    .ss-integlist__td {
        font-size: 18px;
        padding-bottom: 20px
    }

    @media screen and (max-width: 760px) {
        .ss-container {
            padding-top: 50px;
        }

        .ss-wrapper {
            background: transparent;
            border: none;
            padding-top: 0px;
        }

        .ss-header-buttons {
            float: none;
        }

        .ss-menu-pane {
            background: #fff;
            border: 1px solid #e7e7e7;
            margin-bottom: 15px;
            padding: 30px 15px;
        }

        .ss-content {
            margin-left: 0;
        }

        .ss-menu {
            display: none;
        }

        .ss-menu-pane {
            display: block;
        }

        .ss-hidden-xs {
            display: none;
        }

        .ss-hidden-m {
            display: block;
        }

        .ss-content__form {
            padding: 0;
            max-width: 100%;
        }

        .ss-header {
            position: fixed;
            max-width: 99vw;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            background: #ededed;
            z-index: 2900;
            border-bottom: 1px solid #e7e7e7;
            padding: 15px;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
        }

        .ss-header h1 {
            font-size: 24px;
            margin-bottom: 0;
            text-align: left;
            margin-top: 0;
        }

        .ss-button {
            font-size: 13px;
            padding: 9px 18px 9px;
        }

        .ss-form-group {
            margin-bottom: 40px;
        }

        .ss-form-group:last-child {
            margin-bottom: 0;
        }

        .ss-label {
            font-size: 11px;
            line-height: 12px;
            font-weight: 300;
        }

        .ss-input {
            font-size: 22px;
            font-weight: 300;
            color: #000;
            height: 42px;
        }

        .ss-form-group__hint {
            font-size: 11px;
            padding-top: 10px;
            padding-bottom: 0;
        }

        .ss-form-group_2col {
            padding-left: 100px;
        }

        .ss-form-group_2col .ss-label {
            width: 80px;
            top: 12px;
        }

        .ss-menu-pane__title {
            margin-top: 10px;
        }

        .ss-fonts-div-customize .ss-tabs__item_active {
            font-weight: bold;
        }

        .ss-fontpairs__info {
            padding: 10px 20px;
        }

        .ss-fontpairs__info-headline,
        .ss-fontpairs__info-text {
            font-size: 14px;
        }

        .ss-fontpairs__info .ss-btn {
            top: 10px;
        }

        .ss-list-link-forms li a::before {
            left: 10px;
        }

        .ss-list-link-forms li a {
            padding-left: 60px;
        }

        .ss-integlist__td {
            font-size: 14px;
        }

    }

    @media screen and (max-width: 548px) {
        .ss-list-link li {
            width: 100%;
            border-right: 0;
        }

        .ss-list-link li:nth-child(1) {
            border-bottom: 1px solid #d5d5d5;
            border-right: 0;
        }
    }

    @media screen and (max-width: 480px) {
        h1.ss-menu-pane__title {
            display: none;
        }
    }


    td.dpw-info a {
        border-bottom: 1px solid #ff8562;
    }

    .dpw-webmaster-stats {
        font-size: 16px;
    }

    .dpw-container-recommendations h2 {
        margin-top: 60px;
        margin-bottom: 30px;
    }

    .dpw-container-recommendations p {
        margin-bottom: 10px;
    }

    .dpw-container-recommendations p a {
        border-bottom: 1px solid #ff8562;
    }

    .dpw-container-recommendations table {
        width: 100%;
    }

    .dpw-container-recommendations .dpw-list-comments {
        padding-left: 15px;
    }

    .dpw-container-recommendations td a {
        color: #333;
        font-size: 14px;
        border-bottom: 1px solid #000;
    }

    .dpw-container-recommendations th {
        padding: 8px 10px;
        font-size: 18px;
    }

    .dpw-container-recommendations td {
        padding: 15px 10px;
    }

    .dpw-container-recommendations tr {
        border-bottom: 1px solid #f5f5f5;
    }

    .dpw-container-recommendations table tr td:first-child {
        font-size: 14px !important;
    }

    .dpw-container-recommendations table tr td:last-child {
        font-size: 14px !important;
    }

    .dpw-container-recommendations #errorseobox td {
        font-size: 14px;
    }

    .dpw-container-recommendations #errorseobox .dpw-container-recommendations__recomments {
        background-color: rgba(255, 213, 202, 0.22);
    }

    .dpw-container-recommendations #errorseobox thead th {
        border-bottom: 4px solid #000;
        padding-bottom: 20px;
    }

    .dpw-container-recommendations #warningseobox td {
        font-size: 14px;
    }

    .dpw-container-recommendations #warningseobox thead th {
        border-bottom: 4px solid #FFFF00;
    }

    .dpw-container-recommendations #okseobox td {
        font-size: 14px;
    }

    .dpw-container-recommendations #okseobox thead th {
        border-bottom: 4px solid #00FF33;
    }

    .dpw-container-recommendations #unpublishseobox td {
        font-size: 14px;
    }

    .dpw-container-recommendations #unpublishseobox thead th {
        border-bottom: 4px solid #999999;
    }

    .dpw-container-recommendations #unpublishseobox th:nth-child(3),
    .dpw-container-recommendations #unpublishseobox th:nth-child(4),
    .dpw-container-recommendations #unpublishseobox th:nth-child(5),
    .dpw-container-recommendations #unpublishseobox td:nth-child(3),
    .dpw-container-recommendations #unpublishseobox td:nth-child(4),
    .dpw-container-recommendations #unpublishseobox td:nth-child(5) {
        display: none;
    }

    .dpw-short-notice {
        margin: 40px auto 40px auto;
        padding: 30px 40px;
        min-width: 400px;
        text-align: left;
        font-size: 17px;
        border: 1px solid #DDDDDD;
    }

    .dpw-short-notice p {
        margin-bottom: 20px;
    }

    .dpw-info {
        font-size: 24px;
        font-weight: 300;
        color: #000;
        width: 100%;
        box-sizing: border-box;
        -webkit-transition: all ease-in-out 0.1s;
        -moz-transition: all ease-in-out 0.1s;
        -o-transition: all ease-in-out 0.1s;
        transition: all ease-in-out 0.1s;
        outline: none !important;
        display: block;
        font-family: "tfutura";
        margin-bottom: 10px;
    }

    .dpw-label {
        line-height: 42px;
        font-size: 14px;
        font-family: tfutura;
        padding-right: 20px;
        font-weight: 300;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .dpw-group label {
        font-family: "tfutura";
        font-size: 14px;
        font-weight: 300;
        color: #000;
        text-transform: uppercase;
        cursor: default;
        letter-spacing: 1px;
        line-height: 24px;
    }


    .ss-tl__page-container {
        max-width: 960px;
        padding-left: 100px;
        width: 100%;
    }

    @media screen and (max-width: 1200px) {
        .ss-tl__page-container {
            padding-left: 20px;
            width: 90%;
        }
    }


</style>