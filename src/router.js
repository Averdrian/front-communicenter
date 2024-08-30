import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "@/views/Landing.vue";
import Login from "@/views/Login.vue";
import Chat from "@/views/Chat.vue";
import NotFound from "@/views/NotFound.vue";
import Register from "@/views/Register.vue";
import Users from '@/views/Users.vue';
import RegisterOrganization from './views/CreateOrganization.vue';
import EditUser from './views/EditUser.vue';
import Organizations from './views/Organizations.vue';
import EditOrganization from './views/EditOrganization.vue';

import store from './store';

const routes = [
    { path: "/", component: HelloWorld, name: "Landing" },
    { path: "/login", component: Login, name: "Login" },
    { path: "/chat", component: Chat, name: "Chat" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
    { path: "/register", component: Register, name: "Register", meta: { requiresManager: true } },
    { path: "/users", component: Users, name: "Users", meta: {requiresAuth: true} },
    { path: "/createorganization", component: RegisterOrganization, name: "CreateOrganization", meta: { requiresAdmin: true } },
    { path: "/organizations", component: Organizations, name: "Organizations", meta : {requiresAdmin: true}},
    { path: "/user/edit/:user_id?", component: EditUser, name: "EditUser", meta: { requiresAuth: true } },
    { path: "/organizatioin/edit/:organization_id?", component: EditOrganization, name: "EditOrganization", meta: { requiresManager: true } },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isAuthenticated;
    const isAdminOrganization = store.getters.isAdminOrganization; // Asegúrate de que es un booleano
    const isManager = store.getters.isManager;

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (!isAdminOrganization) {
            next({ name: 'NotFound' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresManager)) {
        if (!isManager && !isAdminOrganization) {
            next({ name: 'NotFound' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!loggedIn) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;