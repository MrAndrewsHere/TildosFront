<template>
    <div    id="scroll-target">
        <v-progress-linear
                indeterminate
              :hidden="!loading"
                color="#fa876b"
                style="position: fixed; top: 0px; left: 0px;  width: 100%; z-index: 2000; background-color: rgb(255, 255, 255); opacity: 1;"
        ></v-progress-linear>
        <div v-for="block in blocks" :key="block.id">
            <record :props="block.props.default">
                <template v-slot:slotcomponent>
            <component v-if="block.props.hasOwnProperty('default') && block.props.default.hasOwnProperty('version')" :is="block.component" :record="block"></component>
                </template>
            </record>
        </div>
        <div v-if="this.query" style="position: fixed;left: 5px;bottom: 5px;z-index: 20">
            <v-btn @click="$router.push({path:'/page',query:{'pageid':query.pageid,'projectid':query.projectid}})"
                   class="returnbtn"  dark depressed rounded outlined>Вернуться  к редактированию</v-btn>
        </div>
    </div>
</template>

<script>
    import {HTTP} from "../axios";
    import importComponents from "../components/controlpanel/PageBuilder/mixins/importComponents";
    export default {
        name: "PageViewer",
        props:['query'],
        mixins:[importComponents],
        components: {},
        data(){
            return{
                project:[],
                loading: false,
                title: "",
                blocks: [],
                snackbar: {
                    text: "",
                    value: false
                }
            }
        },
        methods:{

            update(){
                this.loading = true

                let url = '';
                if(this.query){
                    url = `pages/${this.query.pageid}?project_id=${this.query.projectid}`;
                }
                else {
                    url = `getpublicpage?pageurl=${this.$route.fullPath.slice(1)}&domain=${window.location.hostname}`;
                }

                HTTP
                    .get(url)
                    .then(r => {
                        if(process.env.NODE_ENV === 'production'  && r.data.page.is_public === 0)
                        {
                            this.$router.replace('/404')
                        }

                        this.blocks = JSON.parse(r.data.page.data)
                        this.title = r.data.page.title
                        this.loading = false
                        this.project = r.data.project
                        if(this.project.favicon)
                        {

                            document.getElementById('favicon').href = this.project.favicon;
                        }
                        if(this.project.name){

                            document.getElementById('title').innerText = this.project.name;
                        }

                    })
                    .catch(e => {
                        if(e.response.status === 404){
                            this.$router.replace('/404')
                        }
                    }).finally(()=>{
                    this.loading = false
                })
            }
        },

        beforeMount() {
                this.update()



        },

        updated() {
            if( document.getElementsByClassName("t456__positionfixed").length>0 && window.screen.width >= 960)
            {  document.getElementById("firstcontainer").style.transition = '0.3s'
            document.getElementById("menussss").style.transition = '0.3s'
            document.getElementById("scroll-target").style.marginTop = '160px'


                var prevScrollpos = window.pageYOffset;
                window.onscroll = function() {
                    var currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos) {
                        document.getElementById("firstcontainer").style.height = "80px";
                        document.getElementById("menussss").style.height = "160px";
                    } else {
                        document.getElementById("firstcontainer").style.height = "0";
                        document.getElementById("menussss").style.height = "80px";

                    }
                    prevScrollpos = currentScrollPos;
                }
            }

        }
    }
</script>

<style scoped>
    a {
        color: #ff8562!important;
        text-decoration: none!important;
    }
    .view-title{
        font-size: 40px;
        color: #18224b;
        line-height: 1.23;
        font-family: 'PT Sans',Arial,sans-serif;
        font-weight: 600;
        padding: 20px 0 60px 0;
        text-align: center;
    }
    .returnbtn{

        background-color: black;


        font-size: 11px
    }
</style>