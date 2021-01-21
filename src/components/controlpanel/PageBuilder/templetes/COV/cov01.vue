<template>



        <wrap_cover :record="record">
            <template v-slot:content>
                <div class="t306">
                    <div class="t-container">
                        <div class="t-cover__wrapper t-valign_middle" style="height:100vh;">
                            <div class="t306__table-container">
                                <div :class="'t306__table-cell t-align_'+record.props.align.val" style="height:100vh;">
                                    <img :src="record.props.logo.val"
                                         imgfield="img2" data-tu-max-width="800" data-tu-max-height="800"
                                         class="t306__img" data-hook-clogo="coverlogo" id="tuwidget545192"
                                         :style="{'opacity': 1, 'width': record.props.logosize.val}">


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

        </wrap_cover>



</template>

<script>
    import wrap_cover from "./wrap_cover";

    export default {
        name: "cov01",
        props: ['record'],
        components: {wrap_cover}
    }
</script>

<style scoped>

</style>