<template>
    <button class="custom-button" :class="colorClass()" @click="$emit('click')">
        <slot/>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        color: {
            type: String,
            default: 'orange'
        }
    },
    methods:{
        colorClass(){
            if(this.color === 'orange'){
                return 'custom-button_orange'
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .custom-button{
        display: block;
        text-transform: uppercase;
        font-family: "PT Sans";
        font-weight: bold;
        font-size: 1.4em;
        padding-top: 20px;
        padding-bottom: 13px;
        display: flex;
        justify-content: center;
        width: 100%;
        letter-spacing: 0.24px;
    }

    .custom-button:focus{
        outline: none;
    }

    .custom-button_orange{
        background-color: $orange;
        color: white;
    }

</style>