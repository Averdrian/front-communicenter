import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "@/views/HelloWorld.vue";
import Login from "@/views/Login.vue";
import Chat from "@/views/Chat.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
    { path: "/", component: HelloWorld, name: "landing" },
    { path: "/login", component: Login, name: "login" },
    { path: "/chat", component: Chat, name: "chat" },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = !!localStorage.getItem('user'); // O la lógica que utilices para verificar autenticación

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!loggedIn) {
            next({ name: 'NotFound' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
