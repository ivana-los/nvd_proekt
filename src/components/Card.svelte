<!-- Card.svelte -->
<script>
    export let title = "";
</script>

<div class="card">
    <h3>{title}</h3>
    <slot />
</div>

<style>
    h3 {
        margin-bottom: 10px;
        color: #aaa;
    }
</style>