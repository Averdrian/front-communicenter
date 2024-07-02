import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import auth from './store';

const app = createApp(App);

app.use(router);
app.use(auth);


app.mount('#app')
