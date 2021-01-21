import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import DefaultLayout from "./layouts/DefaultLayout";
import TestLayout from "./layouts/TestLayout";
import DefaultLayoutWithVuetify from "./layouts/DefaultLayoutWithVuetify";
import MainPageLayout from "./layouts/MainPageLayout";
import ControlPanel from "./layouts/ControlPanel";
import AuthLayout from "./layouts/AuthLayout";
import TextField from "@/components/form/TextField";
import Button from "@/components/form/Button";

import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


import cssgrid from './styles/grid.css'
import csselements from './styles/elements.css'
import dashboard from './styles/dashboadr.css'

Vue.use(cssgrid)
Vue.use(csselements)
Vue.use(dashboard)


Vue.component("default-layout", DefaultLayout)
Vue.component("test-layout", TestLayout)
Vue.component("default-layout-with-vuetify", DefaultLayoutWithVuetify)
Vue.component("main-page-layout", MainPageLayout)
Vue.component("cp-layout", ControlPanel)
Vue.component("auth-layout", AuthLayout)
Vue.component('text-field', TextField)
Vue.component('custom-button', Button)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
