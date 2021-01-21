<template>
    <wrap_cover :record="record" :contentSize="contentSize">
        <template v-slot:content> <div class="t-container">
          <div :class="'t-cover__wrapper t-valign_'+record.props.valign.val" >
              <div class="t032" ref="container" v-resize="resize" >
                  <div class="t032__wrapper" data-hook-content="covercontent">
                      <textblock :item="record.props.title"></textblock>

                      <div class="t-row">
                          <div class="t-col t-col_2 t-prefix_5">
                              <div class="t032__line" style=""></div>
                          </div>
                      </div>
                      <div class="t-row">
                          <div class="t-col t-col_10 t-prefix_1">
                              <textblock :item="record.props.description"></textblock>
                          </div>
                      </div>
                      <span class="space"></span>
                  </div>
              </div>
          </div>
        </div></template>
    </wrap_cover>
</template>

<script>
    import wrap_cover from "./wrap_cover";
    import Textblock from "../textblock";
    export default {
        name: "cov03",
        components: {Textblock, wrap_cover},
        props:['record'],
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