<template>
    <div class="t194">
        <div class="t-container">
            <wrap-col-prefix :props="{tcol:record.props.tcol,tprefix:record.props.tprefix}">
                <template v-slot:content>
                    <textblock  :item="record.props.text" :tclass="'t194__text t-text t-text_md'"></textblock>

                </template>
            </wrap-col-prefix>
           <wrap-col-prefix :props="{tcol:record.props.tcol2,tprefix:record.props.tprefix2,align:record.props.align}">
               <template v-slot:content>
                   <DefImage :img="record.props.img" :tclass="'t194__img t-width t-width_'+record.props.tcol.val+' t-img'"></DefImage>
                   <textblock v-if="record.props.title.val" :item="record.props.title" :tclass="'t194__sectitle'"></textblock>
                   <textblock v-if="record.props.description.val" :item="record.props.description" :tclass="'t194__secdescr'"></textblock>

               </template>
           </wrap-col-prefix>


        </div>
    </div>
</template>

<script>
    import WrapColPrefix from "../wrapColPrefix";
    import DefImage from "./DefImage";
    import Textblock from "../textblock";
    export default {
        name: "IM11",
        components: {Textblock, DefImage, WrapColPrefix},
        props: ['record']
    }
</script>

<style scoped>

</style>