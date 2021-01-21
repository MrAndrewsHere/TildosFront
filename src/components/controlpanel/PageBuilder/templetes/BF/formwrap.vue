<template>
    <div>

        <component :is="record.props.tmpl" :props="record.props" @submit="submit"></component>

        <div class="t-container" v-if="loading">
            <div class="t-col t-col_8 t-prefix_2" style="padding-top:10px; ">
                <v-progress-linear
                        color="black"
                        indeterminate
                        rounded
                        height="6"
                ></v-progress-linear>
            </div>
        </div>
        <div  class="r t-rec t-rec_pt_105 t-rec_pb_105" style="padding-top:10px; "
              data-animationappear="off" data-record-type="678"><!-- t678 -->
            <div class="t678 ">
                <div class="t-container">
                    <div class="t-col t-col_8 t-prefix_2">
                        <div>
                            <form class="t-form js-form-proccess t-form_inputs-total_4 js-send-form-success">
                                <div v-if="send" class=" js-successbox t-form__successbox t-text t-text_md" style="">ДАННЫЕ
                                    УСПЕШНО ОТПРАВЛЕНЫ
                                </div>
                                <div v-if="!send"  class=" t-form__errorbox-wrapper t-text t-text_md" style="">НЕ УДАЛОСЬ ОТПРАВИТЬ ДАННЫЕ. ПОПРОБУЙТЕ ПОЗЖЕ
                                </div>

                            </form>


                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>


</template>

<script>

    import t678 from './t678'
    import {HTTP} from "../../../../../axios";


    export default {
        name: "formwrap",
        props: ['record'],
        components: {
            t678


        },
        data: () => {

            return {
                loading:false,
                send:null,

            }
        },
        methods: {
            submit() {
                this.loading = true;
                var postData = new FormData()

                function appendFiles(file) {

                    for (let i = 0; i < file.length; i++) {
                        postData.append('file' + i, file[i])
                    }
                }

                let fields = [];
                this.record.props.items.forEach((el) => {

                    if (el.type.val === 'file') {
                        appendFiles(el.val)
                    } else {
                        fields.push(JSON.stringify(el));

                    }


                });
                postData.append('fields', JSON.stringify(fields))
                postData.append('mailrecipirnt', this.record.props.mailrecipirnt.val)
                postData.append('formname', this.record.props.formname.val)
                postData.append('domain', window.location.hostname)
                HTTP
                    .post('submit', postData)
                    .then(res => {
                      if(res.data.error)
                      {
                        this.send = false;
                      }
                      else
                      {
                        this.send = true;
                      }

                    }).catch(()=>{
                    this.send = false;
                }).finally(()=>{
                    this.loading = false;
                })

            }
        }
    }
</script>

<style scoped>

</style>