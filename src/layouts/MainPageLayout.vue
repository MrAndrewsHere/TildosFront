<template>
   <div>
       <slot/>
   </div>
</template>

<script>
    // @ is an alias to /src


    export default {
        name: 'MainPageLayout',
        components: {

        },
        mounted() {
            // var mode = process.env.NODE_ENV;
            // if(mode == "production"){
            //     let script = "VK.Widgets.CommunityMessages('vk_community_messages', 115982637, {tooltipButtonText: 'Есть вопрос?'});"
            //     let VKScript = document.createElement('script')
            //     VKScript.text = script
            //     document.body.appendChild(VKScript)
            //
            //
            // }
        }
    }
</script>
