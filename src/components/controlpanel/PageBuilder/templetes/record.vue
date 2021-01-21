<template >

    <div :data-intersectBlock="index">
        <div class="r"  v-show="!props.hidden" :id="props.id"
             :style="computeStyle(props||[])"

        >
            <slot name="slotcomponent"></slot>

        </div>
        <div v-if="props.hidden && !publics">
            <v-row justify="center" align="center" no-gutters style="height: 60px;background-color: rgba(0,0,0,0.2)">
                <span class="overline">Блок скрыт</span>
            </v-row>
        </div>
    </div>



</template>


<script>
    import {forstyles} from "../mixins/ComponentMethods"

    export default {
        name: "record",
        props: ['props','index'],
        mixins: [forstyles],
        computed: {
            publics: {
                get() {
                    return this.$route.meta.mode === 'view' || this.$route.meta.mode === 'preview';
                }
            },

        },


    }
</script>

<style scoped>

</style>