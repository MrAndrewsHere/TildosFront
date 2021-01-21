<template>
    <div>
        <froala @input="$emit('update_content',$event)"  v-model="content"></froala>
    </div>
</template>

<script>
    export default {
        name: "textedtor",
        props:['value'],
        data(){
            return{
                content: this.value,
            }
        },
        methods:{
            al(html){
                alert(html);
            },
        },
    }
</script>

<style scoped>

</style>