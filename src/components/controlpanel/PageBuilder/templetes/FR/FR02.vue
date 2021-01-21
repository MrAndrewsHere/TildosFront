<template>
        <!-- t490 -->
  <div>
    <linkwrap v-if="!item.hidden" :linkitem="item.link">
      <template slot="content">
        <img :src="item.icon.val"
             class="t490__img  t-img" imgfield="li_img__1476968690512" data-tu-max-width="400"
             data-tu-max-height="400" id="tuwidget307772"
             :style=" {'width':itemstlyes.imgwidth.val,'max-width':'300px','margin-bottom':itemstlyes.itemcontentpadding.val}">

      </template>
    </linkwrap>
    <div class="t490__wrappercenter " >
      <textblock :tclass="'t-heading t-heading_md'" :item="item.title" :tsyle="itemstlyes.title"></textblock>
      <textblock :tclass="'t-descr t-descr_xs'" :item="item.description" :tsyle="itemstlyes.description"></textblock>
    </div>
  </div>

</template>

<script>
    import textblock from "../textblock";
    import Linkwrap from "../linkwrap";
    export default {
        name: "FR02",
        components: {Linkwrap, textblock},
        props: ['item','itemstlyes'],
    }
</script>

<style scoped>

</style>