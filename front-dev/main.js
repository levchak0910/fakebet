import Vue from 'vue';
import App from './App.vue';

import Axios from 'axios';
import VueAxios from 'vue-axios';
const axios = Axios.create({baseURL: 'http://localhost:3000'});
Vue.use(VueAxios, axios);

import {router} from "./router";
import {i18n} from "./i18n/";

new Vue({
    el: '#app',
    router,
    i18n,
    render: h => h(App)
});