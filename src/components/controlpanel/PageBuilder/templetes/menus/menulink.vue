<template>
    <span :style="{ 'margin':linkstyle.margin?linkstyle.margin.val:''}">
          <a :class="linkclass"
             @click="view||preview?pushRoute($event):''"
             :style="computeStyle(linkstyle||linkitem)"
             v-html="linkitem.linkname"
          >

    </a>
        <slot name="arrow">

        </slot>
    </span>


</template>

<script>
    import  {forstyles} from "../../mixins/ComponentMethods";
    import  {linkRoute} from "../../mixins/ComponentMethods";


    export default {
        name: "menulink",
        props: ['linkclass', 'linkstyle', 'linkitem'],
        mixins:[forstyles,linkRoute],
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
        // href.replace(/(\W)(pageid=)\d+/,'$1$2'+this.linkitem.link.pageid);

    }
</script>

<style scoped>

</style>