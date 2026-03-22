// src/services/spotify.js
const client_id = "c8662d46c73e45d1bdb2651fd7e84677";
const redirect_uri = "http://localhost:5173/callback";
const scope = "user-read-private user-read-email";

export function loginSpotify() {
    const authUrl =
        "https://accounts.spotify.com/authorize" +
        "?response_type=token" +
        "&client_id=" + encodeURIComponent(client_id) +
        "&scope=" + encodeURIComponent(scope) +
        "&redirect_uri=" + encodeURIComponent(redirect_uri);

    window.location.href = authUrl;
}

export function getToken() {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
        localStorage.setItem("spotify_token", token);
        window.location.hash = ""; // clean URL
    }

    return localStorage.getItem("spotify_token");
}

export async function getProfile() {
    const token = localStorage.getItem("spotify_token");

    if (!token) throw new Error("No Spotify token found");

    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: "Bearer " + token },
    });

    if (!response.ok) throw new Error("Failed to fetch Spotify profile");

    return await response.json();
}

export function logoutSpotify() {
    localStorage.removeItem("spotify_token");
}