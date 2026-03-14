import Login from './routes/Login.svelte';
import Callback from './Callback.svelte';
import Home from './routes/Home.svelte';

export default {
    '/': Home,
    '/login': Login,
    '/callback': Callback,
};