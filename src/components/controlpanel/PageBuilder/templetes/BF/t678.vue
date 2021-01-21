<template>
    <div class="t678">

        <div class="t-section__container t-container" v-if="props.title.val || props.descr.val">
            <div class="t-col t-col_12">
                <div class="t-section__topwrapper t-align_center">
                    <textblock :item="props.title" tclass="t-section__title t-title t-title_xs"></textblock>
                    <textblock :item="props.description" tclass="t-section__descr t-descr t-descr_xl"></textblock>

                </div>
            </div>
        </div>
        <div class="t-container">
            <div :class="'t-col t-col_'+props.tcol.val+' t-prefix_'+props.tprefix.val">
                <div>

                    <div class="t-form t-form_inputs-total_9 ">
                        <!-- NO ONE SERVICES CONNECTED -->

                        <div class="js-successbox t-form__successbox t-text t-text_md"
                             style="display:none;"></div>

                        <div class="t-form__inputsbox">


                            <div v-for="(field,indexfield) in props.items" :key="indexfield">
                                <div class="t-input-group t-input-group_in"
                                     v-if="field.type.val === 'linefield' || field.type.val === 'email'"
                                >
                                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no"
                                         style="">{{field.title.val}}
                                    </div>
                                    <div v-if="field.subtitle.val"
                                         class="t-input-subtitle t-descr t-descr_xxs t-opacity_70"
                                         style="">{{field.subtitle.val}}
                                    </div>
                                    <div class="t-input-block">
                                        <input type="text" :name="field.varname.val" class="t-input js-tilda-rule "
                                               v-model="field.val"
                                               :placeholder="field.placeholder.val"
                                               :required="field.require.val"
                                               style="color:#000000; border:1px solid #000000;  ">
                                        <div class="t-input-error"></div>
                                    </div>
                                </div>

                               <file-uploader v-if="field.type.val === 'file'" :field="field"></file-uploader>

                                <div v-if="field.type.val === 'select'" class="t-input-group t-input-group_sb">
                                    <div class="t-input-title t-descr t-descr_md"
                                    >{{field.title.val}}
                                    </div>
                                    <div v-if="field.subtitle.val"
                                         class="t-input-subtitle t-descr t-descr_xxs t-opacity_70"
                                         style="">{{field.subtitle.val}}
                                    </div>
                                    <div class="t-input-block">
                                        <div class="t-select__wrapper ">
                                            <select :name="field.varname.val" class="t-select js-tilda-rule "
                                                    style="color:#000000; border:1px solid #000000;  "
                                                    v-model="field.val">

                                                <option v-if="field.li_selfirstvar.val"
                                                        :selected=" !field.li_defselitem.val &&  field.li_selfirstvar.val"
                                                        value="">{{field.li_selfirstvar.val}}
                                                </option>
                                                <option
                                                        v-for="(opt,optindex) in field.li_variants.val.split('\n')"
                                                        :key="optindex"
                                                        :value="opt"
                                                        :selected=" (optindex+1) === field.li_defselitem.val"
                                                >
                                                    {{opt}}
                                                </option>

                                            </select>
                                        </div>
                                        <div class="t-input-error"></div>
                                    </div>
                                </div>

                                <div v-if="field.type.val === 'combobox'" class="t-input-group t-input-group_rd">
                                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no"
                                         style="">{{field.title.val}}
                                    </div>
                                    <div v-if="field.subtitle.val"
                                         class="t-input-subtitle t-descr t-descr_xxs t-opacity_70"
                                         style="">{{field.subtitle.val}}
                                    </div>
                                    <div class="t-input-block">

                                        <div v-if="field.li_radcb.val === 'single'" class="t-radio__wrapper">
                                            <v-radio-group v-model="field.val" :mandatory="true">
                                                <v-radio v-for="(opt,optindex) in field.li_variants.val.split('\n')"
                                                         :key="optindex"
                                                         :label="opt" :value="opt"
                                                         hide-details color="black" style="font-family: 'PT Sans', Arial, sans-serif;
    font-weight: 500;color: #000000;font-size: 15px;
    line-height: 1.55; text-transform: capitalize "
                                                ></v-radio>

                                            </v-radio-group>

                                        </div>


                                        <div v-if="field.li_radcb.val === 'multiple'" class="t-checkboxes__wrapper">
                                            <v-checkbox multiple
                                                        v-for="(opt,optindex) in field.li_variants.val.split('\n')"
                                                        :key="optindex"
                                                        hide-details color="black" style="font-family: 'PT Sans', Arial, sans-serif;
    font-weight: 500;color: #000000;font-size: 15px;
    line-height: 1.55; text-transform: capitalize "
                                                        v-model="field.val" :label="opt" :value="opt"></v-checkbox>
                                        </div>

                                        <div class="t-input-error"></div>
                                    </div>
                                </div>

                                <div v-if="field.type.val === 'textarea'" class="t-input-group t-input-group_ta">
                                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no"
                                         style="">{{field.title.val}}
                                    </div>
                                    <div v-if="field.subtitle.val"
                                         class="t-input-subtitle t-descr t-descr_xxs t-opacity_70"
                                         style="">{{field.subtitle.val}}
                                    </div>
                                    <div class="t-input-block">
                                            <textarea :name="field.varname.val" class="t-input js-tilda-rule "
                                                      :placeholder="field.placeholder.val"
                                                      v-model="field.val"
                                                      :style="{'color':'#000000','border':'1px solid #000000','height':34*field.rowscount.val+'px'}"
                                                      :rows="field.rowscount.val"></textarea>
                                        <div class="t-input-error"></div>
                                    </div>
                                </div>


                                <div v-if="field.type.val === 'checkbox'" class="t-input-group t-input-group_cb">
                                    <div class="t-input-title t-descr t-descr_md" data-redactor-toolbar="no"
                                         style="">{{field.title.val}}
                                    </div>
                                    <div v-if="field.subtitle.val"
                                         class="t-input-subtitle t-descr t-descr_xxs t-opacity_70"
                                         style="">{{field.subtitle.val}}
                                    </div>
                                    <div class="t-input-block">
                                        <v-checkbox class="ma-0"


                                                    hide-details color="black" style="font-family: 'PT Sans', Arial, sans-serif;
    font-weight: 500;color: #000000;font-size: 15px;
    line-height: 1.55; text-transform: capitalize "
                                                    v-model="field.val" :label="field.chb_label.val"
                                                    :value="field.def_val.val"></v-checkbox>
                                    </div>
                                </div>

                                <div v-if="field.type.val === 'space'" class="t-input-group t-input-group_ws">
                                    <div class="t-input-block">
                                        <div class="" :style="{'height':34*field.rowscount.val+'px'}">&nbsp;</div>
                                        <div class="t-input-error"></div>
                                    </div>
                                </div>
                            </div>


                            <div class="t-form__errorbox-middle">
                                <div class="js-errorbox-all t-form__errorbox-wrapper" style="display:none;">
                                    <div class="t-form__errorbox-text t-text t-text_md">
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-all"></p>
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-req"></p>
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-email"></p>
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-name"></p>
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-phone"></p>
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-minlength"></p>
                                        <p class="t-form__errorbox-item js-rule-error js-rule-error-string"></p>
                                    </div>
                                </div>
                            </div>

                            <div class="t-form__submit">
                                <button   @click="$emit('submit')" type="submit" class="t-submit"
                                        style="color:#ffffff;background-color:#000000;"  v-html="props.submitBtn.val">
                                </button>
                            </div>

                        </div>

                        <div class="t-form__errorbox-bottom">
                            <div class="js-errorbox-all t-form__errorbox-wrapper" style="display:none;">
                                <div class="t-form__errorbox-text t-text t-text_md">
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-all"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-req"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-email"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-name"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-phone"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-minlength"></p>
                                    <p class="t-form__errorbox-item js-rule-error js-rule-error-string"></p>
                                </div>
                            </div>
                        </div>


                    </div>


                </div>

                <textblock v-if="props.textunderform" :item="props.textunderform"
                           tclass="t678__form-bottom-text t-text t-text_xs"></textblock>

            </div>

        </div>

    </div>
</template>

<script>
    import textblock from "../textblock";
    import FileUploader from "./fileUploader";

    export default {
        name: "t678",
        components: {FileUploader, textblock},
        props: ['props'],
        methods:{

        }
    }
</script>

<style scoped>


</style>