<template>
    <div class="page-builder" style="position: relative;">

        <!--Отрисовка блоков-->
        <div class="block hover_outlined " style="" v-for="(block, index) in blocks" :key="index">

            <div v-if="block.props.hasOwnProperty('default') && block.props.default.hasOwnProperty('version')">
                <!--Панель с кнопками вверхy-->
                <div class="hovered"
                     style="position: absolute;width:100%;z-index:2;display: flex;justify-content: space-between">
                    <div>

                        <v-btn
                                color="#E0E0E0"
                                style=""
                                class="mt-3 ml-3 mr-3"


                                @click="activeblock = block,activeblockinex = index,settings =!settings"
                                small


                        >
                            <v-icon>mdi-cogs</v-icon>
                            Настройки
                        </v-btn>
                        <v-btn
                                color="#FFAB91"
                                style=""
                                class="mt-3"

                                @click="activeblock = block,activeblockinex = index, fillable =!fillable"
                                small


                        >
                            <v-icon>mdi-square-edit-outline</v-icon>
                            Контент
                        </v-btn>
                        <br>
                        <span class="ml-5"
                              style="letter-spacing: 0.4px;max-height: 30px;text-wrap: normal;font-size: 12px!important;font-weight: 200"><span
                                class="font-weight-bold">{{block.code}}</span> {{block.name}}</span>
                    </div>
                    <div class="ma-3 ">
                        <v-btn
                                color="white"
                                style=""
                                fab
                                x-small
                                elevation="2"
                                @click="move_row_up_m(index)"


                        >
                            <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn

                                color="white"
                                fab
                                x-small
                                elevation="2"
                                class="mr-2"
                                @click="move_row_down_m(index)"


                        >
                            <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                        <v-btn
                                color="white"
                                style=""
                                fab
                                x-small

                                elevation="2"
                                @click="copyblock(index)"

                        >
                            <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                        <v-btn
                                color="white"
                                style=""
                                fab
                                depressed
                                x-small

                                elevation="2"
                                @click="switchBlockHidden(index)"

                        >
                            <v-icon>{{block.props.default.hidden?'mdi-eye-outline':'mdi-eye-off-outline'}}</v-icon>
                        </v-btn>

                        <v-menu>
                            <template v-slot:activator="{on,attr}">
                                <v-btn
                                        color="white"
                                        style=""
                                        fab
                                        x-small
                                        class="mr-2"
                                        elevation="2"
                                        v-bind="attr"
                                        v-on="on"

                                >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-item link @click="addToClipboard(index)">
                                    <v-list-item-avatar size="18">
                                        <v-icon small>mdi-clipboard-arrow-down-outline</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>Копировать в буфер</v-list-item-content>
                                </v-list-item>
                                <v-list-item link @click="addToClipboard(index,true)">
                                    <v-list-item-avatar size="18">
                                        <v-icon small>mdi-content-cut</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>Вырезать в буфер</v-list-item-content>
                                </v-list-item>
                                <v-list-item link
                                             @click="activeSaveblock = JSON.parse(JSON.stringify(block)),saveTMPL = !saveTMPL">
                                    <v-list-item-avatar size="18">
                                        <v-icon small>mdi-content-save</v-icon>
                                    </v-list-item-avatar>
                                    <v-list-item-content>Сохранить как шаблон</v-list-item-content>
                                </v-list-item>

                            </v-list>
                        </v-menu>
                        <v-btn
                                color="white"
                                style=""
                                fab
                                x-small
                                elevation="2"


                                @click="removeBlock(index)"

                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </div>

                </div>

                <record v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.5, 1.0]
            }
          }" :props="block.props.default" :index="index">
                    <template v-slot:slotcomponent>
                        <component :is="block.component" :record="block"
                                   @copy_main_block="copyblock(index)" @move_row_up="move_row_up_m(index)"
                                   @move_row_down="move_row_down_m(index)"
                                   @block-delete="() => {blocks.splice(index, 1)}">
                        </component>
                    </template>
                </record>


                <!--Кнопка добавить внизy-->
                <div class="hovered"
                     style="position: absolute;width:100%; z-index:3;display: flex;justify-content: center">

                    <v-btn
                            color="dark"
                            style="margin-top: -16px"
                            dark
                            x-small
                            fab
                            @click="drawer = !drawer,toindex = index"
                    >
                        <v-icon style="z-index: 3">mdi-plus</v-icon>
                    </v-btn>
                </div>

            </div>
        </div>

        <!--Кнопка для добавления когда массив блоков пyст-->
        <div class="fab-container" v-if="blocks.length === 0">
            <v-btn


                    dark
                    elevation="0"
                    x-small
                    fab
                    @click="drawer = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>

        <!--Настройки блока-->
        <v-navigation-drawer
                v-model="settings"
                fixed
                temporary
                overlay-opacity="0"
                app
                width="320px"
                style="margin-top: 60px"

        >
            <blocksettings @save="saveblock($event)" @saveandclose="saveandclose($event)"
                           :record="activeblock"></blocksettings>
        </v-navigation-drawer>

        <!--Контент блока-->
        <v-navigation-drawer
                v-model="fillable"
                fixed
                temporary
                app
                overlay-opacity="0"
                width="960px"
                style="margin-top: 60px"

        >

            <contentsettings @save="saveblock($event)" @saveandclose="saveandclose($event)"
                             :block="activeblock"></contentsettings>
        </v-navigation-drawer>

        <!--Добавление блока-->
        <v-navigation-drawer
                v-model="drawer"
                fixed
                temporary
                app
                :width="widthofbar"
                style="margin-top: 60px"
        >
            <div style="position: fixed;left:0;bottom: 0;top: 0;right:0;z-index: 5">
                <v-row class="pl-2">

                    <div class="non_scroll" style="height: 100vh;overflow:scroll;width: 200px;">

                        <v-list dense tile>

                            <div class="pa-3" style="display: flex;justify-content: start">

                                <v-text-field v-model="searchTmplt" @keypress.enter="searchTemplate(searchTmplt)"
                                              prepend-icon="mdi-feature-search-outline" dense hide-details
                                              placeholder="Найти" color="black"></v-text-field>
                            </div>

                            <v-list-item-group active-class="activelistitem">

                                <v-list-item v-for="(t,index) in tmplsw" :key="index" link
                                             @click="activatelist = t.values,expand = true"
                                >


                                    <v-list-item-content>
                                        <v-list-item-title class="font-weight-bold">{{t.categoriename}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item color="#72838BB8"
                                             link

                                             @click="activatelist = Savedtmplsw.map(item => {return item.data}),expand = true"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title class="font-weight-bold">
                                            <span style="color:#0d183f;"> hr.uni-dubna.ru</span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item color="red"
                                             link
                                             style=""
                                             @click="activatelist = clipboard,expand = true"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title class="font-weight-bold">
                                            <span style="color: #cd6c6c">Clipboard</span>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-icon small @click="clear_clipboard">mdi-trash-can-outline</v-icon>
                                    </v-list-item-action>
                                </v-list-item>

                            </v-list-item-group>
                            <v-list-item color="black"
                                         link
                                         style=""

                            >


                            </v-list-item>

                        </v-list>
                    </div>
                    <div class="non_scroll" v-if="expand"
                         style="height: 100vh;overflow:scroll;width: 350px;border-left: 1px solid rgba(0,0,0,0.2)">
                        <v-list dense class="pa-0 " style="margin-bottom: 55px">

                            <div @click="addBlock(card);drawer = !drawer" style="cursor: pointer"
                                 v-for="(card,index) in activatelist" :key="index">
                                <v-card

                                        elevation="0"
                                        tile
                                        class="pa-4 pb-3"
                                >
                                    <div style="height: 200px">
                                        <v-img
                                                class=" white--text align-end"
                                                style="height: 100%"
                                                :src="card.image"
                                        >
                                        </v-img>
                                    </div>


                                    <v-card-text class="pa-1 pt-2 text--primary">
                                        <v-chip small class="mr-1 t-uppercase">{{card.code}}</v-chip>
                                        <span class="font-weight-bold"> {{card.name}}</span> <span
                                            class="text--disabled " style="font-size: 11px">{{card.describe}}</span>
                                    </v-card-text>
                                </v-card>

                                <v-divider class="mx-5"></v-divider>

                            </div>


                        </v-list>
                    </div>
                </v-row>
            </div>
        </v-navigation-drawer>

        <v-overlay
                v-model="saveTMPL"
                light


        >
            <template>
                <v-card
                        light
                        class="mx-auto " style="margin-top: 60px"
                        width="374"
                >


                    <v-img
                            height="250"
                            :src="activeSaveblock.image||'https://cdn.vuetifyjs.com/images/cards/cooking.png'"
                    ></v-img>

                    <v-card-title class="pb-0">
                        <v-text-field color="#FF6D00" dense v-model="activeSaveblock.name"
                                      label="Название"></v-text-field>
                    </v-card-title>

                    <v-card-title class="pb-0">
                        <v-text-field color="#FF6D00" dense v-model="activeSaveblock.describe"
                                      label="Описание"></v-text-field>
                    </v-card-title>
                    <v-card-title class="py-0">
                        <v-checkbox class="" dense
                                    color="#FF6D00"
                                    label="Новый"
                                    v-model="newTMPL"
                        ></v-checkbox>


                    </v-card-title>
                    <v-card-title class="py-0">
                        <v-select
                                label="Заменить"
                                item-text="text"
                                item-value="value"
                                :items="Savedtmplsw.map(it => {
                                            return {text:it.data.name+' : '+it.data.describe,value:it.id}
                                        })"
                                color="#FF6D00"
                                v-model="selectedTMPL"

                        ></v-select>
                    </v-card-title>


                    <v-card-title class="py-0">
                        <image-uploader width="40px" height="20px" @download="activeSaveblock.image = $event"
                                        :value="activeSaveblock.image" :mode="'url'"></image-uploader>
                        <!--                        <v-file-input-->
                        <!--                                chips-->
                        <!--                                color="#FF6D00"-->
                        <!--                                multiple-->
                        <!--                                label="Изображение"-->
                        <!--                        ></v-file-input>-->
                    </v-card-title>

                    <v-divider class="mx-4"></v-divider>


                    <v-card-actions>
                        <v-btn
                                color="#FF6D00"
                                text
                                @click="saveTemplate()"
                        >
                            Сохранить
                        </v-btn>
                        <v-btn
                                color=""
                                text
                                @click="saveTMPL=false"
                        >
                            Отмена
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-overlay>

        <v-navigation-drawer
                v-model="blocksMap"
                fixed

                app
                right
                style="margin-top: 60px;">
            <v-list dense style="margin-bottom: 60px">
                <v-list-item two-line>
                    <v-list-item-title class="subtitle-1">
                        Карта блоков <span class="body-2 ">({{blocks.length}})</span>
                    </v-list-item-title>
                    <v-card-actions>
                        <v-icon @click="blocksMap=!blocksMap"> mdi-close</v-icon>
                    </v-card-actions>
                </v-list-item>

                <div v-for="(block,index) in blocks" :key="index">
                    <v-list-item :data-intersect="index" link>
                        <v-list-item-content color="black" @click="scrollToBlock(index)">
                        <span class="overline"
                              style="font-weight: 800!important;display: flex;justify-content: space-between">

                           <span> {{block.code}}
                            <span style="color: #ef8c71!important;font-size: 8px!important;">
                                 {{block.props.hasOwnProperty('default')&&block.props.default.hasOwnProperty('id')?block.props.default.id:''}}
                            </span></span>
                             <span style="font-weight: 400;color: rgba(0,0,0,0.8)">№ {{index+1}}</span>
                        </span>
                            <span class="caption">{{block.name}}</span>
                        </v-list-item-content>
                        <v-card-actions>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on, attrs}">
                                    <v-icon x-small class="icon_hov_orang" v-on="on" v-bind="attrs"
                                            @click="copyFromClipboadr(index)">mdi-content-paste
                                    </v-icon>
                                </template>
                                <span>Вставить после блока</span>
                            </v-tooltip>
                            <v-icon x-small class="icon_hov_orang" @click="copyJson(index)">mdi-content-copy</v-icon>

                            <v-icon x-small class="icon_hov_orang" @click="copyJson(index,true)">mdi-content-cut
                            </v-icon>


                            <v-icon x-small class="icon_hov_orang" @click="removeBlock(index)">mdi-trash-can-outline
                            </v-icon>
                        </v-card-actions>

                    </v-list-item>
                    <v-divider class="ml-1"></v-divider>
                </div>

            </v-list>

        </v-navigation-drawer>
    </div>
</template>

<script>
    import {JSON_Components} from "./JSON_Components"
    import Blocksettings from "./blocksettings";
    import Contentsettings from "./contentsettings";
    import {HTTP} from "../../../axios";
    import ImageUploader from "./ImageUploader";
    import importComponents from "./mixins/importComponents";

    export default {
        name: "ThePageBuilder2",
        props: ['blocks'],
        mixins:[importComponents],
        components: {
            ImageUploader,
            Contentsettings,
            Blocksettings,
        },
        data() {
            return {
                blocksMap: false,
                model: -1,
                drawer: false,
                items: [],
                selectedTMPL: null,
                saveTMPL: false,
                expand: false,
                settings: false,
                fillable: false,
                toindex: 0,
                newTMPL: true,
                activeblock: '',
                activeSaveblock: {},
                activeblockinex: '',
                activatelist: [],
                searchTmplt: '',
                blockJSON: '',
                tmplsw: [],
                Savedtmplsw: [],
            }
        },
        computed: {
            maxId() {
                if (this.blocks.length === 0) {
                    return 0;
                } else {
                    return Math.max(...this.blocks.map(el => el.props.default.id))
                }
            },
            widthofbar() {
                return this.expand ? '550px' : '200px';
            },
            clipboard() {
                return this.$store.getters.clipboard;
            }
        },
        watch: {
            blocks: {
                deep: true,
                handler() {
                    this.$emit("update-blocks", this.blocks)
                }
            },
            fillable(value){
                if(!value){
                    this.activeblock=[];
                }
            },
            settings(value){
                if(!value){
                    this.activeblock=[];
                }
            }


        },
        methods: {
            switchBlockHidden(index) {
                this.blocks[index].props.default.hidden = !this.blocks[index].props.default.hidden
            },
            onIntersect(entries) {

                if (entries[0].intersectionRatio >= 0.4) {
                    document.querySelectorAll('[data-intersect="' + entries[0].target.dataset.intersectblock + '"]')[0].classList.add('intersect');
                } else {
                    document.querySelectorAll('[data-intersect="' + entries[0].target.dataset.intersectblock + '"]')[0].classList.remove('intersect');
                }

            },
            openBlockMap() {
                this.blocksMap = true;
            },
            scrollToBlock(index) {
                document.querySelectorAll('[data-intersectBlock="' + index + '"]')[0].scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
            },

            copyJson(index, cut) {
                navigator.clipboard.writeText(JSON.stringify(this.blocks[index])).then(() => {
                    if (cut) {
                        this.removeBlock(index, true);
                    }
                })
            },

            removeBlock(index, notconfirm) {
                var remove = () => {
                    this.blocks.splice(index, 1)
                    this.$emit('close-redactor')
                }

                if (!notconfirm) {
                    if (confirm("Удалить блок?")) {
                        remove()
                    }
                } else {
                    remove()
                }
            },

            add_from_json(JSONtext, index) {
                try {
                    let tmp =  JSON.parse(JSONtext);
                    if(!tmp.code){throw new SyntaxError("Не удалось создать блок из данных")}
                    this.blocks.splice((index || this.toindex) + 1, 0,tmp)
                }
                catch (e) {
                    alert('Не удалось создать блок из данных')
                }
            },
            copyFromClipboadr(index) {

                navigator.clipboard.readText().then(clipText => {
                    this.add_from_json(clipText, index);
                })
            },
            clear_clipboard() {
                this.$store.dispatch('clear_clipboard');
                this.expand = false;
            },
            addToClipboard(index, cut) {
                this.$store.dispatch('clipboard', JSON.parse(JSON.stringify(this.blocks[index])));
                cut ? this.removeBlock(index, true) : '';

            },
            saveTemplate() {

                if (this.activeSaveblock) {

                    if (this.newTMPL) {
                        HTTP.post('template', {data: JSON.stringify(this.activeSaveblock)})
                            .then(r => {
                                let tmp = r.data[0];
                                tmp.data = JSON.parse(JSON.parse(tmp.data));
                                this.Savedtmplsw.push(tmp);
                                this.saveTMPL = false
                            })
                            .catch(err => {


                            })
                            .finally(() => {

                            })
                    } else {
                        if (this.selectedTMPL) {
                            HTTP.put('template/' + this.selectedTMPL, {data: JSON.stringify(this.activeSaveblock)})
                                .then(r => {
                                    let tmp = r.data[0];
                                    tmp.data = JSON.parse(JSON.parse(tmp.data));

                                    this.Savedtmplsw.forEach(t => {
                                        t.id === this.selectedTMPL ? t.data = this.activeSaveblock : '';
                                    });
                                    this.saveTMPL = false
                                })
                                .finally(() => {

                                })
                        } else {
                            console.log('Выберите Шаблон');
                        }


                    }

                }
            },

            searchTemplate(search) {

                if (search.length === 0) {
                    return null
                }
                search = search.toLowerCase();

                let res = [];
                this.tmplsw.forEach((item) => {
                    item.values.forEach((value) => {
                        (value.code.toLowerCase().includes(search) || value.name.toLowerCase().includes(search) || value.describe.toLowerCase().includes(search)) ?
                            res.push(value) : '';
                    });

                });
                this.activatelist = res
                this.expand = true

            },

            saveblock(block) {
                this.blocks[this.activeblockinex] = JSON.parse(JSON.stringify(block));
                this.$emit("update-blocks", this.blocks)
                this.$forceUpdate();

            },
            saveandclose(block) {
                this.settings = false;
                this.fillable = false;

                this.saveblock(block)
            },

            copyblock(index) {
                let copy = JSON.parse(JSON.stringify(this.blocks[index]));
                copy.id = this.maxId + 1;
                this.blocks.push(copy);

            },
            move_row_up_m(index) {
                if (index === 0) {
                    return
                }
                let rows = [this.blocks[index - 1], this.blocks[index]];
                this.blocks.splice(index - 1, 2, rows[1], rows[0]);
            },
            move_row_down_m(index) {
                if (index === this.blocks.length - 1) {
                    return
                }
                let rows = [this.blocks[index], this.blocks[index + 1]];
                this.blocks.splice(index, 2, rows[1], rows[0]);
            },

            addBlock(block) {
                this.blocks.splice(this.toindex + 1, 0, JSON.parse(JSON.stringify(block)))


            }
        },
        created() {

        },
        mounted() {
            this.tmplsw = JSON_Components
            HTTP.get('templates').then(r => {

                this.Savedtmplsw = r.data;

                this.Savedtmplsw.forEach(it => {
                    it.data = JSON.parse(JSON.parse(it.data));
                })
            })
        }
    }
</script>

<style>

    @import url('../../../styles/tproj.css');

    a {


        text-decoration: none !important;
    }

    .intersect {
        border-left: 5px solid #FFAB91;
        /*background-color: rgba(255, 171, 145, 0.1);*/

    }

    .intersect:before {
        opacity: .12;
    }

    /* хром, сафари */
    .non_scroll::-webkit-scrollbar {
        width: 0;
    }

    .icon_hov_orang:hover {
        /*border-bottom: 1px solid #FFAB91;*/
        /*box-shadow: 1px 1px 0 1px #FFAB91;*/
        color: #FFAB91;
    }

    /* ie 10+ */
    .non_scroll {
        -ms-overflow-style: none;
    }

    /* фф (свойство больше не работает, других способов тоже нет)*/
    .non_scroll {
        overflow: -moz-scrollbars-none;
    }

    .page-builder {

        text-align: left;
        width: 100%;
    }

    .sheet {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fab-container {
        position: absolute;
        bottom: -20px;
        top: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .select-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        cursor: pointer;
    }

    .block {

    }

    .hovered {
        opacity: 0;
    }

    .block:hover .hovered {
        opacity: 1;
    }

    .menuable__content__active:hover .hovered {
        opacity: 1;
    }

    .hover_outlined:hover {
        outline: 1px dotted black;
    }

    .activelistitem {
        border-right: 5px solid #FFAB91;


    }


</style>