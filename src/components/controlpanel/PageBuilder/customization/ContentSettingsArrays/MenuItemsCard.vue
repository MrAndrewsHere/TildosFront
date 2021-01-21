<template>
    <div>
        <span v-for="(item,index) in array" :key="index">

            <itemcontent :item="item" v-if="item.type"></itemcontent>



         </span>
        <v-expansion-panels   multiple
                              accordion
                              flat
                              tile>
            <v-expansion-panel style="border: 1px solid rgba(0,0,0,0.1);background-color:#efefef;">
                <v-expansion-panel-header hide-actions
                                          expand-icon="" class="pa-0" style="">
                    <div class="pe-form-group-title-wrapper"
                         @click="tog($event)"
                         style="width: 100%;margin:0;border: none"
                       ><span
                            class="pe-form-group-title tsgrouptitle">Подменю</span> <span
                            class="pe-form-group-arrow "></span></div>

                </v-expansion-panel-header>
                <v-expansion-panel-content class="px-3 "
                                           style="">
                    <div class="pe-menuitems-item-subitems-wrapper ui-sortable"
                         style=" padding:20px 30px;border: none ;text-align: center">
                        <div v-for="(subitem,indax) in array.subitems" :key="indax"
                                class="pe-menuitems-item-subitem" style="padding-bottom:0;"
                                data-listsubitem-id="0">
                            <table
                                    style="width:100%;">
                                <tbody>
                                <tr valign="top">


                                    <td
                                            width="calc(100%-26px)" class="pe-menuitems-item-td-link">
                                        <itemcontent :item="subitem.link" ></itemcontent>

                                    </td>
                                    <td
                                            width="25px" >
                                                     <span @click="  array.subitems.splice(indax, 1)" class="pe-menuitems-item-link-del"
                                                           style="padding-top:30px;cursor:pointer;display:block; color: red">
                                                         ×
                                                     </span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <v-btn   color="#ff855d"  depressed  @click="addnew">Добавить</v-btn>

                    </div>

                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>


</template>

<script>
    import Itemcontent from "../../itemcontent";

    export default {
        name: "MenuItemsCard",
        components: {Itemcontent},
        props: ['array','newitem'],
        methods:{
            tog(e) {
                e.target.classList.toggle('pe-form-group-title-wrapper_open')

                e.target.children[1].classList.toggle('pe-form-group-arrow_open')
                return
            },
            addnew(){
                let newitem  =  JSON.parse(JSON.stringify(this.newitem))


                return  this.array.subitems.push(newitem)


            }
        }
    }
</script>

<style scoped>

</style>