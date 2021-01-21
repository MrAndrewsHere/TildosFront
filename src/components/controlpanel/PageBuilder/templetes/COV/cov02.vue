<template>
    <wrap_cover :record="record" :contentSize="contentSize">
        <template v-slot:content>
            <div class="t-container" >
                    <div class="t-col t-col_12 " ref="container" v-resize="resize" >
                    <div class="t-cover__wrapper t-valign_middle" style="">
                        <div class="t001 t-align_center">
                            <div class="t001__wrapper" data-hook-content="covercontent">
                                <textblock :item="record.props.subtitle"></textblock>
                                <textblock :item="record.props.title"></textblock>
                                <textblock :item="record.props.description"></textblock>
                                <span class="space"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </wrap_cover>
</template>

<script>
    import wrap_cover from "./wrap_cover";
    import Textblock from "../textblock";

    export default {
        name: "cov02",
        components: {Textblock, wrap_cover},
        props: ['record'],
        data:()=>{
            return {
                contentSize:'',
            }
        },

        methods:{
            resize(){
                this.contentSize =  this.$refs.container.offsetHeight


            }

        },



    }
</script>

<style scoped>

</style>