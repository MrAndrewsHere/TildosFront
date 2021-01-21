<template>
    <div    v-if="item.val"    :class="item.class?item.class:tclass"
         :style="computeStyle(tsyle||item)" >
        <span v-if="view " v-html="item.val"></span>

        <HtmlEditor  v-if="edit"  @updateContent="updateContent($event)"  :value="item.val"></HtmlEditor>

    </div>
</template>

<script>
    import HtmlEditor from "../HtmlEditor";
    import {forstyles} from "../mixins/ComponentMethods"
    export default {
        name: "textblock",
        components: {HtmlEditor},
        mixins:[forstyles],
        props:['item','tclass','tsyle'],
        data:()=>{
            return {

            }
        },
        // mounted() {
        //     this.resize();
        // },
        computed:{

           view(){
               return this.$route.meta.mode === 'view'
           },
            edit(){
                return this.$route.meta.mode === 'edit'
            },
        },


        methods:{
            resize(){
                let elems = document.getElementsByClassName('QuillFontClass');
                let countEl = elems.length;
                if(countEl>0)
                {
                    elems.forEach(e => {
                        let value = e.dataset.basefontsize.replace('px', '');
                        let lineheight = e.dataset.baselineheight;
                        if (lineheight)
                        {lineheight = lineheight.replace('px','')}

                        if(window.innerWidth >= 320 && window.innerWidth < 960)
                        {

                            if(value)
                            {
                                let m =(value-value/2)/640;
                                let b = value/2-m*320;
                                let f = m*window.innerWidth+b;
                                e.style.fontSize =  f+'px';

                                if(lineheight)
                                {
                                    let k1 = (value/2)*(1.3333 - 1.2);
                                    let k2 = value*(1.2 - 1.2);
                                    let m2 = (k2-k1)/640;

                                    let b2 = k1-(m2*320);
                                    let f2 = m2*window.innerWidth+b2;
                                    console.log('lineheight'+f2)
                                    e.style.lineHeight =  f2;
                                }
                                else
                                {

                                    let f2 = -0.005*window.innerWidth + 4.8;
                                    console.log('lineheight'+f2)
                                    e.style.lineHeight =  f2;
                                }

                            }
                            else {
                                if(lineheight)
                                {

                                    let f2 = -0.005*window.innerWidth + 4.8;
                                    console.log('lineheight'+f2)
                                    e.style.lineHeight =  f2;
                                }
                            }


                        }
                        else
                        {

                            e.style.fontSize =  value+'px';

                        }

                    });

                }


            },
            updateContent(e){

                this.item.val = e;
            }
        },


    }
</script>

<style >

 p{
     margin-bottom: 0px!important;
 }
</style>