<template>
    <div :class="record.props.tmplclass">

        <!--            Шапка-->
        <div class="t-section__container t-container" v-if="record.props.title.val || record.props.description.val">
            <div class="t-col t-col_12">
                <div :class="'t-section__topwrapper t-align_'+record.props.headeralign.val">
                    <textblock :tclass="'t-section__title t-title t-title_xs'"
                               :item="record.props.title"></textblock>
                    <textblock
                            :tclass=" record.props.headeralign.val==='right'?'t-section__descr t-descr t-descr_xl  t-margin_left_auto':(record.props.headeralign.val==='center'?'t-section__descr t-descr t-descr_xl  t-margin_auto':'t-section__descr t-descr t-descr_xl ') "
                            :item="record.props.description"></textblock>
                </div>
            </div>
        </div>
        <!--            Шапка-->

        <!--            Фильтр-->
        <div v-if="record.props.hasOwnProperty('filter') && record.props.filter.enable.val" class="t-feed__container t915__container " >
            <div class="js-feed-parts-select-container t-feed__container t-col t-col_100 " >
                <div class="t-feed__parts-switch-wrapper t-align_center">

                    <!--                            <div class="js-feed-parts-switcher t-feed__parts-switch-btn t-feed__parts-switch-btn_bg t-name t-name_xs t-menu__link-item"-->
                    <!--                                 data-feedpart-title="IT" data-feedpart-uid="861442446577">-->
                    <!--                                <a  style="color: white!important;background-color: black"-->
                    <!--                                    class="filteritem ">Применить</a>-->
                    <!--                            </div>-->
                    <div class="js-feed-parts-switcher t-feed__parts-switch-btn t-feed__parts-switch-btn_bg t-name t-name_xs t-menu__link-item"
                    >
                        <a  style="color: white!important;background-color: black"
                            class="filteritem " @click="filterparam = []">Сбросить</a>
                    </div>


                    <div v-for="(filter, index2) in parseFilFields(record.props.filter.fields.val)" :key="index2" class="js-feed-parts-switcher t-feed__parts-switch-btn t-feed__parts-switch-btn_bg t-name t-name_xs t-menu__link-item"
                         data-feedpart-title="IT" data-feedpart-uid="861442446577">
                        <v-menu


                                :open-on-hover="true" :tile="true"
                                :close-on-content-click="false"
                                :offset-y="true" :offset-x="false"






                        >
                            <template v-slot:activator="{on,attr}">

                                <a v-on="on" v-bind="attr"
                                   class="filteritem">{{filter}}</a>



                            </template>
                            <v-card  >


                                <v-list >


                                    <v-list-item v-for="(val,ind) in filterValues(filter)" :key="ind">
                                        <v-checkbox color="black" multiple v-model="filterparam[index2]" :value="val" class="checkboxitem" dense hide-details  :label="val.split(':')[1]"></v-checkbox>
                                    </v-list-item>


                                </v-list>


                            </v-card>


                        </v-menu>
                    </div>


                </div>
            </div>
        </div>
        <!--            Фильтр-->



        <!--                            Список-->


        <auto-row-count v-if="record.props.colcount"
                        :colcount="record.props.colcount"
                        :items="record.props.filter.enable.val?filter(filterparam):record.props.items"
                        :tmplclass="record.props.tmplclass"
                        :align="record.props.itemsStyle.align.val"
                        :styles="{vmargin: record.props.itemsStyle.vmargin}"
        >
            <template v-slot:listItemContent="{item}">
                <component :is="record.code" :item="item" :itemstlyes="record.props.itemsStyle"></component>
            </template>
            <template v-slot:separator>
                <div v-if="record.props.itemsStyle.hasOwnProperty('itemcontentmarginbottom')"  :class="'t-clear '+record.props.tmplclass+'__separator'" :style="{'margin-bottom':record.props.itemsStyle.itemcontentmarginbottom.val}"></div>
            </template>
        </auto-row-count>

        <component v-else :is="record.code" :props="record.props" ></component>

        <!--            Список-->


        <!--            Кнопка-->

        <div class="t-section__container t-container" v-if="record.props.hasOwnProperty('btn') && record.props.btn.val">
            <div class="t-col t-col_12">
                <div class="t-section__bottomwrapper t-clear t-align_center ">
                    <a href="/" target="_blank" :class="'t-btn '+record.props.btn.size.val"
                       :style="computeStyle(record.props.btn)">
                        <table style="width:100%; height:100%;">
                            <tbody>
                            <tr>
                                <td>{{record.props.btn.val}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </a>
                </div>
            </div>
        </div>
        <!--            Кнопка-->
    </div>
</template>

<script>
    import FR02 from "./FR02";
    import FR01 from "./FR01";
    import Textblock from "../textblock";

    import TE01 from "../TE/TE01";
    import AutoRowCount from "../autoRowCount";
    import {forstyles} from "../../mixins/ComponentMethods";

    export default {
        name: "listwrap",
        props: ['record'],
        mixins:[forstyles],
        components: {
            AutoRowCount,

            Textblock,
            FR01,
            FR02,
            TE01
        },


        data: () => {

            return {
                values: [],
                filtered:[],
                filterparam:[],
                value: null,}
        },
        methods:{
            parseFilFields(val){
              let spl = val.split(',');
              Object.assign( this.filtered,spl)


             return spl;
            },

            filter(array){
                if(!array || array.length===0){return this.record.props.items}

                let filtereitems =   this.record.props.items.filter((element)=>{

                   return element.filterField.val.split(',').some((itemField)=>{
                        return array.some((arrayField => {
                            return arrayField.some(el => {
                                return itemField.toLowerCase() === el
                            })
                        }));
                    });



                });
                return  filtereitems.length > 0?filtereitems: this.record.props.items;

            },

            filterValues(val){


                const values = [];
                 this.record.props.items.forEach((element)=>{
                     var finded = element.filterField.val.split(',').find(el=>el.includes(val));

                    return finded?values.push(finded):'';
                });

                return this.removeDuplicates(values);
            },
            removeDuplicates(array){
                let uninque = [];
                array.forEach(el => {
                    if(!uninque.includes(el.toLowerCase())){
                        uninque.push(el.toLowerCase());
                    }
                });
                return uninque;
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .t-feed__parts-switch-btn {
        font-size: 16px;
        font-weight: 300;

        border-radius: 10px;
    }
    .checkboxitem{
        text-transform: capitalize!important;
    }
    .filteritem {
        text-transform: capitalize!important;
         color: #000000!important;
         padding: 6px 18px 6px!important;
       border: 1px solid #000000!important;
     }

</style>