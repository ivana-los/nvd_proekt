<script>
    export let name; // име на артистот
</script>

<div class="top-artist-card">
    <h3>{name}</h3>
</div>

<style>
    .top-artist-card {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 150px;
        text-align: center;
        background-color: #fafafa;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
</style>