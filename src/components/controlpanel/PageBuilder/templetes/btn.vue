<template>


    <div class="t650__submit t-btn t-btn_xs"
         @click="view||preview?pushRoute($event):''"
         :style="computeStyle(btnstyles||btn)"
         v-html="linkitem.linkname">
    </div>
</template>

<script>
    import {forstyles} from "../mixins/ComponentMethods";
    import {linkRoute} from "../mixins/ComponentMethods";

    export default {
        name: "btn",
        props:['linkitem','btnstyles'],
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

    }
</script>

<style scoped>

</style>