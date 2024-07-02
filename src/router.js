import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "@/views/HelloWorld.vue";
import Login from "@/views/Login.vue";
import Chat from "@/views/Chat.vue";

const routes = [
    { path: "/", component: HelloWorld, name: "landing" },
    { path: "/login", component: Login, name: "login" },
    { path: "/chat", component: Chat, name: "chat" }

];

const router = createRouter({
    history: createWebHistory(),
    routes

});

export default router;
