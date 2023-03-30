import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import './assets/main.css'



const app = createApp(App)

const pinia = createPinia();
app.use(pinia)
app.use(router)

app.mount('#app')

import { useLoginStore } from "@/stores/login";
const storeLogin = useLoginStore();

router.beforeEach((to, from, next) => {

    document.title = to.meta.title ?? "Dafault title";

    let loggedIn = storeLogin.loginSuccess;
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!loggedIn) {
            next({
                path: '/login'
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
});