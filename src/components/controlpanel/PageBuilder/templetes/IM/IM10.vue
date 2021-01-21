<template>
    <div class="t195">
        <div class="t-container">


                <wrap-col-prefix :props="{tcol:record.props.tcol,tprefix:record.props.tprefix}">
                    <template v-slot:content>
                        <textblock  :item="record.props.text" :tclass="'t195__text t-text t-text_md'"></textblock>

                    </template>
                </wrap-col-prefix>

            <wrap-col-prefix :props="{tcol:record.props.tcol2,tprefix:record.props.tprefix2} " :tclass="'t195__imgsection'">
                <template v-slot:content>
                    <DefImage :img="record.props.img" :tclass="'t195__img t-img'"></DefImage>
                    <textblock v-if="record.props.title.val" :item="record.props.title" :tclass="'t195__sectitle t-descr'"></textblock>
                    <textblock v-if="record.props.description.val" :item="record.props.description" :tclass="'t195__secdescr t-descr'"></textblock>

                </template>
            </wrap-col-prefix>

        </div>
    </div>
</template>

<script>

    import DefImage from "./DefImage";
    import WrapColPrefix from "../wrapColPrefix";
    import Textblock from "../textblock";
    export default {
        name: "IM10",
        components: {Textblock, WrapColPrefix, DefImage},
        props: ['record'],
    }
</script>

<style scoped>

</style>