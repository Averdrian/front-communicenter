import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "@/views/HelloWorld.vue";
import Login from "@/views/Login.vue";
import Chat from "@/views/Chat.vue";
import NotFound from "@/views/NotFound.vue";
import Register from "@/views/Register.vue";

import store from './store';

const routes = [
    { path: "/", component: HelloWorld, name: "Landing" },
    { path: "/login", component: Login, name: "Login" },
    { path: "/chat", component: Chat, name: "Chat" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
    { path: "/register", component: Register, name: "Register", meta: { requiresAdmin: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isAuthenticated;
    const isAdminOrganization = store.getters.isAdminOrganization; // Asegúrate de que es un booleano
    const isChief = store.getters.isChief;

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (!isAdminOrganization) {
            console.log('Access denied. Not an admin organization.');
            next({ name: 'NotFound' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresChief)) {
        if (!isChief) {
            next({ name: 'Login' });
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