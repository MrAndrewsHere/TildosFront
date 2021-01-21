<template>
    <div id="for_redactor_toolbar" :hidden="!open"
         style="position: fixed; top: 0px; left: 0px; height: 60px; width: 100%; z-index: 2000; background-color: rgb(255, 255, 255); opacity: 1;">

        <button @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Жирный" class="toolbar__button ql-bold" type="button">
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Жирный</span></div>
        </button>
        <button @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Курсив" class="toolbar__button ql-italic" type="button">
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Курсив</span></div>
        </button>
        <button @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Подчеркивание" class="toolbar__button ql-underline" type="button">
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Подчеркивание</span></div>
        </button>
        <button @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Зачеркнуто" class="toolbar__button ql-strike" type="button">
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Зачеркнуто</span></div>
        </button>
        <v-menu

                v-model="linkmenu"
                :close-on-content-click="false"
                max-width="320px"
                min-width="320px"

                offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <button  @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Ссылка" v-bind="attrs"
                         v-on="on" class="toolbar__button ql-link_custom" @click="opensubmenu()" type="button">
                    <div class="toolbar__button__hint" name="hint" style="display: none"><span>Ссылка</span></div>
                </button>
            </template>

            <v-card elevation="0" class="pt-2">
                <v-list>
                    <v-list-item>
                        <label class="quill-link-popup__label">
                            <div class="quill-link-popup__label__title">Укажите ссылку</div>
                            <input v-model="linkConf.url" autocomplete="off" name="url" class="quill-link-popup__input" type="text">
                        </label>
                    </v-list-item>
                    <v-list-item>
                        <label class="quill-link-popup__label">
                            <div class="quill-link-popup__label__title">Текст</div>
                            <input v-model="linkConf.text" name="text" class="quill-link-popup__input" type="text"> </label>
                    </v-list-item>
                    <v-list-item>
                        <label class="quill-link-popup__label quill-link-popup__label_cb"> <input  v-model="linkConf.blank"
                                                                                                   class="quill-link-popup__input quill-link-popup__input_checkbox"
                                                                                                   type="checkbox">
                            <span class="quill-link-popup__label__text">Открыть ссылку в новой вкладке</span>
                        </label>
                    </v-list-item>
                    <v-list-item>
                        <div  class="quill-link-popup__settings " style="width: 100%">
                            <div class="quill-link-popup__settings__header" @click="togglelink($event)">Цвет и стиль ссылки</div>
                            <div class="quill-link-popup__settings__body">
                                <div class="quill-link-popup__settings__visual">
                                    <div style="margin-right: 3px" class="quill-link-popup__settings__section">
                                        <div class="quill-link-popup__label__text">Текст <span
                                                class="quill-link-popup__label__text__colored">цвет</span></div>
                                        <div class="quill-link-popup__label__row"><label
                                                class="quill-link-popup__label quill-link-popup__label_color">
                                            <v-menu v-model="linktextcolormenu" offset-y :close-on-content-click="false">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <input v-model="linkConf.textcolor" style="font-size: 12px"  v-bind="attrs" :autocomplete="false"
                                                           v-on="on"  class="quill-link-popup__input" type="text">

                                                </template>
                                                <v-card>
                                                    <v-color-picker v-model="linkConf.textcolor"

                                                                    flat
                                                    ></v-color-picker>
                                                    <!--                                                           <button class="quill-popup__btn quill-popup__btn_action">Применить</button>-->
                                                    <v-card-actions>

                                                        <v-spacer></v-spacer>
                                                        <v-btn tile text depressed  small @click="linktextcolormenu = false,linkConf.textcolor='#ff8562' ">Отмена</v-btn>
                                                        <v-btn tile  depressed color="#ff7d4a" small @click="linktextcolormenu = false">Применить</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-menu>

                                        </label></div>
                                    </div>
                                    <div class="quill-link-popup__settings__section">
                                        <div class="quill-link-popup__label__text">Линия <span
                                                class="quill-link-popup__label__text__colored">цвет и толщина</span>
                                        </div>
                                        <div class="quill-link-popup__label__row">
                                            <label style="margin-right: 3px"
                                                   class="quill-link-popup__label quill-link-popup__label_line-color">
                                                <label
                                                        class="quill-link-popup__label quill-link-popup__label_line">
                                                    <v-menu v-model="linkbordercolormenu" offset-y :close-on-content-click="false">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <input style="font-size: 12px" v-model="linkConf.bordercolor"  v-bind="attrs" :autocomplete="false"
                                                                   v-on="on"  class="quill-link-popup__input" type="text">

                                                        </template>
                                                        <v-card>
                                                            <v-color-picker v-model="linkConf.bordercolor"

                                                                            flat
                                                            ></v-color-picker>
                                                            <!--                                                           <button class="quill-popup__btn quill-popup__btn_action">Применить</button>-->
                                                            <v-card-actions>

                                                                <v-spacer></v-spacer>
                                                                <v-btn tile  depressed  small @click="linkbordercolormenu=false,linkConf.bordercolor='#ff8562'">Отмена</v-btn>
                                                                <v-btn tile text depressed color="#ff7d4a" small @click="linkbordercolormenu=false">Применить</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-menu>
                                                </label>
                                            </label>
                                            <label
                                                    class="quill-link-popup__label quill-link-popup__label_line">
                                                <select style="font-size: 12px" v-model="linkConf.borderweight" name="line_width" class="quill-link-popup__input">
                                                    <option selected=""></option>
                                                    <option value="0px">0px</option>
                                                    <option value="1px">1px</option>
                                                    <option value="2px">2px</option>
                                                    <option value="3px">3px</option>
                                                    <option value="4px">4px</option>
                                                    <option value="5px">5px</option>
                                                    <option value="6px">6px</option>
                                                    <option value="7px">7px</option>
                                                    <option value="8px">8px</option>
                                                    <option value="9px">9px</option>
                                                    <option value="10px">10px</option>
                                                    <option value="15px">15px</option>
                                                    <option value="20px">20px</option>
                                                </select> </label>
                                        </div>
                                    </div>
                                </div>
                                <label class="quill-link-popup__label quill-link-popup__label_cb quill-link-popup__label_rel">
                                    <input name="rel_nofollow" v-model="linkConf.rel"
                                           class="quill-link-popup__input quill-link-popup__input_checkbox"
                                           type="checkbox"> <span class="quill-link-popup__label__text">Rel nofollow: ссылка не передает вес странице на которую ссылается</span>
                                </label></div>

                        </div>
                    </v-list-item>
                    <v-list-item class="mt-2">
                        <button class="quill-popup__btn quill-popup__btn_action" @click="dolink">Применить</button>
                    </v-list-item>
                </v-list>



            </v-card>
        </v-menu>


        <button style="display: none"  @mouseover="displayhint($event)" @mouseleave="nonehint($event)"   data-name="Нумерованный список" class="toolbar__button ql-list" value="ordered" type="button"
        >
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Нумерованный список</span></div>
        </button>
        <button style="display: none"  @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Маркированный список" class="toolbar__button ql-list" type="button"
        >
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Маркированный список</span></div>
        </button>
        <v-menu offset-y :close-on-content-click="false" v-model="textcolormenu">
            <template v-slot:activator="{ on, attrs }">
                <button  v-bind="attrs" v-on="on"   @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Цвет текста" class="toolbar__button ql-color_custom" type="button">
                    <div class="toolbar__button__hint" name="hint" style="display: none"><span>Цвет текста</span></div>
                </button>


            </template>
            <v-card flat tile elevation="0">
                <v-color-picker v-model="textcolor"

                                flat tile
                ></v-color-picker>
                <v-list-item>
                    <v-text-field color="#ff7d4a"  v-model="textcolor">
                    </v-text-field>
                </v-list-item>
                <!--                                                           <button class="quill-popup__btn quill-popup__btn_action">Применить</button>-->
                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn tile text depressed  small @click="textcolormenu = false,textcolor='#000000FF'">Отмена</v-btn>
                    <v-btn tile  depressed color="#ff7d4a" small @click="docolor">Применить</v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>

        <button @mouseover="displayhint($event)" @mouseleave="nonehint($event)" data-name="Жирность текста" class="toolbar__button ql-weight_custom quill-dropdown"
                type="button" @click="toggledropdown($event)">
            <div class="quill-dropdown__container">
                <div class="quill-dropdown__item" v-for="(item,index) in lineWeightwhitelist" :key="index"
                     :value="item" @click="execcommand('weight_my_custom',item)">{{item}}
                </div>

                <div class="quill-dropdown__item" @click="execcommand('weight_my_custom','initial')" value="">
                    Убрать жирность
                </div>
            </div>
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Жирность текста</span></div>
        </button>

        <button  @mouseover="displayhint($event)" @mouseleave="nonehint($event)" data-name="Шрифт" class="toolbar__button ql-font_custom quill-dropdown" type="button"
                 @click="toggledropdown($event)">
            <div class="quill-dropdown__container">
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','PT Sans')"
                     value="PT Sans">PT Sans
                </div>
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','Arial')" value="Arial">
                    Arial
                </div>
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','Georgia')"
                     value="Georgia">Georgia
                </div>
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','Courier New')"
                     value="Courier New">Courier New
                </div>
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','Times New Roman')"
                     value="Courier New">Times New Roman
                </div>
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','Impact')"
                     value="Courier New">Impact
                </div>
                <div class="quill-dropdown__item" @click="execcommand('font_my_custom','')" value="remove">
                    Очистить шрифт
                </div>
                <!--                        <div class="quill-dropdown__item"><a href="/projects/settings/?projectid=2503285" target="_blank"-->
                <!--                                                             style="font-size:11px; color:#777; font-family:Georgia;padding-left: 30px;display:inline-block;"><img-->
                <!--                                style="float: left;margin-left: -30px;margin-right: 5px;"-->
                <!--                                src="https://static.tildacdn.com/img/attention_icon.png">Выбрать шрифт из полной коллекции-->
                <!--                            шрифтов и подключить свой шрифт можно в настройках сайта</a></div>-->
            </div>
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Шрифт</span></div>
        </button>
        <button  @mouseover="displayhint($event)" @mouseleave="nonehint($event)"
                 data-name="Размер текста" class="toolbar__button ql-size_custom quill-dropdown"
                 @click="toggledropdown($event)" type="button">
            <div class="quill-dropdown__container">
                <div class="quill-dropdown__item" v-for="(item,index) in fontSizewhitelist" :key="index"
                     :value="item" @click="execcommand('size',item)">{{item}}
                </div>

                <div class="quill-dropdown__item" @click="execcommand('size','')" value="">Вернуть размер по
                    умолчанию
                </div>
            </div>
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Размер текста</span></div>
        </button>
        <button  @mouseover="displayhint($event)" @mouseleave="nonehint($event)"  data-name="Межстрочное расстояние" class="toolbar__button ql-lineheight_custom quill-dropdown"
                 @click="toggledropdown($event)"
                 type="button">
            <div class="quill-dropdown__container">
                <div class="quill-dropdown__item" v-for="(item,index) in LineHeightwhitelist" :key="index"
                     :value="item" @click="execcommand('lineheight',item)">{{item}}
                </div>
                <div class="quill-dropdown__item" @click="execcommand('lineheight','')" value="">Очистить</div>

            </div>
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Межстрочное расстояние</span></div>
        </button>
        <button  @mouseover="displayhint($event)" @mouseleave="nonehint($event)" data-name="Выравнивание" class="toolbar__button ql-align_custom quill-dropdown"
                 @click="toggledropdown($event)" type="button">
            <div class="quill-dropdown__container">
                <div class="quill-dropdown__item" @click="execcommand('align_custom','left')" value="left">
                    Выравнять текст влево
                </div>
                <div class="quill-dropdown__item" @click="execcommand('align_custom','center')" value="center">
                    Выравнять текст по центру
                </div>
                <div class="quill-dropdown__item" @click="execcommand('align_custom','right')" value="right">
                    Выравнять текст вправо
                </div>
            </div>
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Выравнивание</span></div>
        </button>
        <!--                <button data-name="Типограф" class="toolbar__button ql-typograph_custom" type="button"></button>-->
        <button @mouseover="displayhint($event)" @mouseleave="nonehint($event)" data-name="Очистить стили" @click="removeformate" class="toolbar__button ql-clean_custom"
                type="button">
            <div class="toolbar__button__hint" name="hint" style="display: none"><span>Очистить стили</span></div>
        </button>


        <div id="rightfontinfo"
             style="position:absolute; z-index:2060;top:0px;right:15px; height:60px; line-height:60px; font-size:11px; opacity:0.7;">
            <span id="size_info"></span>, <span id="font_info"></span>
        </div>
    </div>
</template>

<script>
    import Quill from "quill";

    export default {
        name: "WYSIWYG",


        data: () => {
            return {
                editor: null,
                open: false,
                current: '',
                linkConf:{
                    url:'',
                    text:'',
                    blank:false,
                    textcolor:'#ff8562',
                    bordercolor:'#ff8562',
                    borderweight:null,
                    rel:false,
                },

                textcolor:'#000000FF',
                textcolormenu:false,
                linktextcolormenu:false,
                linkmenu:false,
                linkbordercolormenu:false,
                fontSizewhitelist: [
                    '',
                    '14px',
                    '16px',
                    '18px',
                    '20px',
                    '22px',
                    '24px',
                    '26px',
                    '28px',
                    '30px',
                    '32px',
                    '34px',
                    '36px',
                    '38px',
                    '40px',
                    '42px',
                    '44px',
                    '46px',
                    '48px',
                    '50px',
                    '52px',
                    '54px',
                    '56px',
                    '58px',
                    '60px',
                    '62px',
                    '64px',
                    '66px',
                    '68px',
                    '70px',
                    '72px',
                    '74px',
                    '76px',
                    '78px',
                    '80px',
                    '82px',
                    '84px',
                    '86px',
                    '88px',
                    '92px',
                    '102px'
                ],
                LineHeightwhitelist: [
                    '',
                    '14px',
                    '16px',
                    '18px',
                    '20px',
                    '22px',
                    '24px',
                    '26px',
                    '28px',
                    '30px',
                    '32px',
                    '34px',
                    '36px',
                    '38px',
                    '40px',
                    '42px',
                    '44px',
                    '46px',
                    '48px',
                    '50px',
                    '52px',
                    '54px',
                    '56px',
                    '58px',
                    '60px',
                    '62px',
                    '64px',
                    '66px',
                    '68px',
                    '70px',
                    '72px',
                    '74px',
                    '76px',
                    '78px',
                    '80px',
                    '82px',
                    '84px',
                    '86px',
                    '88px',
                    '90px',


                ],
                lineWeightwhitelist: [
                    '100',
                    '300',
                    '400',
                    '500',
                    '600',
                    '700',


                ],
            }
        },

        computed:{
            reinit:{
                get(){return this.$store.getters.reQuill;},
                set(){}
            },
            redactor:{
                get(){return this.$store.getters.redactor;},
                set(){}
            }
        },

        watch:{
            reinit(){
                this.reQuill();
            }
        },


        methods: {
            opensubmenu(){
                this.linkConf.text = document.getSelection().toString()
            },
            dolink(){
                if(this.editor && this.linkConf.url)
                {
                    let style = "color:"+this.linkConf.textcolor+";";
                    if(this.linkConf.borderweight)
                    {
                        style+="border-bottom:"+this.linkConf.borderweight+" solid "+this.linkConf.bordercolor;
                    }
                    this.editor.format('mylink',
                        {


                            href:this.linkConf.url,
                            target:this.linkConf.blank?'_blank':'',
                            rel:this.linkConf.rel?'noopener noreferrer':'',
                            style:style,
                        });
                }
                this.linkmenu = false;
                this.linkConf = {
                    url:'',
                    text:'',
                    blank:false,
                    textcolor:'#ff8562',
                    bordercolor:'#ff8562',
                    borderweight:null,
                    rel:false,
                };
            },

            docolor(){

                if(this.editor && this.textcolor)
                {
                    this.editor.format('color_my_custom',this.textcolor)
                    this.textcolor = '#000000FF'
                }
                this.textcolormenu = false;
            },

            displayhint(e){

                let el =   e.target.children.namedItem('hint');
                if(el)
                {
                    el.style.display = 'flex';
                }


            },
            nonehint(e){

                e.target.children.namedItem('hint').style.display = 'none'

            },
            togglelink(e){
                e.target.parentNode.classList.toggle('quill-link-popup__settings_show');
            },
            execcommand(command, value) {
                if (this.editor) {
                    this.editor.format(command, value ? value : true);
                    if(command === 'size')
                    {

                        this.editor.format('fontclass','QuillFontClass');
                        this.editor.format('fontsizedata',value);
                    }
                    if(command === 'lineheight')
                    {
                        this.editor.format('fontclass','QuillFontClass');
                        this.editor.format('lineheightdata',value);
                    }
                }
            },
            aligntext(value) {
                this.editor.formatLine(0, this.editor.getSelection().length, 'align', value);
            },
            removeformate() {
                if (this.editor) {

                    this.editor.removeFormat(this.editor.getSelection());
                }
            },


            deleteall(){



                let list = document.getElementsByClassName('quill-dropdown_shown');
                if (list.length > 0) {
                    list[0].classList.toggle('quill-dropdown_shown');
                }
                this.open = false;
                document.getElementById('QuillEditor').innerHTML = document.getElementById('QuillEditor').firstChild.innerHTML;


                document.getElementById('QuillEditor').classList.remove('ql-container');
                document.getElementById('QuillEditor').classList.remove('ql-snow');
                document.getElementById('QuillEditor').classList.add('changed');
                document.getElementById('QuillEditor').id=''
                this.editor = null;
                this.$store.dispatch('disableQuill')

            },

            deletecontainer() {

                let list = document.getElementsByClassName('quill-dropdown_shown');
                if (list.length > 0) {
                    list[0].classList.toggle('quill-dropdown_shown');
                }
                this.open = false;

                this.editor = null;
                this.$store.dispatch('disableQuill')



            },

            toggledropdown(e) {
                if (e.target.classList.contains('quill-dropdown_shown')) {
                    e.target.classList.toggle('quill-dropdown_shown');

                } else {
                    var list = document.getElementsByClassName('quill-dropdown_shown');
                    if (list.length > 0) {
                        list[0].classList.toggle('quill-dropdown_shown')
                    }
                    e.target.classList.toggle('quill-dropdown_shown');
                }

            },

            reQuill() {




                if (this.editor) {
                    this.deletecontainer();
                }
                this.open = true;


                this.editor = new Quill('#QuillEditor', {
                    modules: {
                        toolbar: {
                            container: '#for_redactor_toolbar',
                        },
                    },
                });
                // document.getElementsByClassName('quill-dropdown').forEach(e=>{e.addEventListener('click',(e)=>{
                //
                // })})


                // this.editor.root.innerHTML = html;
                // We will add the update event here
                // this.editor.on('text-change', () => {console.log('updeted')});
                this.editor.on('selection-change', (range) => {
                    if (range) {
                        if (this.editor) {
                            let info = this.editor.getFormat();
                            let sizeinfo = Number(window.getComputedStyle(document.getElementById('QuillEditor')).getPropertyValue('font-size').match(/\d+/)[0]) + 'px';
                            let fontinfo = window.getComputedStyle(document.getElementById('QuillEditor')).getPropertyValue('font-family')


                            if (info) {

                                info.size ? sizeinfo = info.size : '';
                                info.font_my_custom ? fontinfo = info.font_my_custom : '';
                                // info.color_my_custom? this.textcolor=info.color:'';
                            }

                            document.getElementById('size_info').innerText = sizeinfo
                            document.getElementById('font_info').innerText = fontinfo

                        }


                    }
                });
                this.$store.dispatch('enableQuill');
            },
            initQuillConfig(){
                var Size = Quill.import('attributors/style/size');
                Size.whitelist = this.fontSizewhitelist;
                Quill.register(Size, true);

                var Parchment = Quill.import('parchment');

                var lineHeightConfig = {
                    scope: Parchment.Scope.INLINE,
                    whitelist: this.LineHeightwhitelist

                };
                var lineHeightStyle = new Parchment.Attributor.Style('lineheight', 'line-height', lineHeightConfig);


                var borderbottomConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var borderbottomStyle = new Parchment.Attributor.Style('borderbottom', 'border-bottom', borderbottomConfig);


                var textcolorConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var colorStyle = new Parchment.Attributor.Style('color_my_custom', 'color', textcolorConfig);


                var fontWeightConfig = {
                    scope: Parchment.Scope.INLINE,
                    // whitelist: this.lineWeightwhitelist
                };
                var fontWeightStyle = new Parchment.Attributor.Style('weight_my_custom', 'font-weight', fontWeightConfig);


                var alignConfig = {
                    scope: Parchment.Scope.BLOCK,

                };
                var alignStyle = new Parchment.Attributor.Style('align_custom', 'text-align', alignConfig);



                var blankConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var blankStyle = new Parchment.Attributor.Attribute('target_href', 'target', blankConfig);


                var relConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var relStyle = new Parchment.Attributor.Attribute('rel_href', 'rel', relConfig);

                var FontClassConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var FontClass = new Parchment.Attributor.Attribute('fontclass', 'class', FontClassConfig);

                var basefontsizeConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var FontClass2 = new Parchment.Attributor.Attribute('fontsizedata', 'data-basefontsize', basefontsizeConfig);

                var baselineheightConfig = {
                    scope: Parchment.Scope.INLINE,

                };
                var lineheightData = new Parchment.Attributor.Attribute('lineheightdata', 'data-baselineheight', baselineheightConfig);

                var FontConfig = {
                    scope: Parchment.Scope.INLINE,

                };

                class FontStyleAttributor extends Parchment.Attributor.Style {
                    value(node) {
                        return super.value(node).replace(/["']/g, '');
                    }
                }

                var FontStyle = new FontStyleAttributor('font_my_custom', 'font-family', FontConfig);

                let Inline = Quill.import('blots/inline');


                class MyLink extends Inline {

                    static create(value) {
                        let node = super.create();
                        node.setAttribute('href', value.href);
                        value.target?node.setAttribute('target', value.target):'';
                        value.rel?node.setAttribute('rel', value.rel):'';
                        value.style?node.setAttribute('style', value.style):'';
                        return node;
                    }
                    static value(node) {
                        return {
                            href: node.getAttribute('href'),
                            target: node.getAttribute('target'),
                            rel: node.getAttribute('rel'),
                            style: node.getAttribute('style')
                        };
                    }
                    static formats(domNode) {
                        return {
                            href: domNode.getAttribute('href'),
                            target: domNode.getAttribute('target'),
                            rel: domNode.getAttribute('rel'),
                            style: domNode.getAttribute('style')
                        };
                    }
                    optimize() {

                    }
                    format(name, value) {
                        if (name !== this.statics.blotName || !value) {
                            super.format(name, value);
                        } else {
                            this.domNode.setAttribute('href', value);
                        }
                    }

                }
                MyLink.blotName = 'mylink';
                MyLink.tagName = 'a';
                MyLink.ATTRIBUTES  = ['href','target','rel'];

                Quill.register({ 'formats/mylink': MyLink});
                Parchment.register(blankStyle);
                Parchment.register(colorStyle);
                Parchment.register(lineheightData);
                Parchment.register(FontClass);
                Parchment.register(FontClass2);
                Parchment.register(relStyle);
                Parchment.register(FontStyle);
                Parchment.register(alignStyle);
                Parchment.register(lineHeightStyle);
                Parchment.register(fontWeightStyle);
                Parchment.register(borderbottomStyle);


            }
        },

        mounted() {

            this.initQuillConfig();

        }
    }
</script>


<style scoped>

    .editinplacefield {
        position: relative;
    }

    .ql-editor.ql-blank::before {
        content: attr(data-placeholder);
        color: #a9a9a9;
        position: absolute;
    }

    .ql-editor {
        outline: none;
        white-space: normal;
    }

    .ql-editor.ql-editor__firefox {
        white-space: pre-wrap;
    }

    .ql-toolbar .tu-popup-progressbar-container {
        display: none;
    }

    .ql-editor img {
        display: block;
        width: 100%;
    }

    .ql-editor h3.t-redactor__h3 {
        font-weight: 700;
        font-size: 28px;
        line-height: 1.3;
        margin: 0;
    }

    .ql-editor h4.t-redactor__h4 {
        font-weight: 700;
        font-size: 22px;
        line-height: 1.3;
        margin: 0;
    }

    .ql-editor blockquote.t-redactor__preface {
        margin: 0;
        font-size: 26px;
        line-height: 1.55;
    }

    .ql-editor blockquote.t-redactor__quote {
        margin: 0;
        padding-left: 20px;
        border-left: 3px solid rgba(0, 0, 0, 0.84);
    }

    .ql-editor a {
        border-bottom-width: 0px;
        pointer-events: auto;
    }

    .ql-editor strong {
        font-weight: bold;
    }

    .ql-editor i {
        font-style: italic;
    }

    .ql-editor em {
        font-style: italic;
    }

    .ql-editor ul {
        list-style-type: disc;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 20px;
    }

    .ql-editor ol {
        list-style-type: decimal;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 20px;
    }

    .record .ql-editor {
        background: rgba(0, 0, 0, 0.05);
    }

    .ql-toolbar .toolbar__button {
        position: relative;
        width: 30px;
        height: 30px;
        padding: 0;
        box-sizing: border-box;
        border: none;
        display: inline-block;
        outline: none;
        cursor: pointer;
    }



    .ql-toolbar .toolbar__button .toolbar__button__hint {
        position: absolute;
        top: 100%;
        width: 200%;
        right: -50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ql-toolbar .toolbar__button .toolbar__button__hint span {
        display: block;
        min-width: 50%;
        text-align: center;
        color: #fff;
        white-space: nowrap;
        min-width: min-content;
        background: #000;
        font-size: 13px;
        padding: 2px 7px;
        font-family: tfutura, sans-serif;
        font-weight: 500;
    }

    .ql-toolbar {
        background: #fff;
        position: absolute;
        height: 30px;
        top: -10px;
        left: 0;
    }

    #for_redactor_toolbar.ql-toolbar {
        margin-top: 0;
        position: static;
    }

    #for_redactor_toolbar .toolbar__button {
        width: 60px;
        height: 60px;
    }

    /* AFTER RELEASE FOR ALL MOVE TO T-NUL.CSS IN ZB */
    #for_redactor_toolbar.for_redactor_toolbar.for_redactor_toolbar_zero {
        position: fixed !important;
        left: 0 !important;
        height: 60px !important;
        width: 100%;
        z-index: 2000;
        background-color: #fff;
    }

    #for_redactor_toolbar.for_redactor_toolbar.for_redactor_toolbar_zero
    .minicolors-swatch-color-plus,
    .tn-form-editor__toolbar.ql-toolbar .minicolors-swatch-color-plus {
        top: -3px;
    }

    .ql-toolbar .toolbar__button:before {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #fff;
    }

    .tn-form-editor__toolbar.ql-toolbar {
        top: 0;
        width: 100%;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .tn-form-editor__wrapper.ql-container {
        padding: 40px 10px 10px;
    }

    .tn-form-editor__wrapper.ql-container .ql-editor {
        height: 220px;
    }

    .ql-toolbar .toolbar__button:hover:before {
        background: #ff855d;
    }
    .toolbar__button:hover >.toolbar__button__hint{
        visibility: visible;
    }
    .ql-toolbar .toolbar__button.ql-bold.ql-active:before,
    .ql-toolbar .toolbar__button.ql-italic.ql-active:before,
    .ql-toolbar .toolbar__button.ql-underline.ql-active:before,
    .ql-toolbar .toolbar__button.ql-strike.ql-active:before {
        background: #ff855d;
    }

    .ql-toolbar .toolbar__button:after {
        position: absolute;
        display: block;
        width: 20px;
        height: 20px;
        left: calc(50% - 10px);
        top: calc(50% - 10px);
    }

    .ql-toolbar .ql-bold:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><g clip-path='url(%23clip0)'><path d='M11.6464 9.39293L11.225 9.81433L11.7133 10.1561C12.4198 10.6507 12.9366 11.5938 12.9366 12.6197C12.9366 14.2194 11.7075 15.5 10.1408 15.5H6.84507H6.5V4.5H7.69014H9.6338C11.1241 4.5 12.4296 5.78904 12.4296 7.38028C12.4296 8.18957 12.1359 8.90351 11.6464 9.39293ZM7.19014 9.07042V9.57042H7.69014H8.19718H9.5493C10.6869 9.57042 11.6549 8.56932 11.6549 7.38028C11.6549 6.20881 10.7881 5.19014 9.5493 5.19014H7.69014H7.19014V5.69014V9.07042ZM7.19014 14.3099V14.8099H7.69014H10.1408C11.2831 14.8099 12.2577 13.7993 12.1619 12.5144C12.1517 11.3517 11.2878 10.3451 10.0563 10.3451H9.5493H8.19718H7.69014H7.19014V10.8451V14.3099Z' fill='black' stroke='black'/></g><defs><clipPath id='clip0'><rect x='6' y='4' width='7.43662' height='12' fill='white'/></clipPath></defs></svg>");
    }

    .ql-toolbar .ql-italic:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M10.9999 4.5L7.3999 14.9' stroke='black' stroke-width='1.3'/><path d='M5 14.6602H10.2' stroke='black' stroke-width='1.3'/><path d='M8.19995 4.8999H13.4' stroke='black' stroke-width='1.3'/></svg>");
    }

    .ql-toolbar .ql-underline:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M12.6399 4V9.44' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M6.47974 4V9.44' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.6397 9.43994C12.6397 11.1199 11.2797 12.5599 9.51974 12.5599C7.75974 12.5599 6.47974 11.1999 6.47974 9.43994' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4.80005 15.5601H14.56' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-strike:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M4 9.68018H15.52' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M7.2802 13.7598C7.2802 13.7598 8.00021 14.8798 9.60021 14.8798C10.8802 14.8798 11.9202 13.9198 11.9202 12.7198C11.9202 12.1598 11.6802 11.6798 11.3602 11.2798C10.5602 10.3198 8.1602 9.43981 7.3602 8.23981C7.1202 7.83981 6.96021 7.43981 6.96021 6.95981C6.96021 5.7598 8.0002 4.7998 9.2802 4.7998C11.1202 4.7998 11.6802 6.1598 11.6802 6.1598' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-list:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M6.79932 4.59961H16.7993' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.99994 5.12C4.30922 5.12 4.55994 4.86928 4.55994 4.56C4.55994 4.25072 4.30922 4 3.99994 4C3.69066 4 3.43994 4.25072 3.43994 4.56C3.43994 4.86928 3.69066 5.12 3.99994 5.12Z' fill='black' stroke='black' stroke-miterlimit='10'/><path d='M6.79932 9.75977H16.7993' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.99994 10.3197C4.30922 10.3197 4.55994 10.069 4.55994 9.75971C4.55994 9.45043 4.30922 9.19971 3.99994 9.19971C3.69066 9.19971 3.43994 9.45043 3.43994 9.75971C3.43994 10.069 3.69066 10.3197 3.99994 10.3197Z' fill='black' stroke='black' stroke-miterlimit='10'/><path d='M6.79932 14.9199H16.7993' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.99994 15.4203C4.30922 15.4203 4.55994 15.1696 4.55994 14.8603C4.55994 14.551 4.30922 14.3003 3.99994 14.3003C3.69066 14.3003 3.43994 14.551 3.43994 14.8603C3.43994 15.1696 3.69066 15.4203 3.99994 15.4203Z' fill='black' stroke='black' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-list[value='ordered']:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M8 4.6001H17.5164' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8 9.75977H17.5164' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8 14.9199H17.5164' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4 9V5.74419V4L2 6.48837' stroke='black' stroke-miterlimit='10'/><path d='M2.5 12.1326C2.5 11.5227 3.1 11 3.8 11C4.5 11 5 11.3902 5 12C5 12.6098 4.3 13.2791 4 13.5405' stroke='black' stroke-miterlimit='10'/><path d='M2.5 14.4675C2.5 15.0774 3.16667 15.6001 3.94444 15.6001C4.72222 15.6001 5.5 15.0774 5.5 14.4675C5.5 13.7673 4.83333 13.2614 4.5 13' stroke='black' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-link_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M8.44036 12.7402H6.12036' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8.44036 6.5H6.12036' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M6.12 12.74C4.36 12.74 3 11.38 3 9.62C3 7.86 4.36 6.5 6.12 6.5' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.2 6.5H14.52' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.2 12.7402H14.52' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M14.5203 6.5C16.2803 6.5 17.6403 7.86 17.6403 9.62C17.6403 11.38 16.2803 12.74 14.5203 12.74' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M7.07959 9.62012H13.5596' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-color_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M5.0399 15.2799L4.8799 15.1199C4.2399 14.4799 4.2399 13.4399 4.8799 12.7999L12.7999 4.8799C13.4399 4.2399 14.4799 4.2399 15.1199 4.8799L15.2799 5.0399C15.9199 5.6799 15.9199 6.7199 15.2799 7.3599L7.3599 15.2799C6.7199 15.9199 5.6799 15.9199 5.0399 15.2799Z' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M9.12012 5.43994L14.7201 10.9599' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-weight_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M10 15.9999C13.3138 15.9999 16.0001 13.4026 16.0001 10.1987C16.0001 6.99475 13.3138 4.39746 10 4.39746C6.68631 4.39746 4 6.99475 4 10.1987C4 13.4026 6.68631 15.9999 10 15.9999Z' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M9.99927 4V15.6024' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4.22217 12.2998L9.65936 12.2998' stroke='black' stroke-miterlimit='10'/><path d='M4 8.5415L9.53373 8.5418' stroke='black' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-font_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M5.75732 15.08L10.522 4.5L15.3749 15.16' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M7.52222 12.0801H14.3604' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><line x1='12.4854' y1='15.35' x2='18' y2='15.35' stroke='black' stroke-width='1.3'/><line x1='3' y1='15.35' x2='8.51467' y2='15.35' stroke='black' stroke-width='1.3'/></svg>");
    }

    .ql-toolbar .ql-size_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M6.19995 4.84033V15.6001' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M1.3999 4.6001H10.9999' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M15.3 5.64014V14.5601' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.5 6L15.24 4L18 6H12.5Z' fill='black'/><path d='M18 13.5L15.4201 15.58L12.5 13.5H18Z' fill='black'/></svg>");
    }

    .ql-toolbar .ql-lineheight_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M3 4.6001H11' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3 14.9199H11' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M16.8 4.64014V13.5601' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M14 6L16.74 4L19.5 6H14Z' fill='black'/><path d='M19.5 13.5L16.9201 15.58L14 13.5H19.5Z' fill='black'/></svg>");
    }

    .ql-toolbar .ql-align_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M3.19995 4.6001H17.52' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.19995 9.76025H17.36' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.19995 14.9199H8.71995' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-typograph_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M10.5 5.77648C10.5 5.77648 12.1611 4.09333 13.9667 4.02C16.4222 3.94667 17 4.75 17 4.75V13.9898C17 13.9898 15.7722 13.6965 14.1111 13.8431C11.8 14.0631 10.5 15.6031 10.5 15.6031C10.5 15.6031 9.2 14.0631 6.88889 13.8431C5.22778 13.6965 4 13.9898 4 13.9898V4.74982C4 4.74982 4.57778 3.86982 7.03333 4.01649C8.83889 4.08982 10.5 5.70315 10.5 5.77648Z' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M10.5 5.70312V15.5298' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-clean_custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='white'/><path d='M3.60011 14.9201L1.36011 12.6801L10.4801 3.56006L14.9601 7.96006L8.00011 14.9201H3.60011Z' stroke='rgb(2, 2, 3)' stroke-width='1.3' stroke-miterlimit='10'/><path d='M11.5999 14.9199H14.1599' stroke='rgb(2, 2, 3)' stroke-width='1.3' stroke-miterlimit='10'/><path d='M16.4805 14.9199H19.0405' stroke='rgb(2, 2, 3)' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-text-styles:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M7.02295 5.27295V16.1627' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M1.91724 5H12.1283' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M15.4509 9.29541V16.1624' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.8999 9H18.0055' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-image-custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M17.5742 4.6001H2.69922V15.3001H17.5742V4.6001Z' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M2.69922 12.6253L6.71949 9.05859L10.4181 12.1084L13.7952 9.67888L17.5742 12.6253' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-video-custom:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M15.7858 15.4002H4.26712C3.40518 15.4002 2.69995 14.6815 2.69995 13.8032V6.29721C2.69995 5.41885 3.40518 4.7002 4.26712 4.7002H15.7858C16.6477 4.7002 17.3529 5.41885 17.3529 6.29721V13.8032C17.3529 14.6815 16.6477 15.4002 15.7858 15.4002Z' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8.80933 12.2062V7.81445L12.1787 10.0503L8.80933 12.2062Z' fill='black'/></svg>");
    }

    .ql-toolbar .ql-divider:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M4.91846 10H15' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M15 4V6.79573H4.91846V4' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4.91846 16.0108V13.2998H15V16.0108' stroke='black' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-bold:hover:after,
    .ql-toolbar .ql-bold.ql-active:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><g clip-path='url(%23clip0)'><path d='M11.6464 9.39293L11.225 9.81433L11.7133 10.1561C12.4198 10.6507 12.9366 11.5938 12.9366 12.6197C12.9366 14.2194 11.7075 15.5 10.1408 15.5H6.84507H6.5V4.5H7.69014H9.6338C11.1241 4.5 12.4296 5.78904 12.4296 7.38028C12.4296 8.18957 12.1359 8.90351 11.6464 9.39293ZM7.19014 9.07042V9.57042H7.69014H8.19718H9.5493C10.6869 9.57042 11.6549 8.56932 11.6549 7.38028C11.6549 6.20881 10.7881 5.19014 9.5493 5.19014H7.69014H7.19014V5.69014V9.07042ZM7.19014 14.3099V14.8099H7.69014H10.1408C11.2831 14.8099 12.2577 13.7993 12.1619 12.5144C12.1517 11.3517 11.2878 10.3451 10.0563 10.3451H9.5493H8.19718H7.69014H7.19014V10.8451V14.3099Z' fill='white' stroke='white'/></g><defs><clipPath id='clip0'><rect x='6' y='4' width='7.43662' height='12' fill='none'/></clipPath></defs></svg>");
    }

    .ql-toolbar .ql-italic:hover:after,
    .ql-toolbar .ql-italic.ql-active:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M10.9999 4.5L7.3999 14.9' stroke='white' stroke-width='1.3'/><path d='M5 14.6602H10.2' stroke='white' stroke-width='1.3'/><path d='M8.19995 4.8999H13.4' stroke='white' stroke-width='1.3'/></svg>");
    }

    .ql-toolbar .ql-underline:hover:after,
    .ql-toolbar .ql-underline.ql-active:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M12.6399 4V9.44' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M6.47974 4V9.44' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.6397 9.43994C12.6397 11.1199 11.2797 12.5599 9.51974 12.5599C7.75974 12.5599 6.47974 11.1999 6.47974 9.43994' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4.80005 15.5601H14.56' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-strike:hover:after,
    .ql-toolbar .ql-strike.ql-active:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M4 9.68018H15.52' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M7.2802 13.7598C7.2802 13.7598 8.00021 14.8798 9.60021 14.8798C10.8802 14.8798 11.9202 13.9198 11.9202 12.7198C11.9202 12.1598 11.6802 11.6798 11.3602 11.2798C10.5602 10.3198 8.1602 9.43981 7.3602 8.23981C7.1202 7.83981 6.96021 7.43981 6.96021 6.95981C6.96021 5.7598 8.0002 4.7998 9.2802 4.7998C11.1202 4.7998 11.6802 6.1598 11.6802 6.1598' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-list:hover:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M6.79932 4.59961H16.7993' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.99994 5.12C4.30922 5.12 4.55994 4.86928 4.55994 4.56C4.55994 4.25072 4.30922 4 3.99994 4C3.69066 4 3.43994 4.25072 3.43994 4.56C3.43994 4.86928 3.69066 5.12 3.99994 5.12Z' fill='white' stroke='white' stroke-miterlimit='10'/><path d='M6.79932 9.75977H16.7993' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.99994 10.3197C4.30922 10.3197 4.55994 10.069 4.55994 9.75971C4.55994 9.45043 4.30922 9.19971 3.99994 9.19971C3.69066 9.19971 3.43994 9.45043 3.43994 9.75971C3.43994 10.069 3.69066 10.3197 3.99994 10.3197Z' fill='white' stroke='white' stroke-miterlimit='10'/><path d='M6.79932 14.9199H16.7993' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.99994 15.4203C4.30922 15.4203 4.55994 15.1696 4.55994 14.8603C4.55994 14.551 4.30922 14.3003 3.99994 14.3003C3.69066 14.3003 3.43994 14.551 3.43994 14.8603C3.43994 15.1696 3.69066 15.4203 3.99994 15.4203Z' fill='white' stroke='white' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-list[value='ordered']:hover:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M8 4.6001H17.5164' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8 9.75977H17.5164' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8 14.9199H17.5164' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4 9V5.74419V4L2 6.48837' stroke='white' stroke-miterlimit='10'/><path d='M2.5 12.1326C2.5 11.5227 3.1 11 3.8 11C4.5 11 5 11.3902 5 12C5 12.6098 4.3 13.2791 4 13.5405' stroke='white' stroke-miterlimit='10'/><path d='M2.5 14.4675C2.5 15.0774 3.16667 15.6001 3.94444 15.6001C4.72222 15.6001 5.5 15.0774 5.5 14.4675C5.5 13.7673 4.83333 13.2614 4.5 13' stroke='white' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-link_custom:hover:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M8.44036 12.7402H6.12036' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8.44036 6.5H6.12036' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M6.12 12.74C4.36 12.74 3 11.38 3 9.62C3 7.86 4.36 6.5 6.12 6.5' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.2 6.5H14.52' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.2 12.7402H14.52' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M14.5203 6.5C16.2803 6.5 17.6403 7.86 17.6403 9.62C17.6403 11.38 16.2803 12.74 14.5203 12.74' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M7.07959 9.62012H13.5596' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-image-custom:hover:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M17.5742 4.6001H2.69922V15.3001H17.5742V4.6001Z' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M2.69922 12.6253L6.71949 9.05859L10.4181 12.1084L13.7952 9.67888L17.5742 12.6253' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-video-custom:hover:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M15.7858 15.4002H4.26712C3.40518 15.4002 2.69995 14.6815 2.69995 13.8032V6.29721C2.69995 5.41885 3.40518 4.7002 4.26712 4.7002H15.7858C16.6477 4.7002 17.3529 5.41885 17.3529 6.29721V13.8032C17.3529 14.6815 16.6477 15.4002 15.7858 15.4002Z' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M8.80933 12.2062V7.81445L12.1787 10.0503L8.80933 12.2062Z' fill='white'/></svg>");
    }

    .ql-toolbar .ql-divider:hover:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M4.91846 10H15' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M15 4V6.79573H4.91846V4' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4.91846 16.0108V13.2998H15V16.0108' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-typograph_custom:hover:after,
    .ql-toolbar .ql-typograph_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M10.5 5.77648C10.5 5.77648 12.1611 4.09333 13.9667 4.02C16.4222 3.94667 17 4.75 17 4.75V13.9898C17 13.9898 15.7722 13.6965 14.1111 13.8431C11.8 14.0631 10.5 15.6031 10.5 15.6031C10.5 15.6031 9.2 14.0631 6.88889 13.8431C5.22778 13.6965 4 13.9898 4 13.9898V4.74982C4 4.74982 4.57778 3.86982 7.03333 4.01649C8.83889 4.08982 10.5 5.70315 10.5 5.77648Z' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M10.5 5.70312V15.5298' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-font_custom:hover:after,
    .ql-toolbar .ql-font_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M5.75732 15.08L10.522 4.5L15.3749 15.16' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M7.52222 12.0801H14.3604' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><line x1='12.4854' y1='15.35' x2='18' y2='15.35' stroke='white' stroke-width='1.3'/><line x1='3' y1='15.35' x2='8.51467' y2='15.35' stroke='white' stroke-width='1.3'/></svg>");
    }

    .ql-toolbar .ql-weight_custom:hover:after,
    .ql-toolbar .ql-weight_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M10 15.9999C13.3138 15.9999 16.0001 13.4026 16.0001 10.1987C16.0001 6.99475 13.3138 4.39746 10 4.39746C6.68631 4.39746 4 6.99475 4 10.1987C4 13.4026 6.68631 15.9999 10 15.9999Z' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M9.99927 4V15.6024' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M4.22217 12.2998L9.65936 12.2998' stroke='white' stroke-miterlimit='10'/><path d='M4 8.5415L9.53373 8.5418' stroke='white' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-size_custom:hover:after,
    .ql-toolbar .ql-size_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M6.19995 4.84033V15.6001' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M1.3999 4.6001H10.9999' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M15.3 5.64014V14.5601' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.5 6L15.24 4L18 6H12.5Z' fill='white'/><path d='M18 13.5L15.4201 15.58L12.5 13.5H18Z' fill='white'/></svg>");
    }

    .ql-toolbar .ql-lineheight_custom:hover:after,
    .ql-toolbar .ql-lineheight_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M3 4.6001H11' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3 14.9199H11' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M16.8 4.64014V13.5601' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M14 6L16.74 4L19.5 6H14Z' fill='white'/><path d='M19.5 13.5L16.9201 15.58L14 13.5H19.5Z' fill='white'/></svg>");
    }

    .ql-toolbar .ql-align_custom:hover:after,
    .ql-toolbar .ql-align_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M3.19995 4.6001H17.52' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.19995 9.76025H17.36' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M3.19995 14.9199H8.71995' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-clean_custom:hover:after,
    .ql-toolbar .ql-clean_custom.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M3.60011 14.9201L1.36011 12.6801L10.4801 3.56006L14.9601 7.96006L8.00011 14.9201H3.60011Z' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M11.5999 14.9199H14.1599' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M16.4805 14.9199H19.0405' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-color_custom:hover:after,
    .ql-toolbar .ql-color_custom.ql-color_custom_active:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M5.0399 15.2799L4.8799 15.1199C4.2399 14.4799 4.2399 13.4399 4.8799 12.7999L12.7999 4.8799C13.4399 4.2399 14.4799 4.2399 15.1199 4.8799L15.2799 5.0399C15.9199 5.6799 15.9199 6.7199 15.2799 7.3599L7.3599 15.2799C6.7199 15.9199 5.6799 15.9199 5.0399 15.2799Z' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M9.12012 5.43994L14.7201 10.9599' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-toolbar .ql-text-styles:hover:after,
    .ql-toolbar .ql-text-styles.quill-dropdown_shown:after {
        content: url("data:image/svg+xml;charset=UTF-8, <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='20' height='20' fill='none'/><path d='M7.02295 5.27295V16.1627' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M1.91724 5H12.1283' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M15.4509 9.29541V16.1624' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/><path d='M12.8999 9H18.0055' stroke='white' stroke-width='1.3' stroke-miterlimit='10'/></svg>");
    }

    .ql-tooltip {
        position: absolute;
        transform: translateY(10px);
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0px 0px 5px #ddd;
        color: #444;
        padding: 5px 12px;
        white-space: nowrap;
    }

    .quill-popup_link {
        width: 320px;
    }

    .quill-popup_video {
        width: 310px;
    }

    .quill-video-popup {
        display: flex;
        flex-direction: column;
        padding: 15px;
    }

    .quill-video-popup__label {
        font-family: tfutura, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 113.7%;
        color: #000000;
        margin-bottom: 6px;
    }

    .quill-video-popup__textarea {
        background: #ffffff;
        border: 1px solid #d8d8d8;
        box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
        resize: vertical;
    }

    .ql-editor .t-redactor__video-container {
        position: relative;
        padding-bottom: 53.25%;
        padding-top: 25px;
        height: 0;
    }

    .ql-editor .t-redactor__video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    }

    .ql-editor figure figcaption {
        opacity: 0.5;
        font-size: 16px;
        font-style: italic;
        margin-top: 5px;
    }

    .ql-editor figure[data-type='image'] a {
        cursor: default;
    }

    .quill-popup_image {
        width: 260px;
        box-sizing: border-box;
    }

    .quill-link-popup {
        display: flex;
        flex-direction: column;
        padding: 18px 16px 10px;
    }

    .quill-link-popup__label {
        width: 100%;
    }

    .quill-link-popup__label__title {
        font-family: tfutura, sans-serif;
        font-weight: normal;
        font-size: 15px;
        line-height: 113.7%;
        color: #000000;
        margin-bottom: 5px;
        font-weight: 600;
        letter-spacing: 0.4px;
    }

    .quill-link-popup__input {
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        margin-bottom: 20px;
        padding: 3px 0;
        height: 30px;
        border-radius: 0;
        background-color: white;
        color: #0e0e0e;
        font-size: 15px;
        font-family: tfutura, sans-serif;
        transition: border 0.3s ease-in;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: none;
        outline: none;
    }

    .quill-link-popup__input[name='text'] {
        margin-bottom: 6px;
    }

    .quill-link-popup__label_cb {
        display: flex;
        align-items: end;
        cursor: pointer;
    }

    .quill-link-popup__label_cb input[type='checkbox'] {
        display: inline-block;
        width: auto;
        height: auto;
        margin: 0 6px 0 0;
    }

    .quill-link-popup__label_cb .quill-link-popup__label__text {
        font-family: tfutura, sans-serif;
        font-weight: normal;
        font-size: 13px;
        line-height: 13px;
        color: #000000;
        opacity: 0.5;
    }

    .quill-link-popup__label_cb .quill-link-popup__label__text:hover {
        opacity: 1;
    }

    .quill-link-popup__label_rel {
        margin-top: 15px;
    }

    .quill-link-popup__label_rel .quill-link-popup__label__text {
        font-size: 13px;
        line-height: 13px;
    }

    .quill-link-popup__settings__visual {
        box-sizing: border-box;
        margin-top: 15px;
        padding: 15px 12px 15px;
        width: 100%;
        background: #f3f3f3;
        border-radius: 3px;
        margin-bottom: 9px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .quill-link-popup__settings__visual__info {
        display: block;
        width: 100%;
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        font-family: tfutura, sans-serif;
        padding-top: 10px;
        color: #000;
        opacity: 0.6;
    }

    .quill-link-popup__settings__visual__info:hover,
    .quill-link-popup__settings__visual__info:active,
    .quill-link-popup__settings__visual__info:visited {
        opacity: 1;
        color: #000;
    }

    .quill-link-popup__settings .quill-link-popup__settings__body {
        display: none;
    }

    .quill-link-popup__settings_show .quill-link-popup__settings__body {
        display: block;
    }

    .quill-link-popup__settings_show .quill-link-popup__settings__header:after {
        transform: rotate(45deg);
    }

    .quill-link-popup__settings__visual .quill-link-popup__label {
        width: 85px;
        margin-bottom: 0;
        height: 24px;
    }

    .quill-link-popup__settings__visual .quill-link-popup__label__text {
        font-family: tfutura, sans-serif;
        font-weight: normal;
        font-size: 15px;
        line-height: 113.7%;
        color: #000000;
        display: block;
    }

    .ql-toolbar .quill-link-popup__settings__visual .quill-link-popup__input {
        margin-bottom: 0;
        background: 0;
        border: none;
        height: 24px;
        padding-left: 25px;
        padding-top: 9px;
        font-family: tfutura, sans-serif;
        font-style: normal;
        font-size: 14px;
        letter-spacing: 0.01em;
        font-weight: 400;
        color: #000000;
        -webkit-appearance: none;
    }

    .quill-link-popup__settings__visual
    .quill-link-popup__input[name='line_width'] {
        padding-left: 0;
        padding-top: 3px;
    }

    .ql-toolbar .quill-link-popup .minicolors-theme-default {
        width: 100%;
    }

    .quill-link-popup__settings__header {
        font-family: tfutura, sans-serif;
        font-size: 14px;
        line-height: 113.7%;
        color: #ff7d4a;
        margin: 17px 0 0;
        position: relative;
        cursor: pointer;
    }

    .quill-link-popup__settings__header:after {
        content: '';
        display: block;
        position: absolute;
        right: 3px;
        top: 0;
        width: 7px;
        height: 7px;
        border-right: 1px solid #ff7d4a;
        border-bottom: 1px solid #ff7d4a;
        transform: rotate(-45deg);
        top: 3px;
    }

    .ql-toolbar .quill-link-popup .minicolors-swatch {
        border-radius: 100px;
        width: 17px;
        height: 17px;
        left: 0;
        top: 3px;
    }

    .ql-toolbar .quill-link-popup .minicolors-swatch-color {
        border-radius: 100px;
    }

    .quill-link-popup .minicolors-swatch-color-plus,
    .quill-textcolor .minicolors-swatch-color-plus {
        top: -7px;
        left: 0px;
    }

    .quill-popup__btn {
        border: none;
        display: block;
        width: 100%;
        background: #ff7d4a;
        font-family: tfutura, sans-serif;
        font-weight: normal;
        font-size: 14px;
        line-height: 113.7%;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
        padding: 10px 0;
        border-radius: 0 0 3px 3px;
    }

    .quill-popup_link .quill-popup__btn {
        margin-top: 10px;
    }

    .quill-tooltip {
        position: absolute;
        font-family: tfutura, sans-serif;
        background: #000;
        padding: 5px;
        font-size: 13px;
        min-width: 200px;
        z-index: 9999;
    }

    .quill-tooltip-link__button {
        color: #fff;
        background: none;
        border: none;
        border-left: 1px solid #cccccc4d;
        cursor: pointer;
    }

    .quill-tooltip-link__button:first-child {
        border: none;
    }

    .quill-tooltip-link__url {
        padding: 0 7px;
        font-weight: 400;
        color: #fff !important;
        box-shadow: none !important;
        border-bottom: none !important;
    }

    .quill-tooltip-link__url:hover {
        text-decoration: underline !important;
    }

    .quill-dropdown {
        outline: none;
        position: relative;
        cursor: pointer;
    }

    .quill-dropdown__container {
        z-index: 9;
        position: absolute;
        left: 0;
        top: 100%;
        width: 240px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        display: none;
    }

    .quill-dropdown_shown .quill-dropdown__container {
        display: block;
        max-height: 400px;
        overflow-y: auto;
    }

    .ql-toolbar .quill-dropdown_shown:before {
        background: #ff855d;
    }

    .quill-dropdown__item {
        text-align: left;
        cursor: pointer;
        background: #fff;
        padding: 10px 15px;
        color: black;
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
        font-size: 14px;
        font-family: Arial, Helvetica, Verdana, Tahoma, sans-serif;
        line-height: 1.6em;
    }

    .quill-dropdown__item_active {
        background-color: #f2f2f2;
    }

    .quill-dropdown__item:hover {
        background: #ff855d;
        color: #fff;
    }

    .ql-toolbar .ql-font_custom .quill-dropdown__container {
        width: 400px;
    }

    .quill-textcolor {
        top: 100%;
        border-radius: 3px;
        padding: 10px 8px 0 8px;
        background: #fff;
        z-index: 99;
        cursor: default;
    }

    .quill-textcolor .minicolors {
        margin-bottom: 10px;
    }

    .quill-textcolor__row {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 10px;
    }

    .quill-textcolor__swatch {
        display: inline-block;
        width: 29px;
        height: 29px;
        margin-right: 4px;
        border: 1px solid #e7e7e7;
        border-radius: 100px;
    }

    .quill-textcolor__input {
        border: 1px solid #e7e7e7;
        padding: 7px 17px 3px 17px;
        font-family: tfutura, Arial;
        font-size: 12px;
        letter-spacing: 0.01em;
        color: #000000;
        box-sizing: border-box;
        outline: none;
    }

    .quill-textcolor__input_color {
        width: 85px;
    }

    .quill-textcolor__input_opacity {
        width: 50px;
        text-align: right;
        padding-right: 16px;
        padding-left: 0;
    }

    .quill-textcolor__input_opacity::-webkit-outer-spin-button,
    .quill-textcolor__input_opacity::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .quill-textcolor__input_opacity[type='number'] {
        -moz-appearance: textfield;
    }

    .quill-textcolor__percent {
        font-family: tfutura, Arial;
        font-size: 12px;
        letter-spacing: 0.01em;
        color: #000000;
        position: absolute;
        right: 20px;
        padding-top: 3px;
    }

    .quill-textcolor__apply {
        margin: 0;
        margin-left: -8px;
        padding: 0;
        width: calc(100% + 16px);
        height: 32px;
        border: none;
        font-family: tfutura, Arial;
        font-size: 14px;
        line-height: 113.7%;
        text-align: center;
        color: #ffffff;
        background: #ff7d4a;
        cursor: pointer;
    }

    .ql-editor a {
        color: #ff8562;
    }

    .ql-clipboard {
        display: none;
    }

    .pe-redactor__wrapper {
        background-color: rgba(0, 0, 0, 0);
        font-size: 16px;
        line-height: 1.556;
    }

    .pe-redactor__wrapper .ql-editor {
        padding: 15px 0;
    }

    .edrec__wrapper__editor .ql-editor {
        font-size: 16px;
        line-height: 1.556;
        padding: 15px 0;
    }

    .minicolors-swatch-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .minicolors-swatch-link a {
        box-sizing: border-box;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quill-popup {
        position: absolute;
        z-index: 99;
        background: #ffffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        border-radius: 3px;
    }

    .quill-popup_link .quill-link-popup__label_color,
    .quill-popup_link .quill-link-popup__label_line-color,
    .quill-popup_link .quill-link-popup__label_line {
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        width: 87px;
        padding-bottom: 5px;
        padding-top: 2px;
    }

    .quill-link-popup__label__row {
        display: flex;
    }

    .quill-popup_link
    .quill-link-popup__settings__section
    .quill-link-popup__label_line-color {
        margin-right: 15px;
    }

    .quill-popup_link .quill-link-popup__label_line {
        width: 54px;
    }

    .quill-popup_link .quill-link-popup__label_line {
        position: relative;
    }

    .quill-popup_link .quill-link-popup__label_line:after {
        content: '';
        display: block;
        position: absolute;
        width: 5px;
        right: 2px;
        bottom: 4px;
        height: 12px;
        border: 3px solid transparent;
        border-top: 5px solid #727272;
        box-sizing: border-box;
        z-index: 9;
        pointer-events: none;
    }

    .quill-popup_link .quill-link-popup__label_line:before {
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        right: -5px;
        z-index: 9;
        bottom: 0;
        height: 40px;
        background: #f3f3f3;
        box-sizing: border-box;
        pointer-events: none;
    }

    .quill-popup_link .quill-link-popup__label__text__colored {
        opacity: 0.6;
    }

    .quill-popup_image input[type='text'] {
        margin-bottom: 25px;
    }

</style>