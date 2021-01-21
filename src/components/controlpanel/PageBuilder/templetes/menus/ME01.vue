<template>
    <!-- T456 -->

    <div>
        <div id="firstcontainer" :class="'t456__maincontainer '+props.menucolwidth.val  "

             :style="{
            'height':'80px',
            'background-color':props.firstBackground.val,
            'display':viewport?'none':'block'}">

            <div class="t456__leftwrapper" style="">
                <div style="display: block;">
                    <a :href="props.logolink.val" style="color:#ffffff;"> <img
                            :src="props.logo.val"
                            class="t456__imglogo t456__imglogomobile" imgfield="img"
                            :style="{'max-width': '80px', 'width': props.logosize.val}" alt="Company">
                    </a>
                </div>
            </div>

            <div class="t456__rightwrapper t456__menualign_left" style="">

                <div>
                    <a :href="props.logolink.val" :style="{'margin-left':props.sitenamemarginleft.val,
                    'color':props.sitenamecolor.val}">
                        <div class="t456__logo t-title" field="title" :style="{  'color':props.sitenamecolor.val}">
                            {{props.sitename.val}}
                        </div>
                    </a>
                </div>
            </div>

        </div>

        <div :class="'t456__maincontainer '+props.menucolwidth.val "
             :style="{'height:':'80px','background-color':props.secondBackground.val}">


            <div :class="'t456__rightwrapper t456__menualign_'+props.align.val" style="">
                <ul class="t456__list">
                    <li v-for="(item,index) in props.items" :key="index" class="t456__list_item">

                        <v-menu v-if="item.subitems.length >0 && !viewport"
                                z-index="5000"
                                :min-width="props.submenucontainer.width.val"
                                :open-on-hover="true" :tile="true"
                                :offset-y="true" :offset-x="false" :nudge-left="15"


                        >
                            <template v-slot:activator="{on,attr}">
                            <span v-on="on" v-bind="attr">
                                   <menulink
                                           :linkclass="'t-menu__link-item t-menusub__target-link'"
                                           :linkstyle="props.menuitemstyle"
                                           :linkitem="item.link"
                                   >
                                        <template v-if="props.submenucontainer.submenuicon.val" slot="arrow">
                            <div class="t-menusub__arrow" :style="{'color':props.menuitemstyle.color.val}"></div>
                        </template>
                                   </menulink>
                            </span>


                            </template>

                            <div class="t-menusub " :style="{'box-shadow':props.submenucontainer.boxshadow.val,}">
                                <div class="t-menusub__menu t-menusub__menu_bottom " style="max-width: 500px;">
                                    <subcontainer
                                            :containerStyle="props.submenucontainer"
                                            :conItems="item.subitems"
                                            :linkstyle="props.submenuitemstyle"
                                    >

                                    </subcontainer>

                                </div>
                            </div>
                        </v-menu>
                        <div v-else-if="item.subitems.length >0 && viewport">

                    <a
                            @click="openmobilemenu($event)"
                            class="t-menu__link-item t-menusub__target-link t-menusub__target-link_active"

                            :style="{
                   'color':props.menuitemstyle.color.val,
                   'font-weight':props.menuitemstyle.weight.val,
                   'font-size':props.menuitemstyle.fontsize.val,
                   'text-transform':props.menuitemstyle.texttransform.val,
                   'letter-spacing':props.menuitemstyle.letterspacing.val}"
                            v-html="item.link.linkname"
                        >


                    </a>
                        <div class="t-menusub" :style="{'background-color':props.submenucontainer.backgroundcolor.val}">
                            <div class="t-menusub__menu t-menusub__menu_bottom t-menusub__menu_show"
                                 style="display: none; left: 10px; top: 0px;">
                                <div class="t-menusub__content">
                                    <ul class="t-menusub__list" >
                                        <li v-for="(child,inde) in item.subitems" :key="inde" class="t-menusub__list-item t-name t-name_xs">
                                            <menulink
                                                    :linkclass="'t-menusub__link-item t-name t-name_xs'"
                                                    :linkstyle="props.submenuitemstyle"
                                                    :linkitem="child.link"
                                            ></menulink>
                                           </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <menulink v-else
                              :linkclass="'t-menu__link-item'"
                              :linkstyle="props.menuitemstyle"
                              :linkitem="item.link"
                    >

                    </menulink>


                    </li>


                </ul>
            </div>

        </div>
    </div>


</template>

<script>

    import Menulink from "./menulink";
    import Subcontainer from "./subcontainer";

    export default {
        name: "ME01",
        components: {Subcontainer, Menulink},
        props: ['props'],
        data: () => {
            return {
                val: true,

            }
        },
        computed: {
            viewport: {
                get() {
                    return this.$vuetify.breakpoint.mdAndDown;
                }
            }
        },
        methods:{

            openmobilemenu(e){
                e.preventDefault();

                let submenu = e.target.nextSibling.children[0];
                if(submenu.style.display === 'block')
                {
                    submenu.style.display='none'
                }
                else

                {
                    submenu.style.display='block'
                }

            }
        }
    }
</script>

<style scoped>


    .v-menu__content {
        border-radius: 0 !important;
        box-shadow: none !important;
    }

    @media screen and (max-width: 980px) {
        .t-menusub__menu .t-menusub__link-item {
            color: #000000 !important;
        }

        .t-menusub__menu .t-menusub__link-item.t-active {
            color: #000000 !important;
        }
    }

    .t456 {
        filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#D9ffffff', endColorstr='#D9ffffff');
    }

    @media screen and (max-width: 980px) {
        .t456__leftcontainer {
            padding: 20px;
        }
    }

    @media screen and (max-width: 980px) {
        .t456__imglogo {
            padding: 20px 0;
        }
    }

    @media screen and (max-width: 980px) {
        .t454__leftcontainer {
            padding: 20px;
        }
    }

    @media screen and (max-width: 980px) {
        .t454__imglogo {
            padding: 20px 0;
        }
    }


    @media screen and (max-width: 980px) {
        .t-menusub__menu .t-menusub__link-item {
            color: #000000 !important;
        }

        .t-menusub__menu .t-menusub__link-item.t-active {
            color: #000000 !important;
        }
    }

    .t454 {
        filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#D9ffffff', endColorstr='#D9ffffff');
    }
</style>