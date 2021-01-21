<template>
    <div :class="record.props.tmplsclass">
        <div :class="'t-container t-align_'+record.props.align.val">
            <div :class="'t-col '+'t-col_'+record.props.tcol.val+' t-prefix_'+record.props.tprefix.val">

                <textblock v-if="record.props.subtitle"  :item="record.props.subtitle"></textblock>


                <textblock v-if="record.props.title"  :item="record.props.title"></textblock>


                <textblock v-if="record.props.description" :item="record.props.description"></textblock>

            </div>
        </div>
    </div>
</template>

<script>
    import Textblock from "./textblock";
    export default {

        name: "titlewrap",
        components: { Textblock},
        props:['record'],
        data(){
            return{

            }
        },
    }
</script>

<style scoped>

</style>