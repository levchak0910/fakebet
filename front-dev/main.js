import Vue from 'vue';
import App from './App.vue';

import {router} from "./router";
import {i18n} from "./i18n/";

new Vue({
    el: '#app',
    router,
    i18n,
    render: h => h(App)
});
