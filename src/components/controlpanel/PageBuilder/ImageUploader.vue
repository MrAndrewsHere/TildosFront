<template>
    <label class="main" :style="{'width': elWidth, 'height': elHeight}" >

        <img v-if="mode === 'image' && url != null && url !== ''" :src="url" :height="elHeight" :width="elWidth" >

        <span class="overline py-2" v-if="mode === 'url'"  >
            <v-icon color="#FF6D00" size="20">mdi-image</v-icon>
            {{value}} </span>
        <slot name="content" v-if="mode==='wrap'"></slot>
        <v-progress-linear

                v-if="loading"
                style="position: absolute; bottom: 0"
                indeterminate
                color="#fa876b"
        ></v-progress-linear>

        <input type="file" style="display: none" accept="image/vnd.sealedmedia.softseal.jpg,image/png,image/jpeg" @change="uploadFile">
    </label>
</template>

<script>
    import {HTTP} from "../../../axios";

    export default {
        name: "ImageUploader",
        props: [
            'value',
            'width',
            'height',
            'mode'
        ],
        data(){
            return{
                loading: false,
                url: this.value
            }
        },
        computed:{
            elWidth(){
                return this.width ? (this.width + "px") : "auto"
            },
            elHeight(){
                return this.height ? (this.height + "px") : "auto"
            },
        },
        watch: {
            url(){
                this.$emit('download', this.url)
            }
        },
        methods:{
            uploadFile(event){
                if(event.target.files[0])
                {
                    this.loading = true;
                    var postData = new FormData()
                    postData.append('file', event.target.files[0])
                    HTTP
                        .post('files', postData)
                        .then(r => {
                            this.url = r.data.file.url
                            this.loading = false
                        })
                }

            }
        }
    }
</script>

<style scoped>
    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
    }
</style>