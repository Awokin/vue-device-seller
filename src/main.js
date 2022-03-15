import { createApp } from "vue";
import App from "./App.vue";
import { required, email, min } from '@vee-validate/rules';

import router from "./router";
import store from "./store";
import { defineRule } from 'vee-validate';

// import { required, email, min } from '@vee-validate/rules';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './global.css';

global.jQuery = require('jquery');

const $ = global.jQuery;
window.$ = $;

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';


library.add(faHome,
    faUserCircle
);

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

// defineRule('required', value => {
//     if (!value || !value.length) {
//         return 'This field is required';
//     }
//     return true;
// });

createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app");

// Object.keys(rules).forEach(rule => {
//     extend(rule, rules[rule]);
// });