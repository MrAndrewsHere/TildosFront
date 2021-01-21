<template>
    <div>
        <v-menu top left>
            <template v-slot:activator="{ on }">
                <div style="bottom:12px; position: absolute; right: 12px">

                    <v-btn class="link-context-menu" @click="$emit('move_block_left')"  icon  >
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                    <v-btn class="link-context-menu" @click="$emit('move_block_right')"  icon  >
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                    <v-btn class="link-context-menu" v-on="on" icon  >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </div>

            </template>
            <v-list>

                <v-list-item @click="$emit('copy_block')">
                    <v-list-item-title>Копировать</v-list-item-title>
                </v-list-item>
                <v-list-item @click="editor = true">
                    <v-list-item-title>Редактировать</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$emit('delete-link')">
                    <v-list-item-title>Удалить</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <div class="text-container" :style="{'text-align': item.align}">
            <v-btn icon class="close-btn" @click="$emit('delete-link')">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <html-editor  v-model="item.content">

            </html-editor>
        </div>
    </div>

</template>

<script>
    import HtmlEditor from "../HtmlEditor";


    export default {
        name: "TextItem",
        components: {HtmlEditor},
        props: ["item"],
        data(){
            return{

            }
        },
        methods:{

        },
    }
</script>

<style scoped>
    .text-container{
        position: relative;

    }

    .close-btn{
        position: absolute;
        top: -36px;
        right: 0;
        opacity: 0;
        transition: 0.3s;
    }

    .text-container:hover .close-btn{
        opacity: 1;
    }

    .close-btn:hover{
        opacity: 1;
    }

</style>