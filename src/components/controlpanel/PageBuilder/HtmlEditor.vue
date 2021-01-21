<template>
    <div ref="htmleditor" @focusin="openeditor($event)"  contenteditable="true" ></div>
</template>

<script>

    export default {

        props: ['value'],
        name: "HtmlEditor",
        data(){
            return{
            }
        },



        computed:{

            reQuill:{
                get(){return this.$store.getters.reQuill;},
                set(){}
            },
            redactor:{
                get(){return this.$store.getters.redactor;},
                set(){}
            },

        },

        watch:{
            value(){
                this.$refs.htmleditor.innerHTML = this.value;
            },
            reQuill(){
                this.closeRed();
            },
            redactor(value){
                if(!value )
                {
                   this.closeRed();
                }
            }
        },


        methods:{
            closeRed(){
                if(this.$refs.htmleditor.classList.contains('changed')) {
                    this.$refs.htmleditor.classList.remove('changed')
                    if (this.$refs.htmleditor.lastChild.innerHTML === '<br>') {
                        this.$refs.htmleditor.removeChild(this.$refs.htmleditor.lastChild);
                    }
                    this.$emit('updateContent', this.$refs.htmleditor.innerHTML)
                }
            },

            openeditor(e){
                if(e.target.id !== 'QuillEditor'){

                    if(document.getElementById('QuillEditor'))
                    {
                        this.deletecontainer();
                    }

                    e.target.id = 'QuillEditor';
                    this.$store.dispatch('reQuill');
                }


            },
            deletecontainer(){
                document.getElementById('QuillEditor').innerHTML = document.getElementById('QuillEditor').firstChild.innerHTML;
                document.getElementById('QuillEditor').classList.remove('ql-container');
                document.getElementById('QuillEditor').classList.remove('ql-snow');
                document.getElementById('QuillEditor').classList.add('changed');
                document.getElementById('QuillEditor').id=''
            },

        },
        mounted() {
            this.$refs.htmleditor.innerHTML = this.value;
        }
    }
</script>



<style scoped>

</style>