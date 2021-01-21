<template>
    <div class="t-input-group t-input-group_uw"   >
        <div class="t-input-title t-descr t-descr_md"
        >Файл
        </div>
        <div class="t-input-subtitle t-descr t-descr_xxs t-opacity_70"
        >Файл
        </div>
        <div class="t-input-block">
            <div class="t-upwidget" style="margin-bottom:10px;">
                <div class="t-upwidget-container" >
                    <label>
                        <div ref="btnUpload" style="color:#ffffff;background-color:#000000;border-radius:0px;font-family:Roboto, Arial, sans-serif;font-size:16px;"
                             class="t-upwidget-container__button t-text">Загрузить файлы
                        </div>
                        <input
                               multiple
                               @change="uploadFiles"
                               type="file"
                               accept="text/*,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/msword,application/vnd.oasis.opendocument.*,application/pdf,application/rtf,application/vnd.visio,image/*,video/*,audio/*,application/x-rar-compressed,application/x-tar,application/zip,application/x-7z-compressed,application/x-bzip,application/x-bzip2"   style="display: none" class="js-tilda-rule" value="" name="Файл">
                    </label>
                </div>



            </div>
            <div class="t-input-error"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fileUploader",
        props:['field'],
        methods:{
            uploadFiles(event){
                if(event.target.files[0])
                {
                    let  count = event.target.files.length;

                    this.field.val = event.target.files;
                     this.$refs.btnUpload.innerText = 'Загружено '+count+' файл(а)';
                }
                else {

                   this.$refs.btnUpload.innerText = 'Загрузить файлы';
                }

            }
        }
    }
</script>

<style scoped>
    .t-upwidget-container__button{
        -webkit-font-smoothing: antialiased;
        box-sizing: content-box;
        margin: 0;
        border: 0;
        font-weight: 400;
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: table;
        text-align: center;
        padding: 0 20px 0 20px;
        line-height: 38px!important;
        cursor: pointer;
        color: #ffffff;
        background-color: #000000;
        border-radius: 0px;
        font-family: Roboto, Arial, sans-serif;
        font-size: 16px;
    }
</style>