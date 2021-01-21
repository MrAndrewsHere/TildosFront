import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : localStorage.getItem('user') || '',
    redactor:false,
    reQuill:false,
    pagesList:[],
    clipboard:[]
  },
  getters:{
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    authUser:state => state.user,
    redactor:state => state.redactor,
    reQuill:state => state.reQuill,
    pagesList:state => state.pagesList,
    clipboard:state => state.clipboard,
    isSuperAdmin:state => {
      return !!state.user.roles.some(el =>{return el === 'super-admin'})
    },
    isAdmin:state => {
      return !!state.user.roles.some(el =>{return el === 'admin'})
    },
    isDomainAdmin:state => {
      return !!state.user.roles.some(el =>{return el === 'domain-verification'})
    }


  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    pagesList(state,payload){
      state.pagesList = payload
    },
    clipboard(state,payload){
      state.clipboard.push(payload);
    },
    clear_clipboard(state){
      state.clipboard = [];
    },


    set_user(state, user){
      state.user = user
    },
    auth_success(state, data){
      state.status = 'success'
      state.token = data.token
      state.user = data.user
    },
    redactor(state,data){
      state.redactor = data.redactor
    },
    reQuill(state){
      state.reQuill = !state.reQuill
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = ''
    },
  },
  actions: {
    pagesList({commit},payload){
      return commit('pagesList',payload);

    },
    clipboard({commit},payload){
      return commit('clipboard',payload);

    },
    set_user({commit},payload){
      return commit('set_user',payload);
    },
    clear_clipboard({commit}){
      return commit('clear_clipboard');

    },
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: process.env.VUE_APP_API+'/api/login', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.user
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token

              let data = {
                'token': token,
                'user':user
              };
              commit('auth_success', data )
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
            })
      })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    enableQuill({commit}){

      return commit('redactor',{'redactor':true});
    },
    reQuill({commit}){

      return commit('reQuill');
    },
    disableQuill({commit}){

      return commit('redactor',{'redactor':false});
    },

  },
  modules: {
  }
})
