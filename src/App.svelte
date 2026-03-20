<script>
    import { onMount } from 'svelte';
    import TopArtist from './components/TopArtist.svelte';

    // ---------- PKCE helper функции ----------
    function base64encode(str) {
        return btoa(String.fromCharCode(...new Uint8Array(str)))
            .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    async function generatePKCECodes() {
        const verifier = base64encode(window.crypto.getRandomValues(new Uint8Array(32)));
        const encoded = new TextEncoder().encode(verifier);
        const digest = await crypto.subtle.digest("SHA-256", encoded);
        const challenge = base64encode(digest);
        return { verifier, challenge };
    }

    // ---------- Spotify OAuth подесувања ----------
    const client_id = "c8662d46c73e45d1bdb2651fd7e84677";
    const redirect_uri = "http://127.0.0.1:8000/callback"; // истиот како во Dashboard
    const scopes = "user-top-read";

    let topArtists = [];

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
            // Ако нема код, генерираме PKCE и редиректираме на Spotify login
            const { verifier, challenge } = await generatePKCECodes();
            localStorage.setItem("pkce_verifier", verifier);

            const authUrl =
                `https://accounts.spotify.com/authorize?` +
                `client_id=${client_id}` +
                `&response_type=code` +
                `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
                `&scope=${encodeURIComponent(scopes)}` +
                `&code_challenge_method=S256` +
                `&code_challenge=${challenge}`;

            window.location.href = authUrl;

        } else {
            // Ако имаме код, разменуваме за access token
            const verifier = localStorage.getItem("pkce_verifier");
            const token = await exchangeCodeForToken(code, verifier);
            fetchTopArtists(token);
        }
    });

    async function exchangeCodeForToken(code, verifier) {
        const body = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri,
            client_id,
            code_verifier: verifier
        });

        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body
        });

        const data = await res.json();
        return data.access_token;
    }

    async function fetchTopArtists(token) {
        const res = await fetch(
            "https://api.spotify.com/v1/me/top/artists?limit=5",
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        topArtists = data.items.map(a => a.name);
    }
</script>

<style>
    h2 {
        margin-bottom: 1rem;
    }
    .artist-grid {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }
</style>

<h2>Top 5 Spotify Artists</h2>
<div class="artist-grid">
    {#each topArtists as artist}
        <TopArtist name={artist} />
    {/each}
</div>