
<script>
    import Callback from './Callback.svelte';
    import { onMount } from 'svelte';
    import { getToken, getProfile } from './services/spotify.js';
    import { push } from 'svelte-spa-router';

    onMount(async () => {
        getToken(); // uhvati token iz URL hash-a

        const token = localStorage.getItem("spotify_token");
        if (token) {
            try {
                await getProfile(); // dohvat korisnika
                await push("/");    // redirect na home
            } catch (err) {
                console.error(err);
                localStorage.removeItem("spotify_token");
                await push("/login");
            }
        } else {
            await push("/login");
        }
    });
</script>

<p>Logging in…</p>