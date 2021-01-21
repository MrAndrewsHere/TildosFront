<template>
    <div class="t-menusub__content"
         :style="{
                                'background-color':containerStyle.backgroundcolor.val,
                                'border':containerStyle.border.val,
                              'min-width':containerStyle.width.val||(view||preview)?'':'100%',
                              'box-shadow':'none'
                            }">

        <ul class="t-menusub__list">
            <li v-for="(item,index) in conItems" :key="index" class="t-menusub__list-item t-name t-name_xs" :style="{
                   'margin-top':containerStyle.marginTop.val
            }">
                <menulink
                        :linkclass="'t-menusub__link-item t-name t-name_xs'"
                        :linkstyle="linkstyle"
                        :linkitem="item.link"
                ></menulink>
            </li>
        </ul>
    </div>
</template>

<script>
    import Menulink from "./menulink";

    export default {
        name: "subcontainer",
        components: {Menulink},
        props: ['conItems', 'containerStyle','linkstyle'],
        computed: {
            view: {
                get() {
                    return this.$route.meta.mode === 'view';
                }
            },
            preview: {
                get() {
                    return this.$route.meta.mode === 'preview';
                }
            }
        },
    }
</script>

<style scoped>

</style>