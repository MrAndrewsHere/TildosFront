<template>
    <div class="t-container">
    <div v-for="(item,index) in props.items" :key="index">
        <div v-if="!item.hidden">

                    <div :class="'t-col t-col_'+props.tcol.val+' t-prefix_'+props.tprefix.val+' t-item'">

                        <div class="t-cell t-valign_top">
                          <linkwrap :linkitem="item.link">
                            <template slot="content">
                            <div class="t508__bgimg  t-bgimg"
                                 :data-original="item.icon.val"
                                 :style=" {'background-image': 'url('+item.icon.val, 'height':props.itemsStyle.imgwidth.val,'width':props.itemsStyle.imgwidth.val,'max-width':'100px'}"
                                 data-tu-max-width="400" data-tu-max-height="400" id="tuwidget718453"></div>
                            </template>
                          </linkwrap>
                        </div>

                        <div class="t508__textwrapper t-cell t-valign_top" :style="{'padding-left':props.itemsStyle.itemcontentpadding.val}" >
                            <textblock :tclass="'t-name t-name_md t508__bottommargin'" :item="item.title" :tsyle="props.itemsStyle.title"></textblock>
                            <textblock :tclass="'t-descr t-descr_sm'" :item="item.description" :tsyle="props.itemsStyle.description"></textblock>

                        </div>
                    </div>

                    <div class="t-clear t508__separator" :style="{'margin-bottom':props.itemsStyle.itemcontentmarginbottom.val}"></div>


        </div>
    </div>
    </div>
</template>

<script>
    import Textblock from "../textblock";
    import Linkwrap from "../linkwrap";
    export default {
        name: "FR01",
        components: {Linkwrap, Textblock},
        props: ['props'],
        methods:{

        }
    }
</script>

<style scoped>

</style>