module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.plugins.delete('pwa');
    },
    css:{
        loaderOptions:{
            sass:{
                additionalData:`
                    @import "@/styles/_colors.scss";
                `
            }
        }
    }

}
