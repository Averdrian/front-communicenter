import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";

const routes = [
    { path: "/", component: HelloWorld, name: "landing" },
    { path: "/login", component: Login, name: "login" }
];

const router = createRouter({
    history: createWebHistory(),
    routes

});

export default router;
