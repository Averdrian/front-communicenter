import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import auth from './store';
import './styles/global.scss';

const app = createApp(App);

app.use(router);
app.use(auth);


app.mount('#app')
