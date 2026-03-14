<script>
    import { onMount } from 'svelte';

    const client_id = "c8662d46c73e45d1bdb2651fd7e84677";
    const redirect_uri = "http://127.0.0.1:8000/callback";
    const scope = "user-read-private user-read-email";

    const authUrl =
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" + client_id +
        "&scope=" + encodeURIComponent(scope) +
        "&redirect_uri=" + encodeURIComponent(redirect_uri);

    onMount(() => {
        window.location.href = authUrl;
    });
</script>

<h2>Redirecting to Spotify...</h2>