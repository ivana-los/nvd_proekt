<script>
    import { onMount } from 'svelte';
    import { getProfile, logoutSpotify } from '../services/spotify.js'; // <--- ../ umjesto ./

    let user = null;

    onMount(async () => {
        try {
            user = await getProfile();
        } catch (err) {
            console.error(err);
            user = null;
        }
    });

    function logout() {
        logoutSpotify();
        user = null;
        location.href = "/login";
    }
</script>

<main class="text-center mt-5">
    {#if user}
        <h2>Hi {user.display_name}!</h2>
        <button class="btn btn-lg btn-danger" on:click={logout}>Logout</button>
    {:else}
        <h2>Please login</h2>
        <a href="/login">Go to login</a>
    {/if}
</main>