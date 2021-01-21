<template>
    <div ref="container" class="t650__inner-col"
         :style="computeStyle(itemstlyes)"
     >
        <div ref="cardtext" class="t650__text">
            <textblock :tclass="'t-name t-name_lg t650__bottommargin'" :item="item.title" :tsyle="itemstlyes.title">

            </textblock>
            <textblock :tclass="'t-text t-text_sm'" :item="item.description" :tsyle="itemstlyes.description">

            </textblock>


        </div>
        <div class="t650__btn-container">
            <div class="t650__btn-wrapper">
               <btn :linkitem="item.btn" :btnstyles="itemstlyes.btnprops"></btn>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from "../btn";
    import Textblock from "../textblock";
  import {forstyles} from "../../mixins/ComponentMethods";

    export default {
        name: "TE01",
        components: {Textblock, Btn},
        props:['item','itemstlyes'],
        mixins: [forstyles],
        computed: {

            cardtextHeight:{
                get(){
                    return this.$refs.cardtext.offsetHeight;
                }
            }
        },

        methods:{
          setHeight(){
              this.$refs.container.style.height = this.cardtextHeight+71+'px';
          }
        },
        mounted() {
            this.setHeight();
        },
        updated() {
            this.setHeight();
        },



    }


</script>

<style scoped>

</style>