import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Login from '../views/Login';
import Admin from "../views/Admin";
import Profile from '../views/Profile';
import NotFound from '../views/NotFound';
import Register from '../views/Register';
import Unauthorized from '../views/Unauthorized';
import Role from '../models/role';
import Store from '../store';
import Reg from'../views/Reg';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
    },
    ,
    {
        name: 'userapp',
        path: '/userapp',
        component: Reg,
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta: {roles: [Role.ADMIN, Role.USER]}
    },
    {
        name: 'admin',
        path: '/admin',
        component: Admin,
        meta: {roles: [Role.ADMIN]}
    },
        {
        name: '404',
        path: '/404',
        component: NotFound,
    },
    {
        name: '401',
        path: '/401',
        component: Unauthorized,
    },

];

const router = createRouter({

    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to,from,next) => {
    const {roles} = to.meta;
    const currentUser = Store.getters['currentUser'];

    if(roles?.length) {
        if(!currentUser) {
            return next({path: '/login'});
        }

        if(!roles.includes(currentUser.role)) {
            return next({path: '/401'});
        }
    }
    next();
});

export default router; 