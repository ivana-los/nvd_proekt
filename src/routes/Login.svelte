<!-- Login.svelte -->
<script>
    const client_id = "c8662d46c73e45d1bdb2651fd7e84677";
    const redirect_uri = "http://127.0.0.1:8000/callback";
    const scope = "user-read-private user-read-email user-top-read";

    function loginWithSpotify() {
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        window.location.href = authUrl; // browser redirect
    }
</script>

<h2>Login with Spotify</h2>
<button on:click={loginWithSpotify}>Login</button>