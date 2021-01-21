<template>
    <div >
        <div id="nav209822634marker"></div>
        <div ref="burg" class="t456__mobile" v-show="record.props.burger">
            <div class="t456__mobile_container">
                <linkwrap :linkitem="record.props.logolink">
                    <template slot="content">
                        <div class="t456__mobile_text t-name t-name_md" field="text"
                             v-html="record.props.mobilename.val||'&nbsp;'"></div>
                    </template>
                </linkwrap>
                <div class="t456__burger"
                     @click="$refs.burg.classList.toggle('t456_opened'), $refs.menuss.classList.toggle('t456__hidden')">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div ref="menuss" id="menussss"
             :class="record.props.burger.val?
                  record.props.tmplclass+' '+ ' t456__hidden '+  record.props.tmplclass+'__position'+record.props.positionmenu.val
                 :record.props.tmplclass+' '+  record.props.tmplclass+'__position'+record.props.positionmenu.val + ' '"

             :style="{'background-color': record.props.default.backgroundcolor.val,
                 'position':view?'':'static',
                 'height':'160px',
                 'box-shadow':record.props.boxshadow.val}"
        >

            <component :is="record.code" :props="record.props"></component>

        </div>


        <div class="t-menusub__container " v-if="!view" style="background-color: grey;margin-top: 80px">
            <div class="chest">

                <span v-for="(item,index) in record.props.items" :key="index">
                      <div  v-if="item.subitems.length >0" class="t-menusub" style="padding-bottom:30px;"
                      >

                    <div class="t-menusub__menu t-menusub__menu_show"
                         style="display:block;position:initial;margin:0px auto;">
                        <subcontainer
                                :containerStyle="record.props.submenucontainer"
                                :conItems="item.subitems"
                                :linkstyle="record.props.submenuitemstyle"
                        >
                        </subcontainer>
                    </div>
                </div>
                </span>


            </div>
        </div>

    </div>
</template>

<script>

    import ME01 from "./ME01";
    import Menulink from "./menulink";
    import Subcontainer from "./subcontainer";
    import Linkwrap from "../linkwrap";

    export default {
        name: "menuwrap",
        components: {Linkwrap, Subcontainer, Menulink, ME01},
        props: ['record'],
        computed: {

            view: {
                get() {
                    return this.$route.meta.mode === 'view';
                }

            }
        },
        methods:{

        },



    }
</script>

<style>
    .chest {
        background:
                radial-gradient(black 15%, transparent 16%) 0 0,
                radial-gradient(black 15%, transparent 16%) 8px 8px,
                radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
                radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
        background-color:#282828;
        background-size:16px 16px;
        padding-top: 20px;

    }


    .t-menu__link-item>a{
        color: black!important;
    }
    @media screen and (max-width: 980px) {
        .t456__mobile {
            background-color: #111;
            display: block;
        }

        .t-menusub__menu .t-menusub__link-item {
            color: #ffffff;
        }

        .t-menusub__menu .t-menusub__link-item.t-active {
            color: #ffffff !important;
        }


        .t456__hidden {
            display: none;
            height: 100%;
        }
    }

    .t-menusub__menu {
        /*position: absolute;*/
        /*display: none;*/
        /*opacity: 0;*/
        z-index: 6000000;
        /*width: 100%;*/
        max-width: 100px;
        background-color: #fff;
        text-align: center;
        /*border-radius: 3px;*/
        -webkit-box-shadow: 0 0 7px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 0 7px 0 rgba(0, 0, 0, .2);
        border-radius: 0;
        -webkit-font-smoothing: antialiased;
        -o-transition: opacity .2s cubic-bezier(.895, .03, .685, .22);
        transition: opacity .2s cubic-bezier(.895, .03, .685, .22);
        -webkit-transition: opacity .2s cubic-bezier(.895, .03, .685, .22)
    }

    .t-menusub__menu_show {
        opacity: 1
    }

    .t-menusub__menu:after, .t-menusub__menu:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 10px;
        right: 50%;
        -webkit-transform: translateX(50%);
        -ms-transform: translateX(50%);
        transform: translateX(50%)
    }

    .t-menusub__menu_bottom {

    }

    .t-menusub__menu_bottom:after, .t-menusub__menu_bottom:before {
        top: -20px;
        border-bottom-color: #fff
    }

    .t-menusub__menu_top:after, .t-menusub__menu_top:before {
        bottom: -20px;
        border-top-color: #fff
    }

    .t-menusub__content {
        padding: 18px 20px
    }

    .t-menusub__list {
        padding-left: 0 !important;
        list-style-type: none;
        margin-bottom: 0 !important
    }

    .t-menusub__list-item {
        margin-bottom: 12px
    }

    .t-menusub__list-item:last-child {
        margin-bottom: 0
    }

    .t-menusub__link-item {
        display: block;
        width: 100%;
        font-size: 14px;
        text-decoration: none;
        white-space: normal;
        color: #222
    }

    #allrecords .t-menusub__link-item {
        color: #222
    }

    .t-menusub__arrow {
        display: inline-block;
        vertical-align: middle;
        margin-left: 6px;
        position: relative;
        width: 6px;
        border-color: inherit
    }

    .t-menusub__arrow:after {
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4px 3px 0 3px;
        position: absolute;
        top: 45%;
        left: 0;
        -ms-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        border-color: transparent transparent transparent transparent;
        border-top-color: inherit
    }

    @media screen and (max-width: 980px) {
        .t-menusub__menu {
            position: relative;
            top: 0 !important;
            left: 0 !important;
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            text-align: center;
            background-color: transparent;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid rgba(0, 0, 0, .15);
            -webkit-box-shadow: none;
            box-shadow: none
        }

        .t-menusub__menu:after, .t-menusub__menu:before {
            display: none
        }

        .t-menusub__list-item {
            margin-bottom: 16px
        }
    }
</style>