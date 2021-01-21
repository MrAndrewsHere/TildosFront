import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'


let AuthLayout = 'auth-layout'
let DefLayoutWithVuetify = 'default-layout-with-vuetify'
let TestLayout = 'test-layout'
let MainDomain = window.location.hostname === process.env.VUE_APP_MAIN_HOST;
let viewmode = 'view';
let editmode = 'edit';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => {
            return MainDomain ? import('../views/Home') : import("../views/PageViewer");
        },
        meta: {
            layout: MainDomain ? '' : DefLayoutWithVuetify,
            mode:MainDomain?editmode:viewmode

        }
    },
    {
        path: '/project/settings/:projectid',
        name: 'projectssettings',
        component: () => {
            return MainDomain ? import('../views/projectsettings') : import("../views/PageViewer");
        },
        props: true,
        meta: {
            layout: MainDomain ? AuthLayout : DefLayoutWithVuetify,
            requiresAuth: MainDomain,
            mode:MainDomain?editmode:viewmode
        }
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => {
            return MainDomain ? import('../views/projects') : import("../views/PageViewer");
        },
        meta: {
            layout: MainDomain ? AuthLayout : DefLayoutWithVuetify,
            requiresAuth: MainDomain,
            mode:MainDomain?editmode:viewmode
        }
    },
    {
        path: '/allprojects',
        name: 'allprojects',
        component: () => {
            return MainDomain ? import('../views/allProjects') : import("../views/PageViewer");
        },
        meta: {
            layout: MainDomain ? AuthLayout : DefLayoutWithVuetify,
            requiresAuth: MainDomain,
            mode:MainDomain?editmode:viewmode,
        }
    },
    {
        path: '/project/:id',
        name: 'project',
        component: () => {
            return MainDomain ? import('../views/project') : import("../views/PageViewer");
        },
        props: true,
        meta: {
            layout: MainDomain ? AuthLayout : DefLayoutWithVuetify,
            requiresAuth: MainDomain,
            mode:MainDomain?editmode:viewmode


        }
    },
    {
        path: "/page",
        name: "EditPage",
        component: () => {
            return MainDomain ? import('../components/controlpanel/PageAddTest') : import("../views/PageViewer");
        },
        props: (route) => ({query: route.query}),
        meta: {
            layout: TestLayout,
            requiresAuth: MainDomain,
            mode:MainDomain?editmode:viewmode
        }
    },
    {
        path: "/Design",
        name: "Design",
        component: () => {
            return MainDomain ? import('../components/controlpanel/PageAddTest') : import("../views/PageViewer");
        },
        props: (route) => ({query: route.query}),
        meta: {
            layout: DefLayoutWithVuetify,
            mode:'design',

        }
    },
    {
        path: "/domains",
        name: "domains",
        component: () => {
            return MainDomain ? import('../views/domains') : import("../views/PageViewer");
        },
        props: (route) => ({query: route.query}),
        meta: {
            layout: MainDomain ? AuthLayout : DefLayoutWithVuetify,
            requiresAuth: MainDomain,
        }
    },
    {
        path: "/preview",
        name: "Preview",
        component: () => import("../views/PageViewer"),
        props: (route) => ({query: route.query}),
        meta: {
            layout: DefLayoutWithVuetify,
            requiresAuth: MainDomain,
            mode:viewmode


        }
    },

    {
        path: "/404",
        name: "404",
        component: () => import("../views/n404"),

    },
    {
        path: "/403",
        name: "403",
        component: () => import("../views/n403"),

    },
    {
        path: "/409",
        name: "409",
        component: () => import("../views/n409"),

    },
    {
        path: "/500",
        name: "500",
        component: () => import("../views/n500"),

    },
    {
        path: "/200",
        name: "200",
        component: () => import("../views/n200"),

    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/login"),
        meta: {
            layout: DefLayoutWithVuetify,

        }

    },
    {
        path: '*',
        name: 'CustomPage',
        component: () => import("../views/PageViewer"),
        meta: {
            layout: DefLayoutWithVuetify,
            mode:viewmode

        }
    },

]


const router = new VueRouter({
    mode: 'history',
    routes
})
import {HTTP} from "../axios";

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            HTTP.get('check').then(res=>{
                store.dispatch('set_user',res.data).then(()=>{  next()})

            }).catch(()=>{
                next('/')
            })


        } else {
            next('/')
        }

    } else {
        next()
    }
})

export default router
