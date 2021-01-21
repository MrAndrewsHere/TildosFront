<template>
    <div>
        <slot/>
    </div>
   

</template>

<script>



    export default {
        name: "DefaultLayout",
        components:{

        },

        mounted(){

        }
    }
</script>



<style scoped>
    .home-container{
        padding-top: 45px;
        padding-bottom: 90px;
        display: flex;
        justify-content: center;
    }

    .home-link{
        user-select: none;
        color: #18224b;
        border: 2px solid #18224b;
        font-family: 'Arial',Arial,sans-serif;
        font-size: 14px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 135px;
        height: 44px;
        text-decoration: none;
        text-transform: uppercase;
    }


</style>