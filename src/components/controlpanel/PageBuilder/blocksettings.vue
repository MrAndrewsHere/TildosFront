<template>

    <div id="editforms" class="pe-container t-editforms_team"
         style="height: 100%; visibility: visible; left: 0px; opacity: 1;">
        <div class="pe-container-overflow">
            <div>
                <form  onsubmit="return false;" class="pe-settings-form">
                    <div class="pe-settings__form-wrapper">
                        <div class="pe-settings__savebtns-wrapper" id="updatesaveeditrecordsettingsbuttons"
                             style="position: fixed;">
                            <table class="pe-settings__savebtns-table" style="border-collapse: collapse;
    border-spacing: 0;">
                                <tbody>
                                <tr>
                                    <td>
                                        <button class="tbtn" style="width:160px; display: table-cell; font-size:14px;"
                                                @click="$emit('save', block)">Сохранить
                                        </button>
                                    </td>
                                    <td>
                                        <button class="tbtn tbtn-primary"
                                                style="width:161px; display: table-cell; font-size:14px;"
                                                @click="$emit('saveandclose', block)">Сохранить и закрыть
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="edrec__wrapper panel-body" style="width:290px; margin-top:45px;padding: 15px">
                            <v-text-field v-if="record" placeholder="id" label="ID Блока" color="black" :value="block.props.default.id || '#'" @change="block.props.default.id = changID($event)" ></v-text-field>
                            <div v-for="(item,itemindex) in block.settings" :key="itemindex">
                                <v-expansion-panels
                                        v-if="item instanceof Object"
                                        multiple
                                        accordion
                                        flat
                                        tile
                                >
                                    <v-expansion-panel style="margin-top: 5px">
                                        <v-expansion-panel-header hide-actions expand-icon="" class="pa-0">
                                            <div class="pe-form-group-title-wrapper"
                                                 @click="toggleExpansion($event)"
                                                 style="width: 100%;margin:0"
                                              >
                                                <span class="pe-form-group-title tsgrouptitle">
                                                    {{item.name}}
                                                </span>
                                                <span class="pe-form-group-arrow ">
                                                </span>
                                            </div>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="px-3 mt-1"
                                                                   style="border: 1px solid rgba(0,0,0,0.1);border-radius: 4px">
                                            <div v-if="item.values">
                                                <div v-for="(prop,index2) in item.values" :key="index2">

                                                    <div  v-for="(field,index3) in item.fields" :key="index3">


                                                        <itemsettings :item="block.props[prop][field]"></itemsettings>
                                                    </div>

                                                </div>
                                            </div>

                                            <div v-else>
                                                <div v-for="(field,index6) in item.fields" :key="index6">


                                                    <itemsettings :item="block.props[field]"></itemsettings>
                                                </div>
                                            </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>

                                <itemsettings v-else :item="block.props[item]"></itemsettings>

                            </div>
                            <br><br><br>
                        </div>
                       </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

    import itemsettings from "./itemsettings";

    export default {
        name: "blocksettings",
        components: {itemsettings},
        props: ['record'],
        data: () => {
            return {
                overlay: true,
                block: {},
            }
        },
        watch: {
            record: {
                handler() {
                    this.block = JSON.parse(JSON.stringify(this.record));

                },
            }
        },
        methods: {
            toggleExpansion(e) {
                e.target.classList.toggle('pe-form-group-title-wrapper_open')
                e.target.children[1].classList.toggle('pe-form-group-arrow_open')

            },
            changID(e){
                return !e.startsWith('#')? "#"+e : e;
            }
        },


    }
</script>

<style>

    .v-list-group__header:hover {
        background-color: white !important;
    }

    .v-expansion-panel-content__wrap {
        padding: 0;
    }

    .tbtn-primary {
        background-color: #ff855d !important;
    }

    .tbtn {
        height: 60px;
        font-weight: 400;
        background-color: #000;
        color: #fff;
        font-size: 16px;
        line-height: 56px;
        border: none;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 0;
        box-sizing: border-box;
        text-align: center;
        outline: none;
        white-space: nowrap;
        font-family: "tfutura";
        -webkit-font-smoothing: antialiased;
    }
</style>