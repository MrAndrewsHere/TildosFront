<template>
    <div :class="
    't-col '+'t-col_'+(props.tcol.val||8)+
    ' t-prefix_'+(props.tprefix.val)+
    ' '+
    (props.align?'t-align_'+props.align.val:'')+
    ' '+
    tclass
">
        <slot name="content">
        </slot>
    </div>
</template>

<script>
    export default {
        name: "wrapColPrefix",
        props:['props','tclass']
    }
</script>

<style scoped>

</style>