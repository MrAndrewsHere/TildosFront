<template>

    <div class="t-editforms_team"
         style="height: 100%; visibility: visible; overflow: hidden auto; left: 0px; opacity: 1;">
        <div >
            <form onsubmit="return false;">
                <div class="pe-content__form-wrapper">
                    <div class="pe-content__savebtns-wrapper updatesavebuttons_content"
                         id="updatesaveeditrecordsettingsbuttons" style="position: relative;">
                        <table class="pe-content__savebtns-table"
                               style="width:100%;border-collapse: collapse;border-spacing: 0;">
                            <tbody>
                            <tr>
                                <td style="width:50%;">
                                    <button class="tbtn" style="width:100%; display: table-cell;"
                                            @click="$emit('save', record)">Сохранить
                                    </button>
                                </td>
                                <td style="width:50%;">
                                    <button class="tbtn tbtn-primary" style="width:100%; display: table-cell;"
                                            @click="$emit('saveandclose', record)">Сохранить и закрыть
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="edrec__wrapper panel-body editrecordcontent_container" style="padding: 15px;width: 100%;
    max-width: 720px;
    padding-top: 70px;
    padding-bottom: 100px;
    margin: 0 auto;">

                        <div v-for="(item,index) in record.fillable" :key="index">
                            <v-expansion-panels
                                    v-if="item instanceof Object"
                                    multiple
                                    accordion
                                    flat
                                    tile
                            >
                                <v-expansion-panel style="">
                                    <v-expansion-panel-header hide-actions
                                                              expand-icon="" class="pa-0">
                                        <div class="pe-form-group-title-wrapper"
                                             @click="tog($event)"
                                             style="width: 100%;margin:0"
                                             data-tpl-group="typography" id="grouptitle_typography"><span
                                                class="pe-form-group-title tsgrouptitle">{{item.name}}</span> <span
                                                class="pe-form-group-arrow "></span></div>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content v-if="item.type === 'dynamic'" class="px-3 pt-2"
                                                               style="border: 1px solid rgba(0,0,0,0.1);border-top:none;margin-top:-18px;border-radius: 4px">

                                        <div class="pe-list-item" data-listitem-id="1495646533382"
                                             v-for="(ttt,index2) in record.props.items" :key="index2"
                                             data-listitem-sort="10" data-listitem-off=""
                                             style="background-color:#efefef; padding:40px; margin:10px 0px; ">
                                            <div class="pe-list-item-title" style="padding:0px 0px 35px 0px;">
                                                <table style="width:100%; font-size:12px;">
                                                    <tbody>
                                                    <tr>
                                                        <td style="width:100%; letter-spacing:1px;white-space:nowrap;">
                                                            <b>Item <span class="pe-list-item-i">{{index2+1}}</span></b>
                                                        </td>
                                                        <td style="padding:0 10px;" @click="duplicate(index2)"><a
                                                                class="item_action">Дублировать</a>
                                                        </td>
                                                        <td class="pe-list-item-btn-offon" style="padding:0 10px;"
                                                            @click="hide(index2)"><a
                                                                class="item_action">{{ttt.hidden?'Включить':'Выключить'}}</a>
                                                        </td>
                                                        <td style="padding:0 10px;" @click="remove(index2)"><a
                                                                class="item_action">Удалить</a>
                                                        </td>
                                                        <td style="padding:0 10px;" @click="up(index2)"><a
                                                                class="item_action">Вверх</a></td>
                                                        <td style="padding:0 0 0 10px;" @click="down(index2)"><a
                                                                class="item_action">Вниз</a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <component v-if="item.component" :is="item.component"
                                                       :array="record.props.items[index2]" :newitem="record.props.newsubitem"></component>
                                            <itemcontent v-else v-for="(field,index5) in item.items" :key="index5"
                                                         :item="ttt[field]"></itemcontent>

                                        </div>
                                        <a @click="record.props.items.push(JSON.parse(JSON.stringify(record.props.newitem)))"
                                           class="pe-form-group-add-button"
                                           style="font-size:14px; width:100%; font-weight:600; text-align:center; text-transform:uppercase; background-color:#000; color:#fff !important; display:block; padding:20px 0px;">Добавить
                                        </a>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content v-if="item.type === 'usual'" class="px-3 pt-2"
                                                               style="border: 1px solid rgba(0,0,0,0.1);border-top:none;margin-top:-18px;border-radius: 4px">

                                        <div class="pe-list-item"
                                             v-for="(field,index8) in item.items" :key="index8"
                                        >

                                            <itemcontent :item="record.props[field]"></itemcontent>
                                        </div>

                                    </v-expansion-panel-content>
                                </v-expansion-panel>

                            </v-expansion-panels>


                            <itemcontent v-else-if="item instanceof Array" :item="record.props[item.first]"></itemcontent>

                            <itemcontent v-else :item="record.props[item]"></itemcontent>


                        </div>
                        <div v-if="record.component === 'formwrap'" class="pe-form-group__help-content pe-form-group__help-content_bottom">По закону владельцы
                            сайтов имеют право обрабатывать персональные данные клиентов только после их согласия,
                            поэтому мы рекомендуем разместить под формой предупреждающий текст со ссылкой на вашу
                            политику в отношении обработки персональных данных (можно разместить на отдельной странице).
                            <br><br>
                            Пример:«Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь
                            c политикой конфиденциальности»
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

</template>

<script>


    import itemcontent from "./itemcontent";
    import FormFieldCard from "./customization/ContentSettingsArrays/FormFieldCard";
    import MenuItemsCard from "./customization/ContentSettingsArrays/MenuItemsCard";

    export default {
        name: "contentsettings",
        components: {itemcontent, FormFieldCard,MenuItemsCard},
        props: ['block'],
        data: () => {
            return {
                uploadtoitem: '',
                record: []
            }
        },
        watch: {
            block: {
                handler() {
                    this.record = JSON.parse(JSON.stringify(this.block));

                },

            }
        },
        methods: {
            tog(e) {
                let list = document.getElementsByClassName('pe-form-group-arrow_open');
                if(list.length > 0)
                {
                    list.forEach(e =>   e.target.classList.toggle('pe-form-group-title-wrapper_open'));
                }
                e.target.classList.toggle('pe-form-group-title-wrapper_open')


                return
            },
            duplicate(index) {
                let copy = JSON.parse(JSON.stringify(this.record.props.items[index]));
                this.record.props.items.push(copy);
            },
            hide(index) {
                this.record.props.items[index].hidden = !this.record.props.items[index].hidden
            },
            up(index) {
                if (index === 0) {
                    return
                }
                let rows = [this.record.props.items[index - 1], this.record.props.items[index]];
                this.record.props.items.splice(index - 1, 2, rows[1], rows[0]);
            },
            down(index) {

                if (index === this.record.props.items.length - 1) {
                    return
                }
                let rows = [this.record.props.items[index], this.record.props.items[index + 1]];
                this.record.props.items.splice(index, 2, rows[1], rows[0]);

            },
            remove(index) {
                this.record.props.items.splice(index, 1)
            }


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

    .item_action:hover {
        color: orangered;
    }
</style>