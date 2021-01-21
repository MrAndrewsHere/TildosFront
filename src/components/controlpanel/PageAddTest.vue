<template>
    <div >

        <v-toolbar v-show="!redactor"  dense elevation="1" height="60px" width="100%"    style="position: fixed; top: 0px; left: 0px; height: 60px; width: 100%; z-index: 2000; background-color: rgb(255, 255, 255); opacity: 1;">

            <v-avatar size="72px" @click="$router.push('/')" style="cursor: pointer" tile>
                <v-img  src="../../assets/logo_new_small_eng_100.png"></v-img>
            </v-avatar>



            <v-bottom-navigation
                    height="55px"
                    style="justify-content:flex-end"

                    class=""


            >
                <v-btn :disabled="is_disign_mode" class="ml-2" x-small @click="$router.push('/projects')">
                    <span class="navlink" style="color: black">Мои сайты</span>
                    <v-icon small color="black">mdi-home</v-icon>
                </v-btn>
                <v-btn :disabled="is_disign_mode" x-small @click="$router.push('/project/'+query.projectid)">
                    <span class="navlink" style="color: black;text-transform: capitalize ">{{(project.name)}}</span>
                    <v-icon

                            color="black"
                            small

                    >mdi-layers
                    </v-icon>
                </v-btn>


                <v-spacer></v-spacer>
                <v-btn x-small v-if="changelist.length >1" :disabled="saving" @click="cancel">
                    <span class="navlink">Отменить</span>
                    <v-icon small>mdi-backup-restore</v-icon>
                </v-btn>
                <v-btn x-small  @click="publish" class="v-btn--active">
                    <span class="navlink" style="font-weight: 700">Опубликовать</span>
                    <v-icon small>mdi-publish</v-icon>
                </v-btn>

                <v-btn :disabled="is_disign_mode" x-small
                       @click="$router.push({path:'/preview',query:{'pageid':query.pageid,'projectid':query.projectid}})">
                    <span class="navlink">Предпросмотр</span>
                    <v-icon small>mdi-polaroid</v-icon>
                </v-btn>

<!--                <v-btn disabled x-small value="nearby">-->
<!--                    <span class="navlink">Настройки</span>-->
<!--                    <v-icon small>mdi-cog-outline</v-icon>-->
<!--                </v-btn>-->

                <v-menu :offset-y="true">
                    <template v-slot:activator="{on,attr}">
                        <v-btn   x-small v-on="on" v-bind="attr" value="nearby">
                            <span class="navlink">Ещё</span>
                            <v-icon small>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </template>
                    <v-list dense tile>
                        <v-list-item link @click="openBlockMap">
                            <v-list-item-content>
                                Карта блоков
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-bottom-navigation>



        </v-toolbar>
        <v-progress-linear
                indeterminate
                id="authleaner"
                color="#fa876b"

                style="position: fixed; top: 60px; left: 0px;  width: 100%; z-index: 2000; background-color: rgb(255, 255, 255); opacity: 1;"
        ></v-progress-linear>
        <WYSIWYG v-show="redactor" ref="WYSIWYG" ></WYSIWYG>

        <div @click="log($event)">
            <PageBuilder2 ref="PageBuilder"  :blocks="blocks" style="margin-top: 62px" @update-blocks="submitblock($event)" @close-redactor="closeRedactor"></PageBuilder2>
        </div>

        <v-snackbar
                v-model="snackbar.value"
        >
            {{ snackbar.text }}
            <v-btn
                    color="#FFAB91"
                    text
                    @click="snackbar.value = false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import PageBuilder2 from "./PageBuilder/ThePageBuilder2";
    import {HTTP} from "../../axios";
    import WYSIWYG from "./PageBuilder/WYSIWYG";

    export default {
        name: "PageAddTest",
        props: ['query'],
        components: {
            PageBuilder2,
            WYSIWYG
        },
        data() {
            return {
                blocksMap:true,
                saving: false,
                project: '',
                pages: '',
                loading: false,
                title: "Заголовок страницы",
                url: "",
                isPublic: false,
                blocks: [],
                saveDialog: false,
                snackbar: {
                    text: "",
                    value: false
                },
                changelist: [],
            }
        },
        computed: {
            get_project_name(name) {
                if (this.$route.meta.mode !== 'design') {
                    if (name.length > 10) {
                        return name.slice(0, 10) + '...';
                    }
                    return name;
                } else {
                    return 'Design';
                }

            },
            redactor:{
                get(){return this.$store.getters.redactor;},
                set(){}
            },
            inputCols() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return 12
                    case 'sm':
                        return 12
                    case 'md':
                        return 12
                    case 'lg':
                        return 6
                    case 'xl':
                        return 6
                }
                return false
            },
            is_disign_mode() {
                return this.$route.meta.mode === 'design';
            }
        },

        methods: {

            openBlockMap(){
              this.$refs.PageBuilder.openBlockMap();
            },
            log(e) {
                if (this.redactor) {
                    return e.target.closest('#QuillEditor') ?'':this.$refs.WYSIWYG.deleteall()
                }

            },
            closeRedactor(){

                this.$store.dispatch('disableQuill')
            },

            publish(){
                HTTP.post('/publish', JSON.stringify({'pageid':this.query.pageid, project_id:this.project.id}),
                    { headers: {
                            "Content-Type": "application/json"
                        }}).then(()=>{


                })
            },
            submitblock() {


                this.changelist.push(JSON.parse(JSON.stringify(this.blocks)));
                if (this.changelist.length > 20) {

                    this.changelist.shift()
                }
                if (this.$route.meta.mode !== 'design' && this.changelist.length > 1) {
                     this.savePage()
                }
            },
            cancel() {

                if (this.changelist.length > 1) {
                    this.saving = true;
                    this.changelist.pop()
                    this.blocks = JSON.parse(JSON.stringify(this.changelist.pop()))
                    if (this.$route.meta.mode !== 'design') {
                        this.savePage()
                    }

                }

            },

            get_preview_route(pageid) {
                return '/preview/' + 'pageid=' + pageid + '&projectid=' + this.project.id
            },

            savePage() {
                var data = {}
                if (this.isPublic) {
                    data.isPublic = true
                }
                data.blocks = JSON.stringify(this.blocks)
                data.title = this.title
                data.project_id = this.query.projectid
                data.url = this.url

                HTTP
                    .put("savepages/" + this.query.pageid, JSON.stringify(data), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(() => {

                        this.saving = false;

                    })
                    .catch(e => {
                        if (e.response.status === 409) {
                            this.showSnackbar(e.response.data.error)
                        } else {
                            this.showSnackbar("Что-то пошло не так. Попробуйте позже")
                        }
                    })
            },
            getPage() {

                document.getElementById('authleaner').hidden = false;
                this.loading = true
                HTTP
                    .get(`pages/${this.query.pageid}?project_id=${this.query.projectid}`)
                    .then(r => {
                        this.isPublic = r.data.page.is_public == 1 ? true : false

                        this.blocks = JSON.parse(r.data.page.data)
                        this.title = r.data.page.title
                        this.url = r.data.page.url

                        this.loading = false


                    }).then(
                    HTTP.get('/project/' + this.query.projectid).then(res => {
                        this.project = res.data.project
                        this.pages = res.data.pages
                        this.$store.dispatch('pagesList', this.pages )
                    })
                )
                    .catch(e => {
                        if (e.response.status == 404) {
                            this.$router.push('/404')
                        }
                    })
                    .finally(()=>{ document.getElementById('authleaner').hidden = true;})
            },

            showSnackbar(text) {
                this.snackbar.text = text;
                this.snackbar.value = true;
            }
        },



        mounted() {
            if (this.$route.meta.mode !== "design") {
                this.getPage()
            } else {
                if (process.env.NODE_ENV === "production") {
                    return this.$router.push('/404');
                }
                this.loading = true
            }


        }
    }
</script>

<style scoped>
    div {
        font-family: inherit;
    }

    .view-title {
        font-size: 40px;
        color: #18224b;
        line-height: 1.23;

        font-family: inherit;
        font-weight: 600;
        padding: 20px 0 60px 0;
        text-align: center;
    }

    .home-link {
        color: black;
        text-decoration: none;

        font-size: 16px;
    }

    .home-link:hover {
        color: black;


    }

    .navlink {
        font-size: 12px;
    }

    .v-bottom-navigation {
        box-shadow: none !important;
    }

    .v-btn.v-btn--contained.theme--light.v-size--default {
        color: rgba(0, 0, 0, 0.6);
    }

    .v-toolbar__content {
        padding-right: 0;
    }

    .oranged:hover .undoranged {
        color: #FFAB91;
        cursor: pointer;
    }


</style>