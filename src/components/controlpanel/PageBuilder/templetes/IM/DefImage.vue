<template>
    <ImageUploader :mode="'wrap'" v-if="edit" :value="img.val" @download="img.val = $event" >
        <template v-slot:content>
            <img :src="img.val"
                 :class="tclass"
                 :style="computeStyle(Object.assign(defaultStyle,tstyle||[]))">
        </template>
    </ImageUploader>

    <img v-else :src="img.val"
         :class="tclass"
         :style="computeStyle(Object.assign(defaultStyle,tstyle||[]))">

</template>

<script>
    import {forstyles} from "../../mixins/ComponentMethods";
    import ImageUploader from "../../ImageUploader";
    export default {
        name: "DefImage",
        components: {ImageUploader},
        props:['img','tclass','tstyle'],
        mixins:[forstyles],
        data:()=>{
            return {
                defaultStyle:{
                    opacity:{styleElement:'opacity',val:1}
                }
            }
        },
        computed: {
            edit: {
                get() {
                    return this.$route.meta.mode === 'edit';
                }
            },

        },
    }
</script>

<style scoped>

</style>