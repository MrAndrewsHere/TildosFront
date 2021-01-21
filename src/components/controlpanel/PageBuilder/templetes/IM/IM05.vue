<template>
    <wrap_cover :record="record">
        <template slot="content">
            <div class="t208">
                <div class="t-container">
                    <wrap-col-prefix :props="{tcol:record.props.tcol,tprefix:record.props.tprefix}">
                        <template slot="content">
                            <div :class="'t-cover__wrapper t-valign_'+record.props.valign.val" :style="{'height':record.props.cover.cov_h.val}">
                                <div data-hook-content="covercontent">
                                    <div class="t208__wrapper">
                                        <div class="t208__textwrapper" :style="{'background-color':record.props.textbackground.val}">
                                            <textblock :item="record.props.text" :tclass="'t208__text t-text t-text_sm'" ></textblock>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </wrap-col-prefix>

                    </div>
                </div>
        </template>
    </wrap_cover>

</template>

<script>
    import wrap_cover from "../COV/wrap_cover";
    import WrapColPrefix from "../wrapColPrefix";
    import Textblock from "../textblock";
    export default {
        name: "IM05",
        components: {Textblock, WrapColPrefix, wrap_cover},
        props:['record']
    }
</script>

<style scoped>

</style>