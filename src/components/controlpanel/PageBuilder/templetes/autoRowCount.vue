<template>
    <div class="t-container">



        <div v-for="(row,indexRow) in (Math.trunc((items.length-1)/colcount.val)+1 )" :key="indexRow" :class="tmplclass+'__row'" :style="{'margin-top':styles.vmargin.val}">
            <div v-for="(item,indexItem) in chunk(items,colcount.val)[indexRow]" :key="indexItem" :class="tmplclass+'__col t-col t-col_'+(12/colcount.val)+' t-align_'+align">
              <slot name="listItemContent" v-bind:item="item"></slot>


            </div>
            <slot v-if="row !== colcount.val-1" name="separator">

            </slot>


        </div>
    </div>

</template>

<script>
    export default {
        name: "autoRowCount",
        props:['colcount','tmplclass','items','align','styles'],
        computed:{

        },
        methods:{
             chunk(array, size) {
        const chunked_arr = [];
        let index = 0;
        while (index < array.length) {
            chunked_arr.push(array.slice(index, size + index));
            index += size;
        }
        return chunked_arr;
    }
        }
    }
</script>

<style scoped>

</style>