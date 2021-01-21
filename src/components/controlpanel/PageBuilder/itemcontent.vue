<template>

<div>

    <div v-if="item.hasOwnProperty('type')">
        <div class="pe-form-group"  v-if="item.type === 'select'" ><label class="pe-label">{{item.name}}</label>
            <div class="pe-select"><select class="pe-input pe-select" v-model="item.val" >
                <option v-for="(opt, optindex) in stack(item.stack)" :key="optindex" :value="opt.value"
                >{{opt.text}}
                </option>

            </select></div>
        </div>
        <!--        <div class="pe-form-group" v-if="item.type === 'select'"><label class="pe-label"></label>-->
        <!--            <div class="">-->
        <!--                <v-select color="#FFAB91" class="pe-input" hide-details :label="item.name"-->
        <!--                          v-model="item.val" :items="stack(item.stack)"></v-select>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="pe-form-group" v-if="item.type === 'parsetext'">

            <label class="pe-label">{{item.name}}</label>
            <div class=""><input type="text" name="buttontitle" class="pe-input" placeholder="" @change="item.val = parsetext($event,item.stack,'set')" :value="parsetext(item.val,item.stack,'get')">
                <div class="pe-hint" v-if="item.desc" style="padding: 0px;">{{item.desc}}</div>
            </div>
        </div>

        <div class="pe-form-group" v-if="item.type === 'text'"><label class="pe-label">{{item.name}}</label>
            <div class=""><input type="text" name="buttontitle" class="pe-input" placeholder="" v-model="item.val">
                <div class="pe-hint" v-if="item.desc" style="padding: 0px;">{{item.desc}}</div>
            </div>
        </div>
        <!--            <v-text-field color="#FFAB91" style="font-size: 16px;line-height: 1.556;" hide-details-->
        <!--                          v-if="item.type === 'text'" :label="item.name"-->
        <!--                          v-model="item.val"-->
        <!--            ></v-text-field>-->
        <div class="pe-form-group" v-if="item.type === 'link'" data-lid="1476968690512" data-lfield="li_link"><label
                class="pe-label">{{item.name}}</label>
            <div class="form-url-group">
                <input type="text"  class="pe-input" placeholder="Название"
                       v-model="item.linkname" style="width:100%;margin-bottom: 5px">

                <input type="text" class="pe-input" placeholder="Ссылка" v-model="item.val" @input=" item.val.startsWith('http')?item.linkinit='href':item.linkinit='route'" style="width:100%;">
                <div class="pe-field-link-more" style="margin-top:-2px;">
                    <div class="pe-target-div" data-lid="1476968690512" data-lfield="li_linktarget"
                         style="display:inline-block;"><label class="pe-label-checkbox pe-label-target"
                                                              style="padding-right:15px; font-size:11px;"> <input
                            type="hidden" name="li_linktarget" value=""
                            class="pe-input-target pe-cb-target-li_linktarget"> <input type="checkbox"
                                                                                       style="width:auto;padding-top: 10px"
                                                                                       v-model="item.target"
                                                                                       class="pe-cb-target pe-cb-target-li_linktarget">
                        <span class="pe-checkbox-title ml-1">В новом окне</span> </label></div>

                    <v-menu v-model="getlink" :close-on-content-click="false" absolute   :tile="true"
                            :offset-y="true" :offset-x="false"  z-index="6000">
                        <template v-slot:activator="{on,attr}">
                             <span v-on="on" v-bind="attr" class="pe-field-link-link-pg"
                                   style="padding-right:15px; font-size:11px; cursor:pointer;">Страница</span>
                        </template>
                        <v-list dense two-line>

                            <div class="pa-3" style="display: flex;justify-content: start">

                                <v-text-field @change="searchPage"
                                              prepend-icon="mdi-feature-search-outline" dense hide-details
                                              placeholder="URL или Заголовок" color="black"></v-text-field>
                            </div>
                            <v-list-item  v-for="(page,pageIndex) in filteredPages||pages" :key="pageIndex">
                                <v-list-item-content   style="cursor: pointer" @click="item.val='/'+page.url,item.pageid=page.id,item.linkinit='route',getlink = false    ">
                                    <v-list-item-title>{{page.title}}</v-list-item-title>
                                    <v-list-item-subtitle>{{page.url}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <span
                            class="pe-field-link-link-an" style="padding-right:15px; font-size:11px; cursor:context-menu;">Блок</span>
                </div>
            </div>
        </div>


        <div class="pe-form-group" v-if="item.type === 'textarea'"><label class="pe-label">{{item.name}}</label>
            <div class=""><textarea class="pe-input" style="min-height: 95px" :placeholder="item.desc"
                                    v-model="item.val"></textarea>
                <!--                <div class="pe-hint" v-if="item.desc" style="padding: 0px;">{{item.desc}}</div>-->
            </div>
        </div>
        <!--            <v-textarea color="#FFAB91" hide-details v-if="item.type === 'textarea'" :label="item.name"-->
        <!--                        v-model="item.val"></v-textarea>-->
        <v-checkbox  v-if="item.type === 'boolean'" color="black" class="ma-0" :value="item.val" :label="item.name" :placeholder="item.desc"
                     v-model="item.val"></v-checkbox>

        <v-card


                tile
                elevation="0"
                v-if="item.type === 'img'"
                style="background-color: transparent"

        >
            <v-list-item-content class="pa-0">

                <v-list-item-subtitle class="text-truncate">{{item.name}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item two-line class="px-0">

                <v-list-item-avatar
                        tile
                        width="100px"
                        height="80"
                        color="grey"
                        class="px-0"

                >
                    <v-img :src="item.val"></v-img>
                </v-list-item-avatar>


                <v-list-item-content class="pt-0">


                    <v-list-item-subtitle class="text-truncate"><a target="_blank" :href="item.val">{{printurl(item.val)}}</a>
                    </v-list-item-subtitle>
                </v-list-item-content>


            </v-list-item>
            <v-list-item-subtitle v-if="item === 'cov_img'" class="py-2">
                Отимальный размер фонового изображения 1680х900px
            </v-list-item-subtitle>

            <v-card-actions class="justify-space-between mx-0">
                <label @click="curit(item)" class="v-btn v-btn--contained theme--light v-size--small"
                       style="background-color:#FFAB91;color: black; cursor: pointer ">
                    <v-icon color="black">mdi-upload</v-icon>
                    <span class="v-btn__content font-weight-medium">Загрузить</span>
                    <input type="file" style="display: none" accept="image/jpg,image/jpeg,image/png,image/bmp"
                           @change="uploadFile($event)">
                </label>
                <v-btn text small disabled>
                    <v-icon color="black">mdi-folder-image</v-icon>
                    Библиотека
                </v-btn>
            </v-card-actions>
            <v-divider class="mx-2"></v-divider>
        </v-card>
    </div>
    <div v-else-if="item instanceof Object">
    <div  v-for="(setting,indm) in item" :key="indm">
        <itemcontent :item="setting"></itemcontent>
    </div>
    </div>

</div>

</template>

<script>
    import {HTTP} from "../../../axios";

    export default {
        name: "itemcontent",
        props: ['item'],
        data:()=>{
            return {
                getlink:false,
                filteredPages:null,
            }
        },
        computed:{

            pages:{
                get(){
                    return this.$store.getters.pagesList;
                }
            }
        },
        methods: {
            searchPage(event){
                if(event === '')
                {
                    this.filteredPages = null;
                    return
                }
                this.filteredPages = this.pages.filter(item => {
                    return item.url.includes(event) || item.title.includes(event)
                });
            },
            parsetext(value,method,func){
                switch (method) {
                    case 'parsemail':{
                        if(func === 'get')
                        {
                            if(value)
                            {
                                return value.join(';')
                            }
                           return value
                        }
                        else
                        {

                             return value.target.value.split(';');
                        }
                    }

                }


            },

            stack(type) {
                switch (type) {

                    case 'fieldtype': {
                        return [
                            {
                                text: 'Выберите тип', value: 'new'
                            },

                            {
                                text: 'Файл', value: 'file'
                            } ,
                            {
                                text: 'Поле для ввода в одну строку', value: 'linefield'
                            } ,
                            {
                                text: 'Поле для ввода в несколько строк', value: 'textarea'
                            },
                            {
                                text: 'Выпадающий список', value: 'select'
                            },
                            {
                                text: 'Вопрос с вариантами ответа', value: 'combobox'
                            },
                            {
                                text: 'Email', value: 'email'
                            },
                            {
                                text: 'Галочка', value: 'checkbox'
                            },
                            {
                                text: 'Отступ', value: 'space'
                            },
                        ]
                    }
                    case 'rowscount':{
                        return [
                            {
                                text: '1 строка',
                                value: '1'
                            },
                            {
                                text: '2 строки',
                                value: '2'
                            },
                            {
                                text: '3 строки',
                                value: '3'
                            },
                            {
                                text: '4 строки',
                                value: '4'
                            },
                            {
                                text: '5 строк',
                                value: '5'
                            },
                            {
                                text: '6 строк',
                                value: '6'
                            },
                            {
                                text: '7 строк',
                                value: '7'
                            },
                            {
                                text: '8 строк',
                                value: '8'
                            },  {
                                text: '9 строк',
                                value: '9'
                            },
                            {
                                text: '10 строк',
                                value: '10'
                            },

                        ]
                    }
                    case 'answertype': {
                        return [
                            {
                                text: 'Один вариант ответа (радиокнопки)',
                                value: 'single'
                            },
                            {
                                text: 'Несколько вариантов ответа (галочки)',
                                value: 'multiple'
                            },
                        ]
                    }

                }
            },
            printurl(url) {
                return url.split('/').pop().slice(-20);
            },


            curit(item) {
                this.uploadtoitem = item;
            },
            uploadFile(event) {
                this.loading = true;
                var postData = new FormData()
                postData.append('file', event.target.files[0])
                HTTP
                    .post('/files', postData)
                    .then(r => {
                        this.uploadtoitem.val = r.data.file.url
                        this.loading = false
                    })
            },
        }
    }
</script>

<style scoped>

    .item_action {
        color: gray;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 12px;
        padding: 6px;
        cursor: pointer;
    }
</style>