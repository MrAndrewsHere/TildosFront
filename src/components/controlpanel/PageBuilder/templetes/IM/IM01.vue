<template>


         <div class="t107">
             <linkwrap :linkitem="record.props.link">
                 <template slot="content">
             <div class="t-align_center">
                 <DefImage
                         :img="record.props.img"
                         :tclass="record.props.colwidth.val?'t107__width t-width t-width_'+record.props.colwidth.val+' t-img':'t107__widthauto t-img'"
                 >
                 </DefImage>
             </div>
                 </template>
             </linkwrap>
             <div class="t-container_8">

                 <div class="t-col t-col_8 t107__title t-text" >
                     <textblock v-if="record.props.text.val" :item="record.props.text"></textblock>
                 </div>
             </div>
         </div>




</template>

<script>


    import DefImage from "./DefImage";

    import Textblock from "../textblock";
    import Linkwrap from "../linkwrap";

    export default {
        name: "IM01",
        components: {Linkwrap, Textblock, DefImage},
        props: ['record'],
    }
</script>

<style scoped>

</style>