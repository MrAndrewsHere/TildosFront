<template>
    <a :class="linkclass"
       @click="view||preview?pushRoute($event):''"
       :style="computeStyle(linkstyle||linkitem)"
    >
        <slot name="content">
        </slot>
    </a>
</template>

<script>
    import {forstyles} from "../mixins/ComponentMethods";
    import {linkRoute} from "../mixins/ComponentMethods";

    export default {
        name: "linkwrap",
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
    }
</script>

<style scoped>

</style>