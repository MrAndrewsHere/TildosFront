<template>
    <div>
            <itemcontent v-for="(field,formfieldindex) in fields(array.type.val)" :key="formfieldindex" :item="array[field]"></itemcontent>
    </div>

</template>

<script>
    import itemcontent from "../../itemcontent";
    export default {
        name: "FormFieldCard",
        components:{
            itemcontent
        },
        props:['array'],
        data:()=>{
          return {
              defaultprops1:['type','title','subtitle'],
              defaultprops2:['varname','require']
          }
        },
        methods:{
            concatarray(array){
                return this.defaultprops1.concat(array,this.defaultprops2);
            },
            fields(type){
                switch (type) {
                    case 'new':{
                        return ['type']
                    }
                    case 'email':{
                            return this.concatarray(['placeholder']);
                    }
                    case 'checkbox':{
                        return this.defaultprops1.concat(['chb_label','varname','def_val','require']);
                    }
                    case 'space':{
                        return ['type','rowscount'];
                    }
                    case 'linefield':{
                            return this.concatarray(['placeholder']);
                    }
                    case 'select':{
                        return this.concatarray(['li_variants','li_selfirstvar','li_defselitem']);
                    }
                    case 'combobox':{
                        return this.concatarray(['li_variants','li_radcb','li_defselitem']);
                    }
                    case 'textarea':{
                        return this.concatarray(['placeholder','rowscount']);
                    }
                    case 'file':{
                        return this.concatarray();
                    }


                }
            },
        }
    }
</script>

<style scoped>

</style>