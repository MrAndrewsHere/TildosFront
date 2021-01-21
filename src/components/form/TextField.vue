<template>
    <div class="custom-input">
        <img class="custom-input__icon" v-if="icon == 'login'" src="../../assets/icon_login.svg">
        <input :name="name" :type="type" class="custom-input__input" :placeholder="placeHolder" v-model="localValue">
        <span class="custom-input__error-message" :class="{'custom-input__error-message_hidden' : !errorMessage}" >{{ errorMessage }}</span>
    </div>
</template>

<script>

export default {
    name: "TextField",
    props: {
        value: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        placeHolder:{
            type: String,
            default: ''
        },
        icon:{
            type: String,
            default: ''
        },
        errorMessage:{
            type: String,
            default: ''
        },
        type:{
            type: String,
            default: ''
        },

    },
    data(){
        return {

        }
    },
    computed:{
        localValue:{
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    },
    methods:{

    }
}
</script>

<style scoped lang="scss">
    .custom-input{
        border: 2px solid $orange;
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 14px;
        position: relative;
        margin-bottom: 29px;
    }

    .custom-input__error-message{
        font-family: "PT Sans";
        font-size: 0.9em;
        color: red;
        position: absolute;
        bottom: -20px;
        transform: scaleY(1);
        transition: 0.3s;
    }

    custom-input__error-message_hidden{
        transform: scaleY(0);
    }

    .custom-input__icon{
        margin-right: 14px;
    }

    .custom-input__input{
        font-family: "PT Sans";
        font-weight: bold;
        font-size: 1.2em;
    }

    .custom-input__input:focus, textarea:focus, select:focus{
        outline: none;
    }

</style>