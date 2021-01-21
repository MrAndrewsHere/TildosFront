<template>
  <div class="">

    <div class="td-project-head">

      <div class="td-project-uppanel">
        <a class="td-project-uppanel__wrapper">

          <table class="td-project-uppanel__button">
            <tbody>
            <tr>
              <td><img src="../assets/icons/td-icon-domain.png" width="14px" height="14px"
                       style="padding:5px;"></td>
              <td class="td-project-uppanel__title" @click="dcr?null : domainRequest = !domainRequest">Подключить домен</td>
            </tr>
            </tbody>
          </table>
          <table class="td-project-uppanel__button">
            <tbody>
            <tr>
              <td><img src="../assets/icons/td-icon-puball2.png" width="17px" height="14px"
                       style="padding:5px;"></td>
              <td @click="publishAll" class="td-project-uppanel__title">Опубликовать все страницы</td>
            </tr>
            </tbody>
          </table>

          <table class="td-project-uppanel__url" v-if="project.domain || dcr">
            <tbody>
            <tr>
              <td><img src="../assets/icons/td-icon-link-black.png" width="14px" height="14px"
                       style="padding:5px;"></td>
              <td  class="td-project-uppanel__url-link">
                <span v-if="!dcr && project.domain" class="td-project-uppanel__url-span">Адрес сайта: </span>
                <span v-if="dcr" class="td-project-uppanel__url-span" style="color: darkred">Отправлен запрос на регистрацию домена: </span>
                <a :href="'https://'+  (dcr?dcr.domain : project.domain) " target="_blank"
                   style="color:black;text-decoration: none">{{
                    (dcr?dcr.domain : project.domain)
                  }}</a>
              </td>
            </tr>
            </tbody>
          </table>
        </a>
      </div>
    </div>


    <div class="td-project-midpanel">
      <div class="td-project-midpanel__wrapper" style="min-height:80px;">
        <div class="td-project-midpanel__site-title "><span style="color: black">{{ subPN }}</span>
        </div>
        <div class="td-project-midpanel__buttons">
          <div class="td-project-midpanel__button">
            <table class="td-button-ico td-button-ico_white td-button-editprojectsettings">
              <tbody>
              <tr @click="$router.push('/project/settings/'+project.id)">
                <td class="td-button-ico__ico" style="height: 47px"><img
                    src="../assets/icons/td-site__settings.png"
                    width="14px" height="14px"></td>
                <td class="td-button-ico__title" style="height: 47px">Настройки сайта</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="td-project-midpanel__button">
            <table class="td-button-ico td-button-addnewpage">
              <tbody>
              <tr @click="overlay = !overlay">
                <td class="td-button-ico__ico" style="height: 47px"><img
                    src="../assets/icons/td-icon-plus.png" width="14px"
                    height="14px"></td>
                <td class="td-button-ico__title" style="font-weight: 400;height: 47px">Создать новую
                  страницу
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <v-row justify="center" align="center" class="mt-6"
           style="background-color:#f0f0f0;padding-right: 5%;padding-left: 5%">


      <template>
        <v-card


            width="100%"
            tile
            elevation="0"
            outlined
            style=""
            color="#f0f0f0"

        >
          <div class="td-project-pages-panel" style="padding-top:10px;display: flex">


            <v-chip-group
                mandatory
                active-class="activChip"
                v-model="filtPag"
                class="mt-3"
            >
              <v-chip value="0"
              >
                Страницы
              </v-chip>
              <v-chip value="1"

              >
                Шаблоны
              </v-chip>
            </v-chip-group>
            <v-text-field @change="searchingPage" class="pl-3" color="black" placeholder="URL или Заголовок">
              <template slot="append">
                <v-icon>mdi-feature-search-outline</v-icon>
              </template>
            </v-text-field>

          </div>
          <v-list class="" style="background-color:#f0f0f0; ">
            <div v-for="(page,index) in filteredPages" :key="index">

              <!--                            v-if="page.id !== project.header || page.id !== project.footer "-->
              <v-list-item class="sitedescr">
                <v-list-item-avatar>
                  <v-img width="50px" src="../assets/module_90.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                      @click="$router.push({path:'/page',query:{'pageid':page.id,'projectid':project.id}})">

                    <a
                        style="letter-spacing: 1px;color: black;font-size: 18px;font-weight: 500;text-decoration: none"
                        class="sinename ">

                      <h2 class="orangered ">
                        <v-icon v-if="project.mainpage === page.id" class="mb-1"
                                color="#fd784c">
                          mdi-home
                        </v-icon>
                        {{ page.title }}<span class="overline pl-2">/{{ page.url }}</span>
                      </h2>

                    </a>
                  </v-list-item-title>

                  <!--                                        <router-link :to="{name:'EditPage',params:{query:calss(page.id)}}">routerlink</router-link>-->
                </v-list-item-content>
                <v-list-item-action class="justify-end">

                  <div class="" style="display: flex;justify-content: end">
                                        <span class="siteactpull"
                                              v-if="!page.is_public && !page.tmpl">Страница не опубликована</span>
                    <span class="siteactpull" v-if="page.is_public && page.changed && !page.tmpl">Последние изменения не опубликованы</span>
                    <v-btn @click="editpages(page)" text depressed x-small
                           class="iccc siteactions">
                      <v-icon>mdi-cog-clockwise</v-icon>
                      <span class="pl-1">настройки</span></v-btn>
                    <v-btn v-if="page.tmpl" text depressed x-small class="iccc siteactions"
                           @click="createOnTmpl(page)">
                      <v-icon>mdi-content-duplicate</v-icon>
                      <span class="pl-1">Создать из шаблона</span></v-btn>
                    <v-btn v-if="!page.tmpl" text depressed x-small class="iccc siteactions"
                           @click="publish(page)">
                      <v-icon>mdi-publish</v-icon>
                      <span class="pl-1">публиковать</span></v-btn>
                    <a v-if="!page.tmpl" style="color: black;text-decoration: none"
                       :href="project.domain && page.is_public?'http://'+project.domain+'/'+page.url:'#'"
                       :target="project.domain && page.is_public?'_blank':''">
                      <v-btn text depressed x-small class="iccc siteactions">
                        <v-icon>mdi-open-in-new</v-icon>
                        <span class="pl-1">ссылка</span></v-btn>
                    </a>
                    <v-btn @click="deletePage(page.id)" text depressed x-small class="iccc siteactions">
                      <v-icon>mdi-trash-can</v-icon>
                      <span class="pl-1">удалить</span></v-btn>

                  </div>

                </v-list-item-action>

              </v-list-item>
              <v-divider v-if="index !== pages.length-1 "></v-divider>
            </div>

          </v-list>
          <!--                    <div class="td-project-pages-panel" style="padding-top:10px;" v-if="project.header || project.footer ">Шапка и подвал</div>-->
          <!--                    <div class="td-page"  v-if="project.footer">-->
          <!--                        <div class="td-page__wrapper">-->

          <!--                            <table class="td-page__table">-->
          <!--                                <tbody><tr>-->
          <!--                                    <td class="td-page__td-img"><a href="/page/?pageid=12382399"><div class="td-page__img" style="background:url('../assets/icons/td-icon-footer.png') no-repeat top center; background-size: cover;"></div></a></td>-->
          <!--                                    <td class="td-page__td-title td-page__td-title_long ss-list-link">-->
          <!--                                        <a href="/page/?pageid=12382399&amp;projectid=2503285">Footer</a>-->
          <!--                                    </td>-->
          <!--                                    <td class="td-page__right">-->
          <!--                                        <div class="td-page__descr">Подвал сайта</div>-->
          <!--                                        <div class="td-page__note">Автоматически добавляется ко всем страницам</div>-->
          <!--                                        <div class="td-page__buttons">-->
          <!--                                            <table class="td-page__buttons-table">-->
          <!--                                                <tbody><tr>-->
          <!--                                                    <td class="td-page__buttons-spacer"></td>-->
          <!--                                                    <td class="td-page__buttons-td"><a href="javascript:delPage('12382399');" onclick="return confirm('Вы точно уверены? Удалить страницу?')"><img src="/tpl/img/td-icon-del-black.png" width="14px" class="td-page__button-ico"><span class="td-page__button-title">Удалить</span></a></td>-->
          <!--                                                </tr>-->
          <!--                                                </tbody></table>-->
          <!--                                        </div>-->
          <!--                                    </td>-->
          <!--                                </tr>-->
          <!--                                </tbody></table>-->

          <!--                        </div>-->
          <!--                    </div>-->
          <!--                    <div class="td-page" v-if="project.header">-->
          <!--                        <div class="td-page__wrapper">-->

          <!--                            <table class="td-page__table">-->
          <!--                                <tbody><tr>-->
          <!--                                    <td class="td-page__td-img"><a href="/page/?pageid=12456583"><div class="td-page__img" style="background:url('../assets/icons/td-icon-header.png') no-repeat top center; background-size: cover;"></div></a></td>-->
          <!--                                    <td class="td-page__td-title td-page__td-title_long ">-->
          <!--                                        <a href="/page/?pageid=12456583&amp;projectid=2503285" class="">Header</a>-->
          <!--                                    </td>-->
          <!--                                    <td class="td-page__right">-->
          <!--                                        <div class="td-page__descr">Шапка сайта </div>-->
          <!--                                        <div class="td-page__note">Автоматически добавляется ко всем страницам</div>-->
          <!--                                        <div class="td-page__buttons">-->
          <!--                                            <table class="td-page__buttons-table">-->
          <!--                                                <tbody><tr>-->
          <!--                                                    <td class="td-page__buttons-spacer"></td>-->
          <!--                                                    <td class="td-page__buttons-td"><a href="javascript:delPage('12456583');" onclick="return confirm('Вы точно уверены? Удалить страницу?')"><img src="/tpl/img/td-icon-del-black.png" width="14px" class="td-page__button-ico"><span class="td-page__button-title">Удалить</span></a></td>-->
          <!--                                                </tr>-->
          <!--                                                </tbody></table>-->
          <!--                                        </div>-->
          <!--                                    </td>-->
          <!--                                </tr>-->
          <!--                                </tbody></table>-->

          <!--                        </div>-->
          <!--                    </div>-->
        </v-card>
      </template>

    </v-row>
    <v-dialog

        :value="overlay"
        style="background-color: transparent;box-shadow: none"
        width="500px"
    >
      <v-card class="elevation-5">
        <v-toolbar
            color="#fa886e"

            flat
        >
          <v-toolbar-title>Новая страница</v-toolbar-title>


        </v-toolbar>
        <v-form class="pa-3" @submit.prevent="createpage()">
          <v-text-field

              required
              label="Заголовок"
              name="Заголовок"
              prepend-icon="mdi-label-outline"
              type="text"
              v-model="title"
              color="#FFAB91"
              :messages="error.title"

              :rules="[v => !!v || '*']"
          ></v-text-field>

          <v-text-field
              required

              label="Адрес"
              name="Адрес"
              prepend-icon="mdi-web"
              placeholder="/"
              type="text"
              v-model="url"
              :messages="error.url"
              color="#FFAB91"
              :rules="[v => !!v || ' *']"

          ></v-text-field>

          <v-checkbox color="#FFAB91" v-model="is_tmps" label="Шаблон">

          </v-checkbox>
        </v-form>
        <div class="pa-3" v-if="error">
          <v-alert type="error" dense
                   outlined>

            <span>{{ error }}</span>
          </v-alert>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark @click="overlay = false"><span class="btnelement">Отмена</span></v-btn>
          <v-btn color="#fa886e" @click="createpage"><span class="btnelement">Создать</span></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="pagesettings"

    >
      <div class="td-popup td-popup_opened" id="popup_pagesettings" style="display: block;">
        <div class="td-popup__wrap">
          <div class="td-popup-window">


            <div
            >


              <!--header modal -->

              <div class="td-popup-window__head">
                <div @click="pagesettings = !pagesettings" class="td-popup-window__close">

                </div>
                <div class="td-popup-window__title">
                  Настройки страницы
                </div>
                <div class="td-popup-window__menuwrapper">

                  <div class="td-popup-menu td-popup-menu_ru">

                    <ul class="td-popup-menu__wrapper">
                      <li class="td-popup-menu__item td-popup-menu__item_active"
                          id="link_tab_general"><a
                          @click="switchtab('tab_general');">Главное</a>
                      </li>
                      <li class="td-popup-menu__item " id="link_tab_actions"><a
                          @click="switchtab('tab_actions');">Действия</a>
                      </li>
                      <!--                                            <li class="td-popup-menu__item " id="link_tab_badge"><a-->
                      <!--                                                    @click="switchtab('tab_badge');">Бейджик</a>-->
                      <!--                                            </li>-->


                    </ul>


                  </div>
                </div>

              </div>
              <!--/--header modal ---->


              <div class="td-popup-window__middle">

                <div class="td-popup-window__middle-wrapper td-tab-content">
                  <div id="tab_general" class="td-tab-pane td-tab-pane_active">
                    <div class="td-item-group">
                      <div class="td-item-group__title">Заголовок</div>
                      <input type="text" class="td-input" v-model="pageedit.title"
                             placeholder="Заголовок страницы">
                    </div>
                    <div class="td-item-group">
                      <div class="td-item-group__title">Описание</div>
                      <input type="text" name="descr" class="td-input"
                             value="Шаблон универсальной бизнес страницы"
                             placeholder="Описание страницы">
                    </div>
                    <div class="td-item-group">
                      <div class="td-item-group__title">Адрес страницы</div>
                      <table width="100%">
                        <tbody>
                        <tr>
                          <td>
                            <div class="td-item-group__project-url"
                                 onclick="$('#popup-ps-input-alias').focus();">
                              http://project2503285.tilda.ws/
                            </div>
                          </td>
                          <td style="width:100%;"><input type="text"

                                                         class="td-input td-item-group__page-url"
                                                         v-model="pageedit.url" placeholder=""
                                                         style="margin-top:2px"></td>
                        </tr>
                        </tbody>
                      </table>
                      <div class="td-item-group__descr" style="color: red">
                        {{ saveerror }}
                      </div>
                    </div>
                    <div class="td-item-group  my-0">

                      <v-checkbox v-model="pageedit.tmpl" class="my-0" color="#F87458" label="Шаблон"></v-checkbox>
                    </div>

                    <div class="td-popup-window__bottom">
                      <a @click="$router.push('/project/settings/'+project.id)"
                         class="td-popup-window__bottom-left mainlink">
                        Перейти в настройки сайта </a>

                      <div class="td-popup-window__bottom-right">
                        <input type="button" @click="pagesettings = false" value="Закрыть"
                               class="td-popup-btn-white">
                        <input value="Сохранить изменения" @click="savepage"
                               class="td-popup-btn js-ps-popup-submit"
                               style="border:1px solid #fa8669;">
                      </div>
                      <br>
                    </div>
                  </div>
                  <div id="tab_badge" class="td-tab-pane">
                    <div class="td-ps-badge__title">Текущее изображение бейджика</div>
                    <div class="td-ps-badge__subtitle">
                      По умолчанию для бейджика используется первая картинка со страницы. Вы
                      можете загрузить ваше собственное изображение.
                    </div>
                    <div class="td-ps-badge__upload-button-wrap">
                      <div class="td-ps-badge__upload-button tu-progressbar_center"
                           style="display: block;">
                        <div id="tuwidget487029-previews"
                             class="tu-popup-progressbar-container tu-popup-progressbar-start">
                          <div class="tu-popup-progressbar-error-container">
                            <div class="tu-popup-progressbar-error-wrapper">
                              <div class="tu-popup-progressbar-error-title">Upload error
                                &gt;
                              </div>
                              <div class="tu-popup-progressbar-error-text"
                                   data-tu-errormessage="">Image files allowed only
                              </div>
                            </div>
                          </div>
                          <div class="tu-popup-progressbar-steps">
                            <div class="tu-popup-progressbar-step3">
                              <div class="tu-popup-toggler tuwidget487029-button"
                                   id="tuwidget487029-button">Загрузить файл
                              </div>
                              <div class="tu-popup-progressbar-final tuwidget487029-button">
                                <div class="tu-popup-progressbar-final-text"><span
                                    data-tu-name=""></span> <span data-tu-size="">0KB</span>
                                </div>
                              </div>
                            </div>
                            <div class="tu-popup-progressbar-step2">
                              <div class="tu-popup-progressbar-checkmark-wrapper">
                                <div class="tu-popup-progressbar-checkmark">
                                  <div class="tu-popup-progressbar-checkmark_stem"></div>
                                  <div class="tu-popup-progressbar-checkmark_kick"></div>
                                </div>
                              </div>
                            </div>
                            <div class="tu-popup-progressbar-step1">
                              <div class="tu-popup-progressbar-bg"
                                   data-tu-uploadprogress=""></div>
                              <div class="tu-popup-progressbar-text">Загрузка</div>
                              <div class="tu-popup-progressbar-close-wrapper"
                                   data-tu-remove="">
                                <div class="tu-popup-progressbar-close"></div>
                                <div
                                    class="tu-popup-progressbar-close-line tu-popup-progressbar-close-line-first"></div>
                                <div
                                    class="tu-popup-progressbar-close-line tu-popup-progressbar-close-line-second"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <input type="text" value="" name="imgfile" role="tilda-uploader"
                               id="tuwidget487029" style="display: none;">
                        <input type="hidden" name="img-tuinfo-uuid" value="">
                        <input type="hidden" name="img-tuinfo-cdnurl" value="">
                        <input type="hidden" name="img-tuinfo-name" value="">
                        <input type="hidden" name="img-tuinfo-width" value="">
                        <input type="hidden" name="img-tuinfo-size" value="">
                        <input type="file" class="tu-hidden-input" accept="image/*"
                               style="visibility: hidden; position: absolute; top: 0px; left: 0px; height: 0px; width: 0px;">
                      </div>
                    </div>
                    <div class="td-ps-badge__upload" id="pagebadge_img_wrapper">
                      <img
                          src="https://static.tildacdn.com/tild3961-3836-4436-a630-396663343165/k-67-ae-01271_1-id-6.jpg"><br><a
                    >Delete</a><br>
                    </div>
                    <div class="td-popup-window__bottom">
                      <a href="/projects/settings/?projectid=2503285"
                         class="td-popup-window__bottom-left">
                        Перейти в настройки сайта </a>

                      <div class="td-popup-window__bottom-right">
                        <input type="button" @focus="pagesettings = false" value="Закрыть"
                               class="td-popup-btn-white">
                        <input type="button" value="Сохранить изменения" @click="savepage"
                               class="td-popup-btn js-ps-popup-submit"
                               style="border:1px solid #fa8669;">
                      </div>
                      <br>
                    </div>
                  </div>
                  <div id="tab_actions" class="td-tab-pane ">
                    <div class="td-ps-actions__title">Действия со страницей:</div>
                    <ul class="td-ps-list-link td-ps-list-link-actions">
                      <li><a><span>Передать страницу <b>на другой аккаунт</b></span></a>
                      </li>
                      <li><a @click="dublicatePage()"><span>Дублировать страницу<b>cоздать копию</b></span></a>
                      </li>
                      <li><a><span>Удалить страницу <b>без возможности отмены</b></span></a>
                      </li>
                      <li>
                        <a><span>Перенести страницу <b>в другой свой сайт</b></span></a>
                      </li>
                    </ul>
                    <div class="td-popup-window__bottom">


                      <br>
                      <br>
                      <br>

                    </div>
                  </div>

                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </v-dialog>
    <v-dialog
        v-model="domainRequest"

    >
      <div class="td-popup td-popup_opened" style="display: block;">
        <div class="td-popup__wrap">
          <div class="td-popup-window">


            <div
            >


              <!--header modal -->

              <div class="td-popup-window__head">
                <div @click="domainRequest = !domainRequest" class="td-popup-window__close" style="margin-bottom:25px">

                </div>
                <div class="td-popup-window__title" style="margin-bottom:25px">
                  Подключение домена
                </div>


              </div>
              <!--/--header modal ---->


              <div class="td-popup-window__middle">

                <div class="td-popup-window__middle-wrapper td-tab-content">
                  <div class="td-tab-pane td-tab-pane_active">

                    <div class="td-item-group">
                      <div class="td-item-group__title"></div>
                      <table width="100%">
                        <tbody>
                        <tr>
                          <td>
                            <div class="td-item-group__project-url"
                            >
                              https://
                            </div>
                          </td>
                          <td style="width:100%;"><input type="text"

                                                         class="td-input td-item-group__page-url"
                                                         v-model="newDomain" :placeholder="project.domain||(dcr?dcr.domain:'')"
                                                         style="margin-top:2px"></td>
                          <div class="td-item-group__project-url">
                            .uni-dubna.ru
                          </div>
                        </tr>
                        </tbody>
                      </table>
                      <div class="td-item-group__descr" style="color: red">
                        {{ DCRError }}
                      </div>
                    </div>


                    <div class="td-popup-window__bottom">


                      <div class="td-popup-window__bottom-right">
                        <input type="button" @click="domainRequest = false" value="Закрыть"
                               class="td-popup-btn-white">
                        <input value="Отправить запрос" @click="sendDCR"
                               class="td-popup-btn js-ps-popup-submit"
                               style="border:1px solid #fa8669;text-align: center">
                      </div>
                      <br>
                    </div>
                  </div>


                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </v-dialog>
  </div>


</template>

<script>
import {HTTP} from "../axios";

export default {
  name: "project",
  props: ['id'],
  data: () => {
    return {
      title: '',
      url: '',
      is_tmps: 0,
      overlay: false,
      project: '',
      pages: [],
      error: '',
      saveerror: '',
      dcr:'',
      filtPag: null,
      filteredPages: [],
      pagesettings: false,
      domainRequest: false,
      newDomain: '',
      DCRError:'',
      pageedit: {
        index: '',
        title: '',
        url: '',

      },
    }
  },

  computed: {
    subPN() {
      if (this.project.name) {
        if (this.project.name.length > 14) {
          return this.project.name.substring(0, 14) + '...';
        }
        return this.project.name;
      } else {
        return 'Undefined'
      }
    },
  },
  watch: {
    filtPag(value) {
      this.filt(value);
    }
  },

  methods: {

    sendDCR() {
      if(this.newDomain === '' || this.newDomain.length < 3) {
        this.DCRError = 'Введите название домена';
        return ;
      }
      if(this.dcr)
      {return}
      HTTP.post('/DCRrequest', JSON.stringify({
            id: this.project.id,
            new_domain_name: this.newDomain
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {

        if(res.data.code === 200)
        {
          this.domainRequest = !this.domainRequest;
         this.dcr =  res.data.message
        }
        else {
          this.DCRError = res.data.message
        }
      }).catch(err => {  this.DCRError = err});
    },
    searchingPage(event) {
      console.log(event);
      this.filt(this.filtPag);
      if (event === '') {
        return
      }
      this.filteredPages = this.filteredPages.filter(element => {
        return element.url.includes(event) || element.title.includes(event)
      })
    },
    filt(value) {
      this.filteredPages = this.pages.filter(it => {
        return it.tmpl == value;
      });
    },
    createOnTmpl(page) {

      HTTP.post('copypage', JSON.stringify(Object.assign({}, page, {project_id: this.project.id})), {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(r => {
        this.$router.push({
          path: '/page',
          query: {'pageid': r.data.id, 'projectid': this.project.id}
        })

      })

    },


    dublicatePage() {

      HTTP.post('copypage', JSON.stringify(this.pageedit), {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.getPages()
        this.pagesettings = !this.pagesettings
      })

    },

    editpages(page) {
      this.pageedit = JSON.parse(JSON.stringify(page));

      this.pageedit.project_id = this.project.id
      this.saveerror = '';
      this.pagesettings = !this.pagesettings
    },

    savepage() {

      HTTP.put('pages/' + this.pageedit.id, JSON.stringify(this.pageedit), {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res === undefined) {
          this.saveerror = 'Адрес занят'
        } else {
          this.saveerror = '';
          this.getPages()
          this.pagesettings = !this.pagesettings
        }


      })

    },
    switchtab(tab) {
      document.getElementsByClassName('td-tab-pane_active')[0].classList.remove('td-tab-pane_active');
      document.getElementsByClassName('td-popup-menu__item_active')[0].classList.remove('td-popup-menu__item_active');
      document.getElementById(tab).classList.toggle('td-tab-pane_active');
      document.getElementById('link_' + tab).classList.toggle('td-popup-menu__item_active');

    },

    deletePage(pageid) {
      if (confirm("Удалить страницу?")) {
        HTTP.delete('/pages',
            {
              headers: {
                "Content-Type": "application/json"
              },
              data: {
                id: pageid, project_id: this.id
              }
            }).then(() => {
          let ind = this.pages.findIndex(el => {
            return el.id === pageid;
          });
          if (ind >= 0) {
            this.pages.splice(ind, 1);
          }

          this.filt(this.filtPag);


        })
      }

    },
    publishAll() {
      document.getElementById('authleaner').hidden = false;
      HTTP.post('/publish', JSON.stringify({'all': 'all', project_id: this.id}),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(() => {
        this.pages.forEach(el => {
          el.is_public = 1;
          el.changed = 0;
        });
        this.filt(this.filtPag);


      }).catch(err => {
        console.log(err);
      }).finally(() => {
        document.getElementById('authleaner').hidden = true;
      })
    },
    publish(page) {
      HTTP.post('/publish', JSON.stringify({'pageid': page.id, project_id: this.id}),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }).then(() => {

        page.is_public = 1;
        page.changed = 0;
      })
    },
    createpage() {

      HTTP
          .post("pages", JSON.stringify({
            title: this.title,
            url: this.url,
            project_id: this.id,
            tmpl: this.is_tmps
          }), {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {

            this.$router.push({
              path: '/page',
              query: {'pageid': res.data.page.id, 'projectid': this.project.id}
            })
          })
          .catch(err => {
            this.error = err.response.data
          })
    },
    getPages() {
      document.getElementById('authleaner').hidden = false;
      HTTP.get('/project/' + this.id).then(res => {
        this.project = res.data.project
        this.pages = res.data.pages
        this.dcr = res.data.dcr

        this.filt(this.filtPag);

      }).finally(() => {
        document.getElementById('authleaner').hidden = true;
      })
    }
  },


  mounted() {
    this.getPages()
    this.filt(0);

  }
}
</script>

<style scoped>

.activChip {
  color: rgb(253, 120, 76);
}

.td-popup-menu__item_active:after {
  content: "" !important;
  background-color: black !important;
  width: inherit !important;
  height: 2px !important;
  margin-top: 7px !important;
  display: block !important;
}

.td-popup-menu__item a {
  color: black;
  padding: 0;
}

.newbtn {
  background-color: #fa876b !important;
}

.newbtn:hover {
  background-color: orangered !important;
}

.labelbtn {
  margin-left: 4px;
}

.sitepanelbtn {
  margin-right: 19px;
  font-size: 14px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  font-weight: 400;
  line-height: 14px;
}

.sitepanelbtn:hover {
  color: #fa886e;
  cursor: pointer;
}

.siteactpull {


}

.siteactions {
  display: none;

}

.sitedescr:hover .siteactions {
  display: block;
}

.sitedescr:hover .siteactpull {
  display: none;
}

.orangered:hover {
  color: #fa886e;
}

.sinename:hover {
  color: #fa886e;
  cursor: pointer;
}

.sitedescr:hover {

}

.iccc {
  margin-left: 13px;
  cursor: pointer;
  background-color: inherit;
}

.iccc:hover {
  color: #fa886e;
}

.sitedescr {
  height: 80px;
  margin-top: 15px;
  margin-bottom: 15px;

}
</style>