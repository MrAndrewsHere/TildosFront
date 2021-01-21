<template>

    <div class="t-cover"
         :style="{
          'height':resizeCovContent(),

                 'background-image':'-webkit-linear-gradient(top, #ccc, #777)',
                 'background-image':'-moz-linear-gradient(top, #ccc, #777)',
                ' background-image':'-o-linear-gradient(top, #ccc, #777)',
                ' background-image':'-ms-linear-gradient(top, #ccc, #777)',
                ' background-image':'linear-gradient(top, #ccc, #777)',
                 }">

        <div class="t-cover__carrier"

             :data-content-cover-height="resizeCovContent()" data-content-cover-parallax="fixed"
             :style="{'background-image':'url('+record.props.cov_img.val+')',
                     'height':resizeCovContent(),
                     'background-attachment': record.props.cover.effect.val,
                     'filter':'brightness('+record.props.cover.filter.val+')'}">

        </div>

        <div class="t-cover__filter"
             style=" height:100vh;
             background-image: -moz-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70));
             background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70));
             background-image: -o-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70));
             background-image: -ms-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70));
             background-image: linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.70));
             filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#4c000000', endColorstr='#4c000000');"
        ></div>


        <slot v-on:resizeCovContent="resizeCovContent" name="content"></slot>


    </div>

</template>

<script>


    export default {
        name: "wrap_cover",
        components: {},
        props: ['record', 'contentSize'],
        methods: {
            resizeCovContent() {
                return Math.max(this.contentSize, this.$vuetify.breakpoint.height) + 'px';


            }
        }
    }

</script>

<style scoped>

</style>